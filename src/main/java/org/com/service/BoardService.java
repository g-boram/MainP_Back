package org.com.service;

import jakarta.persistence.EntityNotFoundException;
import org.com.dto.BoardResponseDto;
import org.com.entity.Board;
import org.com.entity.User;
import org.com.repository.BoardRepository;
import org.com.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public BoardService(BoardRepository boardRepository, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    // Get all boards
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    @Transactional
    public BoardResponseDto getBoardById(Integer id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Board not found"));

        // Convert the board entity to a DTO
        BoardResponseDto dto = new BoardResponseDto();
        dto.setBoardId(board.getBoardId());
        dto.setTitle(board.getTitle());
        dto.setContent(board.getContent());
        dto.setUsername(board.getUser().getUsername()); // Accessing the User's username

        return dto;
    }

    // Create a new board
    public Board createBoard(Board board, Integer userId) {
        if (board.getTitle() == null || board.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Board title cannot be empty");
        }
        if (board.getContent() == null || board.getContent().isEmpty()) {
            throw new IllegalArgumentException("Board content cannot be empty");
        }

        // Fetch user by userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Set user and save the board
        board.setUser(user);
        return boardRepository.save(board);
    }

    // Update an existing board
    @Transactional
    public Board updateBoard(Integer id, Board updatedBoard) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Board not found"));

        // Update the fields of the board
        board.setTitle(updatedBoard.getTitle());
        board.setContent(updatedBoard.getContent());
        board.setStatus(updatedBoard.getStatus());
        board.setUpdatedAt(updatedBoard.getUpdatedAt());

        // No need to call save() because JPA will automatically update the managed entity
        return board;
    }

    // Delete a board
    public boolean deleteBoard(Integer id) {
        if (!boardRepository.existsById(id)) {
            throw new EntityNotFoundException("Board not found");
        }
        boardRepository.deleteById(id);
        return true;
    }
}
