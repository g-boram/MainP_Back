package org.com.board.entity;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "BoardUpdateHistory")
public class BoardUpdateHistory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long historyId;

  @Column(nullable = false)
  private Integer boardId;

  @Column(nullable = false)
  private Integer updatedBy;

  @Column(nullable = false)
  private String fieldName;

  @Column(columnDefinition = "TEXT")
  private String oldValue;

  @Column(columnDefinition = "TEXT")
  private String newValue;

  @Column(nullable = false)
  private Board.Status status;

  @Column(nullable = false)
  private LocalDateTime updatedAt;

  public BoardUpdateHistory(Integer boardId, Integer updatedByUserId, String title, String title1, String title2, LocalDateTime now) {
  }

  public BoardUpdateHistory(Integer boardId, Integer updatedByUserId, String status, Board.Status status1, Board.Status status2, LocalDateTime now) {
  }
}
