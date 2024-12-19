package org.com.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.com.entity.Board;
import org.com.entity.User;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class BoardResponseDto {

    @Schema(description = "게시판 ID", example = "1")
    private Integer boardId;

    @Schema(description = "게시판 제목", example = "Sample Title")
    private String title;

    @Schema(description = "게시판 내용", example = "Sample Content")
    private String content;

    @Schema(description = "작성자 이름", example = "JohnDoe")
    private String username;

    @Schema(description = "작성 시간", example = "2024-01-01")
    private LocalDateTime createdAt;

    @Schema(description = "수정 시간", example = "2024-01-01")
    private LocalDateTime updatedAt;

    @Schema(description = "활성화 여부", example = "ACTIVE / INACTIVE")
    private Board.Status status;


    // 생성자: 필드 초기화
    public BoardResponseDto(
            Integer boardId,
            String title,
            String content,
            LocalDateTime createdAt,
            LocalDateTime updatedAt,
            Board.Status status,
            String username
    ) {
        this.boardId = boardId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.username = username;
    }
}
