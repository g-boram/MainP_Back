package org.com.userSell.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.com.cars.entity.Car;
import org.com.userSell.DTO.CarSellRequest;
import org.com.userSell.entity.CarSell;
import org.com.userSell.repository.CarSellRepository;
import org.com.userSell.service.CarSellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/carsell")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "https://www.hicar.shop")
@Tag(name = "CarSell API", description = "온라인 견적요청 신청서 API")
public class CarSellController {

    @Autowired
    private CarSellRepository carSellRepository;
    private final CarSellService carSellService;

    public CarSellController(CarSellService carSellService) {
        this.carSellService = carSellService;
    }

    @Operation(summary = "견적 요청 신청서 전부 가져오기", description = "저장된 견적 요청 신청서를 전부 조회합니다.")
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "모든 견적 요청 신청서 조회 성공"
        ),
        @ApiResponse(
            responseCode = "400",
            description = "에러 발생, 해당하는 에러 내용 출력됨",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = "{\"message\": \"Error ...\"}")
            )
        ),
    })
    @GetMapping
    public List<CarSell> getAllCars() {
        return carSellService.getAllCars();
    }

    @Operation(summary = "견적 요청 신청서 저장하기", description = "전송된 견적 요청 신청서 저장합니다.")
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "견적 요청 신청서 저장 성공",
            content = @Content(
            mediaType = "application/json",
            examples = @ExampleObject(value = "\"신청서가 저장되었습니다.\"")
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "에러 발생, 해당하는 에러 내용 출력됨",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = "{\"message\": \"Error ...\"}")
            )
        ),
    })
    @PostMapping
    public ResponseEntity<String> submitCarSellForm(@RequestBody CarSell request) {
        carSellService.saveCarSell(request);
        return ResponseEntity.ok("신청서가 저장되었습니다.");
    }

    @Operation(summary = "온라인 요청 신청서 상태값 변경하기", description = "기존에 저장된 온라인 요청 신청서 상태값을 변경합니다.")
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "신청서 상태값 변경 성공",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = "\"신청서의 상태값이 변경 되었습니다.\"")
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "신청서의 ID 값을 찾을 수 없음",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = "\"신청서의 ID 값을 찾을 수 없습니다.\"")
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "에러 발생, 해당하는 에러 내용 출력됨",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = "{\"message\": \"Error ...\"}")
            )
        ),
    })
    @PatchMapping("/{id}/status")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long id, @RequestParam String orderStatus) {
        Optional<CarSell> carSellOptional = carSellRepository.findById(id);

        if (carSellOptional.isPresent()) {
            CarSell carSell = carSellOptional.get();
            carSell.setOrderStatus(orderStatus);
            carSellRepository.save(carSell); // 업데이트 후 저장

            return ResponseEntity.ok("신청서의 상태값이 변경 되었습니다.");
        } else {
            return ResponseEntity.status(404).body("신청서의 ID 값을 찾을 수 없습니다.");
        }
    }
}
