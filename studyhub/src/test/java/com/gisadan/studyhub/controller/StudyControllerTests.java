package com.gisadan.studyhub.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.gisadan.studyhub.service.ReplyService;
import com.gisadan.studyhub.service.StudyService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(StudyController.class)
@AutoConfigureMockMvc(addFilters = false)
public class StudyControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudyService studyService;

    @MockBean
    private ReplyService replyService;

    @Test
    @DisplayName("스터디 그룹 게시물 작성")
    void studyWrite() throws Exception{
        MockMultipartFile studyPart = new MockMultipartFile(
                "study",
                "",
                "application/json",
                "{\"title\":\"테스트 제목\",\"content\":\"테스트 내용\"}".getBytes()
        );

        MockMultipartFile filePart = new MockMultipartFile(
                "file",
                "test.txt",
                "text/plain",
                "테스트 파일 내용".getBytes()
        );

        mockMvc.perform(multipart("/study/write").file(filePart).file(studyPart).contentType(MediaType.MULTIPART_FORM_DATA)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 게시물 리스트 조회")
    void selectStudyList() throws Exception {
        mockMvc.perform(get("/study/list").contentType(MediaType.APPLICATION_JSON).content("{\"page\":0,\"size\":15}")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 게시물 상세 조회")
    void selectStudyListView() throws Exception {
        mockMvc.perform(get("/study/list/view").contentType(MediaType.APPLICATION_JSON).param("id", "1")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 게시물 수정")
    void selectStudyListUpdate() throws Exception {
        MockMultipartFile studyPart = new MockMultipartFile(
                "study",
                "",
                "application/json",
                "{\"title\":\"테스트 제목\",\"content\":\"테스트 내용\"}".getBytes()
        );

        MockMultipartFile filePart = new MockMultipartFile(
                "file",
                "test.txt",
                "text/plain",
                "테스트 파일 내용".getBytes()
        );

        mockMvc.perform(multipart("/study/list/update").file(studyPart).file(filePart).contentType(MediaType.MULTIPART_FORM_DATA).param("id", "1")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 게시물 삭제")
    void selectStudyListDelete() throws Exception {
        mockMvc.perform(get("/study/list/delete").contentType(MediaType.APPLICATION_JSON).param("id", "1")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 게시물 댓글 작성")
    void insertStudyReply() throws Exception {
        mockMvc.perform(post("/study/reply/write").contentType(MediaType.APPLICATION_JSON).param("id", "1").param("parentId", "-1").content("{\"content\":\"테스트 제목\",\"memberNo\":0}")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 게시물 찾기")
    void selectStudyBoardBySearch() throws Exception {
        mockMvc.perform(get("/study/list/search").contentType(MediaType.APPLICATION_JSON).param("search", "test").content("{\"page\":0,\"size\":10}")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 그룹원에 회원 추가")
    void insertStudyJoinByMember() throws Exception {
        mockMvc.perform(post("/study/studyJoin/insert").contentType(MediaType.APPLICATION_JSON).content("{\"memberNo\":0,\"studyNo\":10}")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 그룹원에 회원 존재여부")
    void isExistStudyJoin() throws Exception {
        mockMvc.perform(post("/study/studyJoin/exist").contentType(MediaType.APPLICATION_JSON).content("{\"memberNo\":0,\"studyNo\":10}")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 그룹 참여 요청 인원 수락")
    void studyJoinAccept() throws Exception {
        mockMvc.perform(post("/study/studyJoin/accept").contentType(MediaType.APPLICATION_JSON).content("{\"memberNo\":0,\"studyNo\":10}")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 그룹 참여 요청 인원 거절")
    void studyJoinRefuse() throws Exception {
        mockMvc.perform(post("/study/studyJoin/refuse").contentType(MediaType.APPLICATION_JSON).content("{\"memberNo\":0,\"studyNo\":10}")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 그룹 참여 요청 인원 강퇴")
    void studyJoinKick() throws Exception {
        mockMvc.perform(post("/study/studyJoin/kick").contentType(MediaType.APPLICATION_JSON).content("{\"memberNo\":0,\"studyNo\":10}")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 그룹 방장 위임")
    void studyJoinDelegate() throws Exception {
        mockMvc.perform(post("/study/studyJoin/delegate").contentType(MediaType.APPLICATION_JSON).content("{\"memberNo\":0,\"studyNo\":10, \"delegateMemberNo\":1}")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 그룹원 조회")
    void studyJoinList() throws Exception {
        mockMvc.perform(get("/study/studyJoin/list").contentType(MediaType.APPLICATION_JSON).param("studyNo", "1")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스터디 그룹참여 요청 리스트 조회")
    void studyJoinReqList() throws Exception {
        mockMvc.perform(get("/study/studyJoinReq/list").contentType(MediaType.APPLICATION_JSON).param("studyNo", "1")).andExpect(status().isOk());
    }
}
