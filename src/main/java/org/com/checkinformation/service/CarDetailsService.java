package org.com.checkinformation.service;

import org.com.checkinformation.entity.CarDetails;
import org.com.checkinformation.repository.CarDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarDetailsService {

    @Autowired
    private CarDetailsRepository carDetailsRepository;

    // 차량 번호 형식 검증 로직 제거하고 DB에 해당 차량 번호가 있는지만 확인
    public boolean isCarNumberExist(String carNumber) {
        Optional<CarDetails> carDetails = carDetailsRepository.findByCarNumber(carNumber);
        return carDetails.isPresent();  // 차량 번호가 DB에 존재하면 true 반환
    }

    // 차량 번호와 소유자명 일치 여부 확인
    public boolean isOwnerNameValid(String carNumber, String ownerName) {
        Optional<CarDetails> carDetails = carDetailsRepository.findByCarNumberAndOwnerName(carNumber, ownerName);
        return carDetails.isPresent();  // 일치하는 데이터가 있으면 true 반환
    }

    // 차량 번호로 생년월일 검증 로직 제거하고 DB에 해당 차량 번호가 있는지만 확인
    public boolean isBirthDateValid(String carNumber, String birthDate) {
        Optional<CarDetails> carDetails = carDetailsRepository.findByCarNumber(carNumber);
        return carDetails.isPresent();  // 차량 번호가 DB에 존재하면 true 반환
    }
}
