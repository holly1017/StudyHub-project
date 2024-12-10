package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.UsePointLog;
import com.gisadan.studyhub.entity.etc.UseDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UsePointLogRepository extends JpaRepository<UsePointLog,Long> {
    boolean existsByUseDetail(UseDetail useDetail);
    UsePointLog findByUseDetail(UseDetail useDetail);
}
