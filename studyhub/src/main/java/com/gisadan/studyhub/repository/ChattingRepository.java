package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.Chatting;
import com.gisadan.studyhub.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChattingRepository extends JpaRepository<Chatting,Long> {
    List<Chatting> findAllByStudy(Study study);
}
