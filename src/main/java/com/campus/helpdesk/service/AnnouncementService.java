package com.campus.helpdesk.service;

import com.campus.helpdesk.dto.AnnouncementDTO;
import com.campus.helpdesk.entity.Announcement;
import com.campus.helpdesk.entity.User;
import com.campus.helpdesk.exception.ResourceNotFoundException;
import com.campus.helpdesk.repository.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final UserService userService;

    public List<AnnouncementDTO> getAllAnnouncements() {
        return announcementRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public AnnouncementDTO createAnnouncement(AnnouncementDTO announcementDTO) {
        User admin = userService.getCurrentUser();
        
        Announcement announcement = new Announcement();
        announcement.setTitle(announcementDTO.getTitle());
        announcement.setContent(announcementDTO.getContent());
        announcement.setPriority(announcementDTO.getPriority());
        announcement.setAdmin(admin);
        
        return convertToDTO(announcementRepository.save(announcement));
    }

    @Transactional
    public AnnouncementDTO updateAnnouncement(Long id, AnnouncementDTO announcementDTO) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement not found"));
        
        announcement.setTitle(announcementDTO.getTitle());
        announcement.setContent(announcementDTO.getContent());
        announcement.setPriority(announcementDTO.getPriority());
        
        return convertToDTO(announcementRepository.save(announcement));
    }

    @Transactional
    public void deleteAnnouncement(Long id) {
        if (!announcementRepository.existsById(id)) {
            throw new ResourceNotFoundException("Announcement not found");
        }
        announcementRepository.deleteById(id);
    }

    private AnnouncementDTO convertToDTO(Announcement announcement) {
        AnnouncementDTO dto = new AnnouncementDTO();
        dto.setId(announcement.getId());
        dto.setTitle(announcement.getTitle());
        dto.setContent(announcement.getContent());
        dto.setPriority(announcement.getPriority());
        dto.setCreatedAt(announcement.getCreatedAt());
        dto.setAdminName(announcement.getAdmin().getUsername());
        return dto;
    }
}