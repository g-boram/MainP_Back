package org.com.board.service;

import org.com.board.entity.BoardUpdateHistory;
import org.com.board.repository.BoardUpdateHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardUpdateHistoryService {

  private final BoardUpdateHistoryRepository repository;

  public BoardUpdateHistoryService(BoardUpdateHistoryRepository repository) {
    this.repository = repository;
  }

  public List<BoardUpdateHistory> getUpdateHistoryByBoardId(Integer boardId) {
    return repository.findByBoardId(boardId);
  }
}

