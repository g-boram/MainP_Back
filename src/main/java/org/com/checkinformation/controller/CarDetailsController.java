package org.com.checkinformation.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.com.checkinformation.entity.CarDetails;
import org.com.checkinformation.repository.CarDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "https://www.hicar.shop", allowCredentials = "true")
@Tag(name = "CheckCar API", description = "차량조회 API")
public class CarDetailsController {

    @Autowired
    private CarDetailsRepository carDetailsRepository;

    @Operation(summary = "차량번호 조회 여부", description = "입력된 번호와 데이터베이스에 저장된 차량번호와 비교합니다.")
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "존재하는 차량번호",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = "{\"valid\": \"true || false\"}")
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
    @GetMapping("/details/validate/{carNumber}")
    public ValidationResponse validateCarNumber(@PathVariable("carNumber") String carNumber) {
        Optional<CarDetails> carDetails = carDetailsRepository.findByCarNumber(carNumber);
        System.out.println(carNumber);
        System.out.println(carDetails.isPresent());
        return new ValidationResponse(carDetails.isPresent());  // 존재하면 true 반환
    }



    @Operation(summary = "소유주 조회 여부", description = "입력된 이름과 데이터베이스에 저장된 이름을 비교합니다.")
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "존재하는 소유주 이름",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = "{\"valid\": \"true || false\"}")
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
    @GetMapping("/details/validate/ownername")
    public ValidationResponse validateOwnerName(
            @RequestParam String ownerName,
            @RequestParam String carNumber) {

        Optional<CarDetails> carDetails = carDetailsRepository.findByCarNumberAndOwnerName(carNumber, ownerName);
        System.out.println(carDetails.isPresent());
        System.out.println(carNumber+ownerName);
        return new ValidationResponse(carDetails.isPresent());  // 존재하면 true 반환
    }



    @Operation(summary = "생년월일 조회 여부", description = "입력된 생년월일과 데이터베이스에 저장된 생년월일을 비교합니다.")
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "일치하는 생년월일",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = "{\"valid\": \"true || false\"}")
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
    @GetMapping("/details/validate/birthdate")
    public ValidationResponse validateBirthDate(
            @RequestParam String birthDate,
            @RequestParam String carNumber) {

        Optional<CarDetails> carDetails = carDetailsRepository.findByCarNumber(carNumber);
        System.out.println(carDetails.isPresent());
        System.out.println(birthDate+carNumber);

        return new ValidationResponse(carDetails.isPresent());  // 차량 번호 존재 여부만 체크
    }


    public static class ValidationResponse {
        private boolean isValid;

        public ValidationResponse(boolean isValid) {
            this.isValid = isValid;
        }

        public boolean isValid() {
            return isValid;
        }

        public void setValid(boolean isValid) {
            this.isValid = isValid;
        }
    }

    @Operation(summary = "차량 조회", description = "입력된 차량번호로 차량정보 조회.")
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "차량번호로 차량정보 조회.",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = "{\"id\": 0, \"carNumber\": \"string\", \"ownerNumber\": \"string\", \"birthDate\": \"string\", \"carName\": \"string\", \"carPrice\": \"string\"}")
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
    @GetMapping("/details/{carNumber}")
    public CarDetails getCarDetailsByCarNumber(@PathVariable("carNumber") String carNumber) {
        Optional<CarDetails> carDetails = carDetailsRepository.findByCarNumber(carNumber);
        if (carDetails.isPresent()) {
            return carDetails.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found");
        }
    }

}
