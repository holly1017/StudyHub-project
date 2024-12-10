package com.gisadan.studyhub.service;

import com.gisadan.studyhub.dto.request.ReqQuitReviewDto;
import com.gisadan.studyhub.entity.QuitReview;
import com.gisadan.studyhub.entity.Study;
import com.gisadan.studyhub.repository.QuitReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuitReviewService {
    private final QuitReviewRepository quitReviewRepository;

    /**
     * 스터디 탈퇴 리뷰목록을 페이지네이션 조건에 맞게 조회하는 메소드
     * @param study 리뷰 목록을 조회할 스터디 게시물
     * @param pageable 페이지네이션 조건
     * @return 탈퇴리뷰 목록
     */
    public List<QuitReview> selectQuitReviewByStudy(Study study, Pageable pageable) {
        return quitReviewRepository.findByStudy(study, pageable).stream().toList();
    }

    /**
     * 스터디 탈퇴 리뷰목록을 조회하는 메소드
     * @param study 리뷰 목록을 조회할 스터디 게시물
     * @return 탈퇴리뷰 목록
     */
    public List<QuitReview> selectQuitReviewAllByStudy(Study study) {
        return quitReviewRepository.findAllByStudy(study).stream().toList();
    }

    /**
     * 탈퇴리뷰 삽입을 위한 메소드
     * @param study 탈퇴리뷰 삽입하기 위한 스터디 객체
     * @param reqQuitReviewDto 별점과 내용이 담겨있는 DTO
     * @return 삽입 여부
     */
    public Boolean insertQuitReview(Study study, ReqQuitReviewDto reqQuitReviewDto) {
        quitReviewRepository.save(QuitReview.builder()
                                    .content(reqQuitReviewDto.getContent())
                                    .starPoint(reqQuitReviewDto.getStarPoint())
                                    .study(study)
                                    .build());

        return true;
    }
}
