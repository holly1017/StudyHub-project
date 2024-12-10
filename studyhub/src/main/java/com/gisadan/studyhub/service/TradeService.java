package com.gisadan.studyhub.service;

import com.gisadan.studyhub.dto.reponse.ResReplyDataDto;
import com.gisadan.studyhub.dto.reponse.ResReplyDto;
import com.gisadan.studyhub.dto.reponse.ResTradeBoardByIdDto;
import com.gisadan.studyhub.dto.reponse.ResTradeBoardListDto;
import com.gisadan.studyhub.dto.request.ReqTradeBoardDto;
import com.gisadan.studyhub.entity.*;
import com.gisadan.studyhub.entity.etc.Status;
import com.gisadan.studyhub.etc.ImageLogic;
import com.gisadan.studyhub.repository.TradeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;
    private final ReplyService replyService;
    private final MemberService memberService;
    private final BoardService boardService;

    /**
     * Trade/TradeBoard/Board/Image 테이블에 insert 쿼리문을 수행하는 메소드
     *
     * @param reqTradeBoardDto reqTradeBoardDto Type (가격, 판매여부, 상품상태, 상품내용, 상품제목)
     * @param files            file Type (파일)
     * @return 성공/실패
     */
    public boolean insertTradeBoard(ReqTradeBoardDto reqTradeBoardDto, MultipartFile[] files) {

        files = (files == null) ? new MultipartFile[0] : files;

        List<Image> imageList = new ArrayList<>();

        if (files != null) {
            for (MultipartFile file : files) {
                if (file != null && !file.isEmpty()) {
                    String fileName = "";
                    fileName = ImageLogic.saveFile(file);
                    Image image = Image.builder()
                            .imgName(file.getOriginalFilename())
                            .imgPath("http://localhost:8080/uploads/" + fileName)
                            .build();

                    imageList.add(image);
                }
            }
        }

        String thumbNailPath = !imageList.isEmpty() ? imageList.get(0).getImgPath() : null;

        Member memberEntity = memberService.selectMemberNo(reqTradeBoardDto.getMemberNo());

        Trade tradeEntity = Trade.builder()
                .thumbNail(thumbNailPath)
                .price(reqTradeBoardDto.getPrice())
                .sellStatus(Status.NO)
                .productStatus(reqTradeBoardDto.getProductStatus()).build();

        Board boardEntity = Board.builder()
                .content(reqTradeBoardDto.getContent())
                .title(reqTradeBoardDto.getTitle())
                .member(memberEntity).build();

        boardEntity.addImageList(imageList);
        TradeBoard tradeBoardEntity = TradeBoard.builder().board(boardEntity).build();
        tradeEntity.addTradeBoardList(tradeBoardEntity);

        if (tradeRepository.save(tradeEntity) != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Trade/TradeBoard/Board/Image 테이블의 데이터를 페이지네이션 형식으로 select하는 메소드
     *
     * @param boardPage Pageable객체로 size/page/sort 정보가 필요하다.
     * @return 화면에 보여줘야할 데이터를 List DTO객체 형태로 변환
     */
    public List<ResTradeBoardListDto> selectTradeBoardList(Pageable boardPage) {
        return tradeRepository.findAll(boardPage).stream().map(ResTradeBoardListDto::of).toList();
    }

    /**
     * 거래 게시판 번호를 파라미터로 전달 받아 해당 번호에 맞는 데이터를 select 하는 메서드
     *
     * @param id 조회할 거래 게시판 번호
     * @return ResTradeBoardByIdDto 상세조회 페이지 화면에 표시해야할 모든 데이터
     */
    public ResTradeBoardByIdDto selectTradeBoardById(Long id) {
        Trade tradeEntity = tradeRepository.findByTradeNo(id);
        List<Reply> replyList = replyService.selectReplyByTrade(tradeEntity.getTradeBoardList().getBoard(), PageRequest.of(0, 10, Sort.by(Sort.Order.asc("replyNo"))));
        Long replyCount = replyService.selectReplyCount(tradeEntity.getTradeBoardList().getBoard());

        return ResTradeBoardByIdDto.of(tradeEntity, replyList, replyCount);
    }

    /**
     * 거래 게시판에 맞는 댓글 작성
     *
     * @param id      거래 게시판 번호
     * @param content 댓글 내용
     * @return 작성 여부
     */
    public Boolean insertReplyByTradeNo(Long id, String content, Long parentId, Long memberNo) {
        Member memberEntity = memberService.selectMemberNo(memberNo);

        Trade tradeEntity = tradeRepository.findByTradeNo(id);

        Reply replyEntity = null;

        if (parentId > -1) {
            replyEntity = replyService.selectReplyById(parentId);
        }

        return replyService.insertReplyByTrade(tradeEntity, content, replyEntity, memberEntity);
    }

    /**
     * 댓글 목록 조회를 위한 메소드
     *
     * @param id       조회할 거래 게시판 아이디
     * @param pageable 페이지네이션 옵션
     * @return 댓글 목록
     */
    public ResReplyDataDto selectTradeBoardCommentList(Long id, Pageable pageable) {
        Board boardEntity = boardService.findBoardByTradeNo(id);
        Long replyCount = replyService.selectReplyCount(boardEntity);
        List<Reply> replyList = replyService.selectReplyByTrade(boardEntity, pageable);
        return ResReplyDataDto.of(replyCount, replyList.stream().map(ResReplyDto::of).toList());
    }

    /**
     * 상품의 판매 상태를 변경하는 메소드
     * @param boardNo 게시물 번호
     * @return 판매 상태 변경 성공 여부
     */
    @Transactional
    public Boolean updateSellStatus(Long boardNo) {
        Trade tradeEntity = tradeRepository.findByTradeNo(boardNo);

        tradeEntity.setSellStatus(Status.YES);
        return true;
    }
}
