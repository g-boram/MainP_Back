package org.com.board.repository;

import org.com.board.entity.BoardUpdateHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardUpdateHistoryRepository extends JpaRepository<BoardUpdateHistory, Integer> {
  List<BoardUpdateHistory> findByBoardId(Integer boardId);
}
