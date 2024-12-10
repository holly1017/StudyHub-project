package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.QuitReview;
import com.gisadan.studyhub.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuitReviewRepository extends JpaRepository<QuitReview,Long> {
    Page<QuitReview> findByStudy(Study study, Pageable pageable);

    List<QuitReview> findAllByStudy(Study study);
}
