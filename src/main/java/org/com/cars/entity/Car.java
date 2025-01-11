package org.com.cars.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

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
