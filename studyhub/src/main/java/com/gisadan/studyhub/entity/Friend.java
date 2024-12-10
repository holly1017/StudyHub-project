package com.gisadan.studyhub.entity;

import com.gisadan.studyhub.entity.etc.FriendStatus;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
@Getter
@Setter
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long friendNo;
    @ManyToOne
    @JoinColumn(name = "memberNo")
    private Member member;
    private Long friend;

    @Enumerated(EnumType.STRING)
    private FriendStatus status;
}
