package com.gisadan.studyhub.service;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {
    private final IamportClient iamportClient;

    public IamportResponse<Payment> paymentByImpUid(String impUid) throws IamportResponseException, IOException {
        IamportResponse<Payment> response = iamportClient.paymentByImpUid(impUid);
        log.info("Amount = {}",response.getResponse().getAmount());
        log.info("Name = {}", response.getResponse().getName());
        log.info("Status = {}", response.getResponse().getStatus());
        return response;
    }
}
