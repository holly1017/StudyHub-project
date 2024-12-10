package com.gisadan.studyhub.service;

import com.gisadan.studyhub.dto.reponse.ResChatMessageDto;
import com.gisadan.studyhub.dto.request.ReqChatMessageDto;
import com.gisadan.studyhub.entity.Chatting;
import com.gisadan.studyhub.entity.Study;
import com.gisadan.studyhub.repository.ChattingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChattingService {
    private final ChattingRepository chattingRepository;
    private final StudyService studyService;

    /**
     * 채팅 저장을 위한 메서드
     * @param studyNo 어느 스터디의 채팅인지 알기 위한 스터디 게시물 번호
     * @param reqChatMessageDto 채팅 데이터 DTO 객체
     * @return 성공여부
     */
    public Boolean insertChatting(Long studyNo, ReqChatMessageDto reqChatMessageDto) {
        Study studyEntity = studyService.selectStudybyId(studyNo);

        java.util.Date currentDate = new java.util.Date();
        Chatting chatEntity = Chatting.builder()
                                .content(reqChatMessageDto.getMessage())
                                .study(studyEntity)
                                .sender(reqChatMessageDto.getUser())
                                .time(new Date(currentDate.getTime()))
                                .build();

        chattingRepository.save(chatEntity);
        return true;
    }


    /**
     * 스터디 게시물의 채팅 기록을 불러오기 위한 메서드
     * @param studyNo 불러올 스터디 게시물 번호
     * @return 화면에 출력할 채팅 로그
     */
    public List<ResChatMessageDto> selectChattingList(Long studyNo) {
        Study studyEntity = studyService.selectStudybyId(studyNo);
        return chattingRepository.findAllByStudy(studyEntity).stream().map(ResChatMessageDto::of).toList();
    }
}
