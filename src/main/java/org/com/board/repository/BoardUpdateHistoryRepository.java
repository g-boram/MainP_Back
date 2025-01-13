package org.com.board.repository;

import org.com.board.entity.BoardUpdateHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardUpdateHistoryRepository extends JpaRepository<BoardUpdateHistory, Integer> {
}
