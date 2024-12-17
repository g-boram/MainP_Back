package org.com.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.com.entity.Board;

@Setter
@Getter
public class BoardRequestDto {

    @Schema(description = "The title of the board", example = "Test Board Title")
    private String title;

    @Schema(description = "The content of the board", example = "This is the content of the board")
    private String content;

    @Schema(description = "ID of the user who created the board", example = "1")
    private Integer userId;

    @Schema(description = "Status of the board", example = "ACTIVE")
    private Board.Status status;

}
