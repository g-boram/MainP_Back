// Service Layer with Pagination and DTO Handling
package org.com.board.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.NotNull;
import org.com.board.dto.BoardRequestDto;
import org.com.board.dto.BoardResponseDto;
import org.com.board.entity.Board;
import org.com.board.entity.BoardUpdateHistory;
import org.com.user.entity.User;
import org.com.board.repository.BoardRepository;
import org.com.board.repository.BoardUpdateHistoryRepository;
import org.com.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final BoardUpdateHistoryRepository boardUpdateHistoryRepository;


    public BoardService(BoardRepository boardRepository, UserRepository userRepository, BoardUpdateHistoryRepository boardUpdateHistoryRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
        this.boardUpdateHistoryRepository = boardUpdateHistoryRepository;
    }

    @Transactional(readOnly = true)
    public Page<Board> getAllBoards(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public BoardResponseDto getBoardById(Integer id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Board not found"));

        return new BoardResponseDto(
                board.getBoardId(),
                board.getTitle(),
                board.getContent(),
                board.getCategory(),
                board.getCreatedAt(),
                board.getUpdatedAt(),
                board.getStatus(),
                board.getImageUrl(),
                board.getUser().getUsername()
        );
    }

    @Transactional(readOnly = true)
    public Page<BoardResponseDto> getPagedBoards(Pageable pageable) {
        return boardRepository.findAll(pageable).map(board ->
                new BoardResponseDto(
                        board.getBoardId(),
                        board.getTitle(),
                        board.getContent(),
                        board.getCategory(),
                        board.getCreatedAt(),
                        board.getUpdatedAt(),
                        board.getStatus(),
                        board.getImageUrl(),
                        board.getUser().getUsername()
                )
        );
    }

    @Transactional
    public Board createBoard(BoardRequestDto boardRequestDto) {
        User user = userRepository.findById(boardRequestDto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));


        Board board = new Board();
        board.setTitle(boardRequestDto.getTitle());
        board.setContent(boardRequestDto.getContent());
        board.setStatus(boardRequestDto.getStatus());
        board.getCategory(boardRequestDto.getCategory());
        board.getImageUrl(boardRequestDto.getImageUrl());
        board.setUser(user);

        return boardRepository.save(board);
    }


    public String getBoardImageUrl(Integer boardId) {
        Board board = boardRepository.findById(boardId)
            .orElseThrow(() -> new EntityNotFoundException("Board not found with id: " + boardId));

        return board.getImageUrl();
    }

    @Transactional
    public Board updateBoard(@NotNull BoardRequestDto boardRequestDto, Integer id, Integer updatedByUserId) {
        // 게시글 검색
        Board board = boardRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Board not found"));

        List<BoardUpdateHistory> updateHistories = new ArrayList<>();

        // 제목 변경 기록
        if (!Objects.equals(board.getTitle(), boardRequestDto.getTitle())) {
            updateHistories.add(new BoardUpdateHistory(
                board.getBoardId(),
                updatedByUserId,
                "title",
                board.getTitle(),
                boardRequestDto.getTitle(),
                LocalDateTime.now()
            ));
            board.setTitle(boardRequestDto.getTitle());
        }

        // 내용 변경 기록
        if (!Objects.equals(board.getContent(), boardRequestDto.getContent())) {
            updateHistories.add(new BoardUpdateHistory(
                board.getBoardId(),
                updatedByUserId,
                "content",
                board.getContent(),
                boardRequestDto.getContent(),
                LocalDateTime.now()
            ));
            board.setContent(boardRequestDto.getContent());
        }

        // 상태 변경 기록
        if (!Objects.equals(board.getStatus(), boardRequestDto.getStatus())) {
            updateHistories.add(new BoardUpdateHistory(
                board.getBoardId(),
                updatedByUserId,
                "status",
                board.getStatus(),
                boardRequestDto.getStatus(),
                LocalDateTime.now()
            ));
            board.setStatus(boardRequestDto.getStatus());
        }

        // 이미지 URL 변경 기록
        if (!Objects.equals(board.getImageUrl(), boardRequestDto.getImageUrl())) {
            updateHistories.add(new BoardUpdateHistory(
                board.getBoardId(),
                updatedByUserId,
                "image_url",
                board.getImageUrl(),
                boardRequestDto.getImageUrl(),
                LocalDateTime.now()
            ));
            board.setImageUrl(boardRequestDto.getImageUrl());
        }

        // category 변경 기록
        if (!Objects.equals(board.getCategory(), boardRequestDto.getCategory())) {
            updateHistories.add(new BoardUpdateHistory(
                board.getBoardId(),
                updatedByUserId,
                "category",
                board.getCategory(),
                boardRequestDto.getCategory(),
                LocalDateTime.now()
            ));
            board.setCategory(boardRequestDto.getCategory());
        }

        // 변경 내역 저장
        if (!updateHistories.isEmpty()) {
            boardUpdateHistoryRepository.saveAll(updateHistories);
        }

        // 게시글 업데이트 후 저장
        return boardRepository.save(board);
    }



    @Transactional
    public void deleteBoard(Integer id) {
        if (!boardRepository.existsById(id)) {
            throw new EntityNotFoundException("Board not found");
        }
        boardRepository.deleteById(id);
    }

}
