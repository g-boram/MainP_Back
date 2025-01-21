package org.com.userSell.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.com.cars.entity.Car;
import org.com.userSell.DTO.CarSellRequest;
import org.com.userSell.entity.CarSell;
import org.com.userSell.service.CarSellService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carsell")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "CarSell API", description = "차량판매 API")
public class CarSellController {

    private final CarSellService carSellService;

    public CarSellController(CarSellService carSellService) {
        this.carSellService = carSellService;
    }

    @Operation(summary = "견적 요청 신청서 전부 가져오기", description = "저장된 견적 요청 신청서를 전부 조회합니다.")
    @GetMapping
    public List<CarSell> getAllCars() {
        return carSellService.getAllCars();
    }

    @Operation(summary = "견적 요청 신청서 저장하기", description = "전송된 견적 요청 신청서 저장합니다.")
    @PostMapping
    public ResponseEntity<String> submitCarSellForm(@RequestBody CarSell request) {
        carSellService.saveCarSell(request);
        return ResponseEntity.ok("신청서가 저장되었습니다.");
    }

}
