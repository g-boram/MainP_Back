package org.com.cars.repository;

import org.com.cars.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface CarRepository extends JpaRepository<Car, Long>, JpaSpecificationExecutor<Car> {
  List<Car> findBySellerId(Long sellerId);
  List<Car> findByStatus(Car.Status status);

  Optional<Car> findByCarNumber(String carNumber);
}
