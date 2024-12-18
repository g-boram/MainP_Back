package org.com.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    // 생성자: 필드 초기화
    public BoardResponseDto(Integer boardId, String title, String content, String username) {
        this.boardId = boardId;
        this.title = title;
        this.content = content;
        this.username = username;
    }
}
