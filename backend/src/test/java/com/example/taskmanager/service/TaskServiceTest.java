package com.example.taskmanager.service;

import com.example.taskmanager.dto.TaskRequest;
import com.example.taskmanager.dto.TaskResponse;
import com.example.taskmanager.exception.TaskNotFoundException;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TaskStatus;
import com.example.taskmanager.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    TaskRepository repository;

    @InjectMocks
    TaskService service;

    @Test
    void findAll_returnsAllTasks() {
        Task task = taskWithId(1L, "Test");
        when(repository.findAll()).thenReturn(List.of(task));

        List<TaskResponse> result = service.findAll();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("Test");
    }

    @Test
    void findById_throwsWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findById(99L))
                .isInstanceOf(TaskNotFoundException.class);
    }

    @Test
    void create_savesAndReturnsTask() {
        TaskRequest request = request("New Task");
        Task saved = taskWithId(1L, "New Task");
        when(repository.save(any())).thenReturn(saved);

        TaskResponse result = service.create(request);

        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("New Task");
        assertThat(result.getStatus()).isEqualTo(TaskStatus.TODO);
    }

    @Test
    void findById_returnsTask() {
        Task task = taskWithId(1L, "Found");
        when(repository.findById(1L)).thenReturn(Optional.of(task));

        TaskResponse result = service.findById(1L);

        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("Found");
    }

    @Test
    void update_updatesAndReturnsTask() {
        Task existing = taskWithId(1L, "Old Title");
        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        TaskRequest req = request("New Title");
        req.setStatus(TaskStatus.IN_PROGRESS);
        TaskResponse result = service.update(1L, req);

        assertThat(result.getTitle()).isEqualTo("New Title");
        assertThat(result.getStatus()).isEqualTo(TaskStatus.IN_PROGRESS);
    }

    @Test
    void update_throwsWhenNotFound() {
        when(repository.findById(42L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.update(42L, request("X")))
                .isInstanceOf(TaskNotFoundException.class);
        verify(repository, never()).save(any());
    }

    @Test
    void delete_throwsWhenNotFound() {
        when(repository.findById(5L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.delete(5L))
                .isInstanceOf(TaskNotFoundException.class);
        verify(repository, never()).deleteById(any());
    }

    @Test
    void delete_deletesWhenFound() {
        Task task = taskWithId(3L, "To Delete");
        when(repository.findById(3L)).thenReturn(Optional.of(task));

        service.delete(3L);

        verify(repository).deleteById(3L);
    }

    private Task taskWithId(Long id, String title) {
        Task t = new Task();
        t.setTitle(title);
        t.setStatus(TaskStatus.TODO);
        ReflectionTestUtils.setField(t, "id", id);
        return t;
    }

    private TaskRequest request(String title) {
        TaskRequest r = new TaskRequest();
        r.setTitle(title);
        return r;
    }
}
