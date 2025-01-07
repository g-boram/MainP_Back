package org.com.entity;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@AllArgsConstructor
@NoArgsConstructor
public class BoardUpdateHistory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long historyId;

  private Integer boardId;
  private Integer updatedBy;
  private String fieldName;
  private String oldValue;
  private String newValue;
  private Board.Status status;
  private LocalDateTime updatedAt;

  public BoardUpdateHistory(Integer boardId, Integer updatedByUserId, String title, String title1, String title2, LocalDateTime now) {
  }

  public BoardUpdateHistory(Integer boardId, Integer updatedByUserId, String status, Board.Status status1, Board.Status status2, LocalDateTime now) {
  }
}
