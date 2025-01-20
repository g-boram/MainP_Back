package org.com.userSell.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="carsellrequests")
public class CarSell {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String region;
    private String phone;
    private String time;
    private String mileage;
    private String price;
    private String color;
    private String notes;
    @Column(name = "orderstatus" )
    private String orderStatus;

    // Getters and Setters
}
