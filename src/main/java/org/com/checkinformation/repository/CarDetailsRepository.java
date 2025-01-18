package org.com.checkinformation.repository;

import org.com.checkinformation.entity.CarDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CarDetailsRepository extends JpaRepository<CarDetails, Long> {

    // 차량번호로 CarDetails 찾기
    Optional<CarDetails> findByCarNumber(String carNumber);

    // 차량번호와 소유자명으로 CarDetails 찾기
    Optional<CarDetails> findByCarNumberAndOwnerName(String carNumber, String ownerName);
}
