package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlaramRepository extends JpaRepository<Alarm,Long> {
}
