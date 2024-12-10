package com.gisadan.studyhub.entity;

import com.gisadan.studyhub.entity.etc.UseDetail;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Getter
public class UsePointLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long detailNo;
    @Enumerated(EnumType.STRING)
    private UseDetail useDetail;
}
