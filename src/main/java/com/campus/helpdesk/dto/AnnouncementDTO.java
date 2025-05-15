package com.campus.helpdesk.dto;

import com.campus.helpdesk.entity.Announcement;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AnnouncementDTO {
    private Long id;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Content is required")
    private String content;
    
    @NotNull(message = "Priority is required")
    private Announcement.Priority priority;
    
    private LocalDateTime createdAt;
    private String adminName;
}