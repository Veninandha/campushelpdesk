package com.campus.helpdesk.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "campus_locations")
public class CampusLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    private String openingHours;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LocationType type;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<Request> requests = new ArrayList<>();

    public enum LocationType {
        ACADEMIC,
        ADMINISTRATIVE,
        RESIDENTIAL,
        RECREATIONAL,
        DINING,
        OTHER
    }
}