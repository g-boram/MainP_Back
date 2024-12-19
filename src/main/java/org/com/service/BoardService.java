// Service Layer with Pagination and DTO Handling
package org.com.service;

import jakarta.persistence.EntityNotFoundException;
import org.com.dto.BoardRequestDto;
import org.com.dto.BoardResponseDto;
import org.com.entity.Board;
import org.com.entity.User;
import org.com.repository.BoardRepository;
import org.com.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public BoardService(BoardRepository boardRepository, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
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
                board.getCreatedAt(),
                board.getUpdatedAt(),
                board.getStatus(),
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
                        board.getCreatedAt(),
                        board.getUpdatedAt(),
                        board.getStatus(),
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
        board.setUser(user);

        return boardRepository.save(board);
    }

    @Transactional
    public Board updateBoard(Integer id, BoardRequestDto boardRequestDto) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Board not found"));

        board.setTitle(boardRequestDto.getTitle());
        board.setContent(boardRequestDto.getContent());
        board.setStatus(boardRequestDto.getStatus());

        return board;
    }

    @Transactional
    public void deleteBoard(Integer id) {
        if (!boardRepository.existsById(id)) {
            throw new EntityNotFoundException("Board not found");
        }
        boardRepository.deleteById(id);
    }
}
