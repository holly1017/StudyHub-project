package com.gisadan.studyhub.service;

import com.gisadan.studyhub.entity.UsePointLog;
import com.gisadan.studyhub.entity.etc.UseDetail;
import com.gisadan.studyhub.repository.UsePointLogRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DataInitializationService {
    private final UsePointLogRepository usePointLogRepository;

    @PostConstruct
    @Transactional
    public void init() {
        List<UseDetail> useDetails = List.of(
                UseDetail.CHARGE,
                UseDetail.BUY_PRODUCT,
                UseDetail.SELL_PRODUCT,
                UseDetail.REQ_QNA,
                UseDetail.ADOPTED_QNA,
                UseDetail.GROUP_HAED_INCREMENT
        );

        useDetails.forEach(this::addIfNotExists);
    }

    private void addIfNotExists(UseDetail useDetail) {
        if (!usePointLogRepository.existsByUseDetail(useDetail)) {
            usePointLogRepository.save(UsePointLog.builder().useDetail(useDetail).build());
        }
    }

}
