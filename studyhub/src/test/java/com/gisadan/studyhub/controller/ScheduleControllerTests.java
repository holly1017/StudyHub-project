package com.gisadan.studyhub.controller;

import com.gisadan.studyhub.service.ReplyService;
import com.gisadan.studyhub.service.ScheduleService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ScheduleController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ScheduleControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ScheduleService scheduleService;

    @MockBean
    private ReplyService replyService;

    @Test
    @DisplayName("스케쥴 게시물 작성")
    void selectCalendarWrite() throws Exception {
        mockMvc.perform(post("/calendar/write").contentType(MediaType.APPLICATION_JSON).content("{\"title\":\"0\",\"content\":\"15\", \"stDate\": \"2024-11-24\", \"edDate\": \"2024-11-25\", \"stTime\": \"17:55\", \"edTime\": \"18:55\" }").param("id", "0").param("memberNo", "0")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스케쥴 게시물 리스트 조회")
    void selectCalendarList() throws Exception {
        mockMvc.perform(get("/calendar/list").contentType(MediaType.APPLICATION_JSON).param("id", "0")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스케쥴 게시물 상세보기")
    void selectCalendarView() throws Exception {
        mockMvc.perform(get("/calendar/list/view").contentType(MediaType.APPLICATION_JSON).param("studyId", "0").param("calendarId", "0")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스케쥴 게시물 댓글 작성")
    void insertCalendarReplyWrite() throws Exception {
        String json = "{\n" +
                "  \"studyId\": 1,\n" +
                "  \"calendarId\": 123,\n" +
                "  \"parentId\": 456,\n" +
                "  \"content\": \"이 일정에 대한 답변입니다.\",\n" +
                "  \"memberNo\": 789\n" +
                "}";

        mockMvc.perform(post("/calendar/reply/write").contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스케쥴 게시물 댓글 리스트 조회")
    void selectCalendarReplyList() throws Exception {
        String json = "{\n" +
                "  \"page\": 0,\n" +
                "  \"size\": 10,\n" +
                "}";

        mockMvc.perform(get("/calendar/reply/list").contentType(MediaType.APPLICATION_JSON).content(json).param("id", "1").param("calendarId", "1")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스케쥴 게시물 댓글 삭제")
    void selectCalendarReplyDelete() throws Exception {
        mockMvc.perform(get("/calendar/reply/list/delete").contentType(MediaType.APPLICATION_JSON).param("id", "1")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("스케쥴 게시물 댓글 수정")
    void selectCalendarReplyUpdate() throws Exception {
        String json = "{\n" +
                "  \"content\": \"안녕하세요\"\n" +
                "}";

        mockMvc.perform(get("/calendar/reply/list/delete").contentType(MediaType.APPLICATION_JSON).param("id", "1").content(json)).andExpect(status().isOk());
    }
}
