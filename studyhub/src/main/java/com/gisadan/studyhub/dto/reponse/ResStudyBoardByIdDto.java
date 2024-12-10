package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.QuitReview;
import com.gisadan.studyhub.entity.Reply;
import com.gisadan.studyhub.entity.Study;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ResStudyBoardByIdDto {
    private Long id;
    private String title;
    private String content;
    private String groupName;
    private int currentHeadCnt;
    private int maxHeadCnt;
    private String hashTag;
    private Long replyCount;
    private List<String> imgPath;
    private List<ResReplyDto> reply;
    private List<ResReviewDto> review;
    private List<ResStudyGroupListDto> studyGroup;
    private List<ResStudyGroupReqDto> studyGroupReq;
    private Long memberNo;

    public static ResStudyBoardByIdDto of (Study study, List<Reply> replyList, Long replyCount) {
        return ResStudyBoardByIdDto.builder()
                .id(study.getStudyNo())
                .title(study.getStudyBoard().getBoard().getTitle())
                .content(study.getStudyBoard().getBoard().getContent())
                .groupName(study.getGroupName())
                .currentHeadCnt(study.getCurHeadCount())
                .maxHeadCnt(study.getMaxHeadCount())
                .imgPath(study.getStudyBoard().getBoard().getImageList().stream().map(image -> image.getImgPath()).toList())
                .hashTag(study.getHashTag())
                .reply(replyList.stream().map(ResReplyDto::of).toList())
                .review(study.getQuitReviewList().stream().map(ResReviewDto::of).toList())
                .studyGroup(study.getStudyJoinMemberList().stream().map(ResStudyGroupListDto::of).toList())
                .studyGroupReq(study.getStudyJoinReqList().stream().map(ResStudyGroupReqDto::of).toList())
                .replyCount(replyCount)
                .memberNo(study.getStudyBoard().getBoard().getMember() != null ? study.getStudyBoard().getBoard().getMember().getMemberNo() : 0)
                .build();
    }
}
