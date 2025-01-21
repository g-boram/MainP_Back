package org.com.userSell.DTO;


import lombok.*;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarSellRequest {
    private String region;
    private String phone;
    private String time;
    private String mileage;
    private String price;
    private String color;
    private String notes;
    private String orderStatus;



}
