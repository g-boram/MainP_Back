package org.com.cars.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Cars")
@Data
public class Car {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "car_id")
  private Long carId;

  @Column(name = "seller_id", nullable = false)
  private Long sellerId;

  @Column(name = "make", nullable = false, length = 50)
  private String make;

  @Column(name = "model", nullable = false, length = 50)
  private String model;

  @Column(name = "year", nullable = false)
  private Integer year;

  @Column(name = "price", nullable = false, precision = 10, scale = 2)
  private BigDecimal price;

  @Column(name = "mileage", nullable = false)
  private Integer mileage;


  @Enumerated(EnumType.STRING)
  @Column(name = "fuel_type", nullable = false)
  private FuelType fuelType;

  @Enumerated(EnumType.STRING)
  @Column(name = "transmission", nullable = false)
  private Transmission transmission;

  @Column(length = 30)
  private String color;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false, columnDefinition = "ENUM('Available', 'Sold') DEFAULT 'Available'")
  private Status status = Status.AVAILABLE;

  @Column(name = "description", columnDefinition = "TEXT")
  private String description;

  @Column(name = "image_url", columnDefinition = "TEXT")
  private String imageUrl;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @ElementCollection(fetch = FetchType.EAGER)
  @JsonProperty("hashTags")
  private List<String> hashtags;

  @Column(name = "event_name", length = 100, nullable = true)
  private String eventName; // 이벤트 이름

  @Column(name = "event_end_time", nullable = true)
  private String eventEndTime; // 이벤트 종료 시간

  @ElementCollection(fetch = FetchType.EAGER)
  @JsonProperty("carOptionData")
  private List<CarOption> carOptionData; // 차량 정비옵션

  @Column(name = "order_user_id", nullable = true)
  private String orderUserId; // 소유주 아이디

  @Column(name = "repair_user_id", nullable = true)
  private String repairUserId; // 정비자 아이디

  @Column(name = "car_number", nullable = true)
  private String carNumber; // 자동차번호

  @Column(name = "car_status", nullable = true)
  private String carStatus; // 정비상태

  @Column(name = "seller_status", nullable = true)
  private String sellerStatus; // 정비상태

  public enum FuelType {
    GASOLINE, DIESEL, ELECTRIC, HYBRID;
  }

  public enum Transmission {
    AUTOMATIC, MANUAL
  }

  public enum Status {
    AVAILABLE, SOLD
  }
}
