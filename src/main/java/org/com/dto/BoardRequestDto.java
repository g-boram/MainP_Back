package org.com.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.com.entity.Board;

@Setter
@Getter
public class BoardRequestDto {

    @NotBlank(message = "제목은 필수입니다.")
    @Schema(description = "게시판 제목", example = "Test Board Title")
    private String title;

    @NotBlank(message = "내용은 필수입니다.")
    @Schema(description = "게시판 내용", example = "This is the content of the board")
    private String content;

    @NotNull(message = "작성자 ID는 필수입니다.")
    @Schema(description = "작성자 ID", example = "1")
    private Integer userId;

    @NotNull(message = "상태는 필수입니다.")
    @Schema(description = "게시판 상태 (ACTIVE, INACTIVE)", example = "ACTIVE")
    private Board.Status status;

}
