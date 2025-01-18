package org.com.board.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.com.board.dto.BoardRequestDto;
import org.com.board.dto.BoardResponseDto;
import org.com.board.entity.BoardUpdateHistory;
import org.com.board.service.BoardService;
import org.com.board.service.BoardUpdateHistoryService;
import org.com.board.service.S3Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/board")
@CrossOrigin(origins = "http://localhost:3000") // React frontend port
@Tag(name = "Board API", description = "게시판 관련 API")
@Validated
public class BoardController {

    private final BoardService boardService;
    private final S3Service s3Service;
    private final BoardUpdateHistoryService boardUpdateHistoryService;


    public BoardController(BoardService boardService, S3Service s3Service, BoardUpdateHistoryService boardUpdateHistoryService) {
        this.boardService = boardService;
        this.s3Service = s3Service;
        this.boardUpdateHistoryService = boardUpdateHistoryService;
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



    @Operation(
        summary = "게시글 생성",
        description = "게시판 데이터를 생성합니다. JSON 형태의 boardReq와 파일을 함께 전송합니다.\n" +
            "게시글 테스트 데이터 {\"title\":\"Test Board Title\",\"content\":\"This is the content of the board\",\"category\":\"other\",\"userId\":17,\"status\":\"ACTIVE\",\"role\":\"ADMIN\",\"imageUrl\":\"multipartFile\"}"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공적으로 게시판을 생성했습니다."),
            @ApiResponse(responseCode = "400", description = "유효성 검증 실패."),
            @ApiResponse(responseCode = "404", description = "게시판을 등록 할 수 없습니다.")
    })
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Map<String, String>> createBoard(
        @Parameter(
            description = "게시글 요청 데이터(JSON 형식)",
            content = @Content(
                schema = @Schema(implementation = BoardRequestDto.class),
                examples = @ExampleObject(
                    name = "Board Request Example"
                )
            )
        )
        @RequestPart("boardReq") String boardReqJson,
        @Parameter(
            description = "업로드할 파일",
            content = @Content(
                mediaType = "image/jpeg",
                examples = @ExampleObject(
                    name = "File Example",
                    value = "image file data"
                )
            )
        )
        @RequestPart(value="file", required = false)  MultipartFile file) throws JsonProcessingException {


        System.out.println("[ createBoard ]-----Controller executed!");

        ObjectMapper objectMapper = new ObjectMapper();
        BoardRequestDto boardRequestDto = objectMapper.readValue(boardReqJson, BoardRequestDto.class);

        String fileUrl = "";
        if (file != null && !file.isEmpty()) {
            fileUrl = s3Service.uploadFile(file);
        }

        boardRequestDto.setImageUrl(fileUrl);

        boardService.createBoard(boardRequestDto);
            Map<String, String> response = new HashMap<>();
            response.put("message", "게시글이 등록 되었습니다.");
        return ResponseEntity.ok(response);
    }

//    @Operation(summary = "게시판 수정", description = "특정 ID의 게시판 정보를 수정합니다.")
//    @ApiResponses({
//            @ApiResponse(responseCode = "200", description = "성공적으로 게시판을 수정했습니다."),
//            @ApiResponse(responseCode = "404", description = "해당 ID의 게시판을 찾을 수 없습니다.")
//    })
//    @PutMapping("/{id}")
//    public ResponseEntity<Board> updateBoard(@PathVariable Integer id, @Valid @RequestBody BoardRequestDto boardRequestDto) {
//        System.out.println("[ updateBoard ]-----Controller executed!");
//        return ResponseEntity.ok(boardService.updateBoard(id, boardRequestDto));

    @Operation(
        summary = "게시글 수정",
        description = "게시판 데이터를 수정합니다. JSON 형태의 boardReq와 파일을 함께 전송합니다."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "성공적으로 게시판을 수정했습니다."),
        @ApiResponse(responseCode = "400", description = "유효성 검증 실패."),
        @ApiResponse(responseCode = "404", description = "수정할 게시판을 찾을 수 없습니다.")
    })
    @PutMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Map<String, String>> updateBoard(
        @Parameter(
            description = "게시글 요청 데이터(JSON 형식)",
            content = @Content(
                schema = @Schema(implementation = BoardRequestDto.class),
                examples = @ExampleObject(name = "Board Request Example")
            )
        )
        @RequestPart("boardReq") String boardReqJson,
        @Parameter(
            description = "업로드할 파일",
            content = @Content(mediaType = "image/jpeg")
        )
        @RequestPart(value = "file", required = false) MultipartFile file) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        BoardRequestDto boardRequestDto = objectMapper.readValue(boardReqJson, BoardRequestDto.class);

        // 게시글 ID가 유효한지 검증
        if (boardRequestDto.getBoardId() == null || boardRequestDto.getBoardId() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "유효하지 않은 게시글 입니다."));
        }
        String fileUrl = boardService.getBoardImageUrl(boardRequestDto.getBoardId());

        if (file != null && !file.isEmpty()) {
            if (fileUrl != null && !fileUrl.isEmpty()) {
                s3Service.deleteFile(fileUrl);
            }
            fileUrl = s3Service.uploadFile(file);
        }
        boardRequestDto.setImageUrl(fileUrl);
        boardService.updateBoard(boardRequestDto, boardRequestDto.getBoardId(), boardRequestDto.getUserId());

        Map<String, String> response = new HashMap<>();
        response.put("message", "게시글이 수정되었습니다.");
        return ResponseEntity.ok(response);
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

    @Operation(summary = "게시판 수정내역 조회", description = "특정 ID의 게시판의 수정내역을 보여줍니다.")
    @GetMapping("/history/{boardId}")
    public List<BoardUpdateHistory> getUpdateHistory(@PathVariable Integer boardId) {
        return boardUpdateHistoryService.getUpdateHistoryByBoardId(boardId);
    }
}
