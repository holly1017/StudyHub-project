package com.gisadan.studyhub.etc;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PhoneService {

    private boolean sendAuthPhone(String Phone, String authKey) {
        // 인증번호를 해당 전화번호로 전송

        return false;
    }
}
