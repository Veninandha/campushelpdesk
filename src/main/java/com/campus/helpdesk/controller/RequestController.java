package com.campus.helpdesk.controller;

import com.campus.helpdesk.dto.RequestDTO;
import com.campus.helpdesk.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
@RequiredArgsConstructor
public class RequestController {
    private final RequestService requestService;

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<RequestDTO>> getMyRequests() {
        return ResponseEntity.ok(requestService.getMyRequests());
    }

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<RequestDTO> createRequest(@RequestBody RequestDTO request) {
        return ResponseEntity.ok(requestService.createRequest(request));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<RequestDTO>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RequestDTO> updateRequest(@PathVariable Long id, @RequestBody RequestDTO request) {
        return ResponseEntity.ok(requestService.updateRequest(id, request));
    }
}