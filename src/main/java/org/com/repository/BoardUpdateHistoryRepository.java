package org.com.repository;

import org.com.entity.BoardUpdateHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardUpdateHistoryRepository extends JpaRepository<BoardUpdateHistory, Integer> {
}
