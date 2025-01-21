package org.com.userSell.DTO;


import lombok.*;
import java.time.LocalDateTime;

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
    private LocalDateTime createdAt; // 등록 시간 추가
    private String carNum;

    public void setCarNum(String carNum) {
        this.carNum = carNum;
    }

    public String getCarNum(){
        return carNum;
    }

    // Getter and Setter for createdAt
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Getter and Setter for region
    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }


    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    // Getter and Setter for phone
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Getter and Setter for time
    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    // Getter and Setter for mileage
    public String getMileage() {
        return mileage;
    }

    public void setMileage(String mileage) {
        this.mileage = mileage;
    }

    // Getter and Setter for price
    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    // Getter and Setter for color
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    // Getter and Setter for notes
    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
