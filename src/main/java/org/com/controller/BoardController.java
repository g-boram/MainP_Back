package org.com.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.com.dto.BoardRequestDto;
import org.com.dto.BoardResponseDto;
import org.com.entity.Board;
import org.com.service.BoardService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/board")
@CrossOrigin(origins = "http://localhost:3000") // React frontend port
@Tag(name = "Board API", description = "게시판 관련 API")
@Validated
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }



    @Operation(summary = "페이징된 게시판 조회", description = "페이징, 정렬 옵션을 사용하여 게시판 정보를 조회합니다.")
    @GetMapping("/paged")
    public ResponseEntity<Page<BoardResponseDto>> getPagedBoards(
            @Parameter(description = "페이징 및 정렬 정보")
            @PageableDefault(size = 10, sort = "boardId") Pageable pageable
    ) {
        Page<BoardResponseDto> pagedBoards = boardService.getPagedBoards(pageable);
        return ResponseEntity.ok(pagedBoards);
    }


    @Operation(summary = "게시판 ID로 조회", description = "특정 ID에 해당하는 게시판 정보를 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공적으로 데이터를 반환했습니다."),
            @ApiResponse(responseCode = "404", description = "해당 ID의 게시판을 찾을 수 없습니다.")
    })
    @GetMapping("/{id}")
    public ResponseEntity<BoardResponseDto> getBoardById(@PathVariable Integer id) {
        return ResponseEntity.ok(boardService.getBoardById(id));
    }



    @Operation(summary = "게시판 생성", description = "새로운 게시판을 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공적으로 게시판을 생성했습니다."),
            @ApiResponse(responseCode = "400", description = "유효성 검증 실패."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @PostMapping
    public ResponseEntity<Board> createBoard(@Valid @RequestBody BoardRequestDto boardRequestDto) {
        return ResponseEntity.ok(boardService.createBoard(boardRequestDto));
    }



    @Operation(summary = "게시판 수정", description = "특정 ID의 게시판 정보를 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공적으로 게시판을 수정했습니다."),
            @ApiResponse(responseCode = "404", description = "해당 ID의 게시판을 찾을 수 없습니다.")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Board> updateBoard(@PathVariable Integer id, @Valid @RequestBody BoardRequestDto boardRequestDto) {
        return ResponseEntity.ok(boardService.updateBoard(id, boardRequestDto));
    }


    @Operation(summary = "게시판 삭제", description = "특정 ID의 게시판을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "성공적으로 삭제했습니다."),
            @ApiResponse(responseCode = "404", description = "해당 ID의 게시판을 찾을 수 없습니다.")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Integer id) {
        boardService.deleteBoard(id);
        return ResponseEntity.noContent().build();
    }
}
