package org.com.toss.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="payment_entity")
public class PaymentEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private String id;

  @Column(name = "user_id")
  private String userId;
  @Column(name = "order_id")
  private String orderId;
  @Column(name = "payment_key")
  private String paymentKey;
  @Column(name = "amount")
  private String amount;


  // Getters and Setters
}

