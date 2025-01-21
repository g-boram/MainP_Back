package org.com.userSell.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name="carsellrequests")
public class CarSell {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long sellerId;
    private String username;
    private String region;
    private String phone;
    private String time;
    private String mileage;
    private String price;
    private String color;
    private String notes;
    private String email;
    private String orderUserId;

    @Column(name = "orderstatus" )
    private String orderStatus;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
}
