package org.com.checkinformation.controller;

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
public class CarDetailsController {

    @Autowired
    private CarDetailsRepository carDetailsRepository;

    // 차량 번호가 DB에 존재하는지 확인
    @GetMapping("/details/validate/{carNumber}")
    public ValidationResponse validateCarNumber(@PathVariable("carNumber") String carNumber) {
        // DB에서 차량 번호로 검색하여 존재 여부만 확인
        Optional<CarDetails> carDetails = carDetailsRepository.findByCarNumber(carNumber);
        System.out.println(carNumber);
        System.out.println(carDetails.isPresent());
        return new ValidationResponse(carDetails.isPresent());  // 존재하면 true 반환
    }

//     소유자명과 차량 번호가 일치하는지 DB에서 확인
    @GetMapping("/details/validate/ownername")
    public ValidationResponse validateOwnerName(
            @RequestParam String ownerName,
            @RequestParam String carNumber) {
        // DB에서 차량 번호와 소유자명으로 검색

        Optional<CarDetails> carDetails = carDetailsRepository.findByCarNumberAndOwnerName(carNumber, ownerName);
        System.out.println(carDetails.isPresent());
        System.out.println(carNumber+ownerName);
        return new ValidationResponse(carDetails.isPresent());  // 존재하면 true 반환
    }

//     차량 번호로 생년월일이 일치하는지 확인
    @GetMapping("/details/validate/birthdate")
    public ValidationResponse validateBirthDate(
            @RequestParam String birthDate,
            @RequestParam String carNumber) {
        // DB에서 차량 번호로 해당 차량 정보 조회
        Optional<CarDetails> carDetails = carDetailsRepository.findByCarNumber(carNumber);
        System.out.println(carDetails.isPresent());
        System.out.println(birthDate+carNumber);

        return new ValidationResponse(carDetails.isPresent());  // 차량 번호 존재 여부만 체크
    }

    // ValidationResponse 반환
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

    @GetMapping("/details/{carNumber}")
    public CarDetails getCarDetailsByCarNumber(@PathVariable("carNumber") String carNumber) {
        Optional<CarDetails> carDetails = carDetailsRepository.findByCarNumber(carNumber);
        if (carDetails.isPresent()) {
            System.out.println("getCarname 데이터값 : "+carDetails.get());
            return carDetails.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found");
        }
    }

}
