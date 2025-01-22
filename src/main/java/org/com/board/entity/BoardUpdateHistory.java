package org.com.board.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "BoardUpdateHistory")
public class BoardUpdateHistory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "history_id", nullable = false)
  private Long historyId;


  @Column(name = "board_id", nullable = false)
  private Integer boardId;

  @Column(name="updated_by", nullable = false)
  private Integer updatedBy;



  @Column(name = "field_name", nullable = false)
  private String fieldName;

  @Column(name = "old_value", columnDefinition = "TEXT")
  private String oldValue;

  @Column(name = "new_value", columnDefinition = "TEXT")
  private String newValue;

  @Column(nullable = false)
  private Board.Status status;

  @Column(name="updated_at", nullable = false)
  private LocalDateTime updatedAt;

  @PrePersist
  @PreUpdate
  public void setUpdatedAt() {
    this.updatedAt = LocalDateTime.now();
  }

  public BoardUpdateHistory(Integer boardId, Integer updatedBy, String fieldName, String oldValue, String newValue, LocalDateTime updatedAt) {
    this.boardId = boardId;
    this.updatedBy = updatedBy;
    this.fieldName = fieldName;
    this.oldValue = oldValue;
    this.newValue = newValue;
    this.updatedAt = updatedAt;
  }

  public BoardUpdateHistory(Integer boardId, Integer updatedBy, String fieldName, Board.Status oldStatus, Board.Status newStatus, LocalDateTime updatedAt) {
    this.boardId = boardId;
    this.updatedBy = updatedBy;
    this.fieldName = fieldName;
    this.oldValue = oldStatus != null ? oldStatus.name() : null;
    this.newValue = newStatus != null ? newStatus.name() : null;
    this.updatedAt = updatedAt;
  }

}
