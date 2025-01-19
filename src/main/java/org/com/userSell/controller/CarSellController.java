package org.com.userSell.controller;

import org.com.userSell.DTO.CarSellRequest;
import org.com.userSell.service.CarSellService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/carsell")
public class CarSellController {

    private final CarSellService carSellService;

    public CarSellController(CarSellService carSellService) {
        this.carSellService = carSellService;
    }

    @PostMapping
    public ResponseEntity<String> submitCarSellForm(@RequestBody CarSellRequest request) {
        carSellService.saveCarSell(request);
        return ResponseEntity.ok("신청서가 저장되었습니다.");
    }
}
