package org.com.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BoardResponseDto {
    private Integer boardId;
    private String title;
    private String content;
    private String username; // Store only the username instead of the full User object

    // Constructor, getters, and setters
}

