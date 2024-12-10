package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.TradeBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeBoardRepository extends JpaRepository<TradeBoard,Long> {
}
