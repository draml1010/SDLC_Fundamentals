package com.example.taskmanager.controller;

import com.example.taskmanager.dto.TaskResponse;
import com.example.taskmanager.exception.TaskNotFoundException;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TaskStatus;
import com.example.taskmanager.service.TaskService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper mapper;
    @MockBean TaskService service;

    @Test
    void getAll_returnsOk() throws Exception {
        when(service.findAll()).thenReturn(List.of());

        mvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void create_validRequest_returns201() throws Exception {
        when(service.create(any())).thenReturn(response(1L, "My Task"));

        mvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":"My Task","status":"TODO"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("My Task"));
    }

    @Test
    void create_blankTitle_returns400WithFieldError() throws Exception {
        mvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":"","status":"TODO"}
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").exists());
    }

    @Test
    void create_titleTooLong_returns400() throws Exception {
        String longTitle = "a".repeat(101);

        mvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(Map.of("title", longTitle, "status", "TODO"))))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").exists());
    }

    @Test
    void getById_notFound_returns404() throws Exception {
        when(service.findById(99L)).thenThrow(new TaskNotFoundException(99L));

        mvc.perform(get("/api/tasks/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").exists());
    }

    @Test
    void update_notFound_returns404() throws Exception {
        when(service.update(eq(99L), any())).thenThrow(new TaskNotFoundException(99L));

        mvc.perform(put("/api/tasks/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":"X","status":"TODO"}
                                """))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").exists());
    }

    @Test
    void delete_notFound_returns404() throws Exception {
        doThrow(new TaskNotFoundException(5L)).when(service).delete(5L);

        mvc.perform(delete("/api/tasks/5"))
                .andExpect(status().isNotFound());
    }

    private TaskResponse response(Long id, String title) {
        Task task = new Task();
        task.setTitle(title);
        task.setStatus(TaskStatus.TODO);
        ReflectionTestUtils.setField(task, "id", id);
        return TaskResponse.from(task);
    }
}
