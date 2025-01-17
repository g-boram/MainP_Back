package org.com.checkinformation.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="cardetails")
public class CarDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
    private Long id;

    @Column(name = "car_number", nullable = false, unique = true, length = 20) // 차량번호 필수, 유니크
    private String carNumber;

    @Column(name = "owner_name",nullable = false, length = 50) // 소유자명 필수
    private String ownerName;

    @Column(name = "birth_date",nullable = false, length = 10) // 생년월일 필수
    private String birthDate;

}
