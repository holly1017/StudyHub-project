package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.Board;
import com.gisadan.studyhub.entity.Reply;
import com.gisadan.studyhub.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply,Long> {

    @Query(value = "SELECT * FROM ( " +
            "  SELECT r.*, ROWNUM AS rn FROM Reply r " +
            "  WHERE BOARD_NO = :boardNo " +
            "  START WITH PARENTS_NO IS NULL " +
            "  CONNECT BY PRIOR REPLY_NO = PARENTS_NO " +
            "  ORDER SIBLINGS BY REPLY_NO ASC " +
            ") " +
            "WHERE rn > :startRow AND rn <= :endRow",
            nativeQuery = true)
    List<Reply> findByBoardReply(@Param("boardNo") Long boardNo,
                            @Param("startRow") int startRow,
                            @Param("endRow") int endRow);

    Long countReplyByBoard(Board board);

}
