package org.com.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "Board")
@Data
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    @Schema(description = "The unique ID of the board", example = "1")
    private Integer boardId;

    @Column(name = "updated_userId")
    @Schema(description = "The board updated last userId", example = "userId")
    private Integer updatedUserId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    @Schema(description = "User who created the board", implementation = User.class)
    private User user;

    @Column(name = "title", nullable = false, length = 255)
    @Schema(description = "The title of the board", example = "Test Board Title")
    private String title;

    @Column(name = "content", nullable = false)
    @Schema(description = "The content of the board", example = "This is the content of the board")
    private String content;

    @Column(name = "category", nullable = false, length = 100)
    @Schema(description = "The category of the board", example = "Test Board category")
    private String category;

    @Column(name = "image_url", nullable = true)
    @Schema(description = "The file of the board", example = "Test Board files")
    private String imageUrl;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Schema(description = "The date when the board was created", example = "2024-12-17T07:59:57.252Z")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Schema(description = "The date when the board was last updated", example = "2024-12-17T07:59:57.252Z")
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Schema(description = "The status of the board", example = "ACTIVE")
    private Status status;

    @PrePersist
    public void onPrePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    public void onPreUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void getCategory(String category) {
        this.category = category == null ? "other" : category;
    }

    public void getImageUrl(String imageUrl) {
        this.imageUrl = imageUrl == null ? "" : imageUrl;
    }

    public enum Status {
        @Schema(description = "게시판 활성 상태")
        ACTIVE,
        @Schema(description = "게시판 비활성 상태")
        INACTIVE
    }
}
