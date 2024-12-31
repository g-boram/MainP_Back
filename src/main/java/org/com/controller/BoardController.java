package org.com.controller;

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
import org.com.dto.BoardRequestDto;
import org.com.dto.BoardResponseDto;
import org.com.dto.UserDto;
import org.com.entity.Board;
import org.com.entity.User;
import org.com.service.BoardService;

import org.com.service.S3Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/board")
@CrossOrigin(origins = "http://localhost:3000") // React frontend port
@Tag(name = "Board API", description = "게시판 관련 API")
@Validated
public class BoardController {

    private final BoardService boardService;
    private final S3Service s3Service;


    public BoardController(BoardService boardService, S3Service s3Service) {
        this.boardService = boardService;
        this.s3Service = s3Service;
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
        @RequestPart("file") MultipartFile file) throws JsonProcessingException {


        System.out.println("createBoard-----Controller executed!");

        ObjectMapper objectMapper = new ObjectMapper();
        BoardRequestDto boardRequestDto = objectMapper.readValue(boardReqJson, BoardRequestDto.class);

        String fileUrl = s3Service.uploadFile(file, boardRequestDto.getCategory());
        boardRequestDto.setImageUrl(fileUrl);

        boardService.createBoard(boardRequestDto);

        // TODO: 다른곳에 사용하기!
//        Board board = boardService.createBoard(boardRequestDto);

        // User 엔티티에서 UserDto 변환
//        User user = board.getUser();
//        UserDto userDto = new UserDto(
//            user.getUserId(),
//            user.getUsername(),
//            user.getEmail(),
//            user.getPhoneNumber(),
//            user.getRole()
//        );

        // Board 객체에 UserDto를 포함하지 않고, 필요한 데이터를 응답에 추가
//        board.setUser(null);

        // UserDto와 Board 정보를 포함하여 응답 반환
//        Map<String, Object> response = new HashMap<>();
//        response.put("board", board);
//        response.put("user", userDto);
            Map<String, String> response = new HashMap<>();
            response.put("message", "게시글이 등록 되었습니다.");
        return ResponseEntity.ok(response);
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
