package org.com.cars.service;

import org.com.cars.entity.Car;
import org.com.cars.repository.CarRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

  private final CarRepository carRepository;

  public CarService(CarRepository carRepository) {
    this.carRepository = carRepository;
  }

  public ResponseEntity<List<Car>> getAllCars() {
    List<Car> cars = carRepository.findAll();
    if (cars.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok(cars);
  }

  public Optional<Car> getCarById(Long carId) {
    return carRepository.findById(carId);
  }

  public List<Car> getCarsBySellerId(Long sellerId) {
    return carRepository.findBySellerId(sellerId);
  }

  // 차량 등록
  public Car saveCar(Car car) {
    // 중복확인
    Optional<Car> carOptional = carRepository.findByCarNumber(car.getCarNumber());
    if (carOptional.isPresent()) {
      throw new IllegalArgumentException("409");
    }
    if (car.getModel() == null || car.getMake() == null) {
      throw new IllegalArgumentException("400"); // 400 처리용
    }
    return carRepository.save(car); // 201 성공
  }

  // 차량 업데이트
  public void updateCar(Car car) {
    carRepository.save(car);
  }


  public void deleteCar(Long carId) {
    carRepository.deleteById(carId);
  }

  // 차량 조회
  public List<Car> filterCars(
      String make, String model, String color, Integer year, String status,
      Double minPrice, Double maxPrice, Double minMileage, Double maxMileage,
      String fuelType, String transmission) {
      Specification<Car> spec = CarSpecifications.filterCars(
        make, model, color, year, status, minPrice, maxPrice, minMileage, maxMileage, fuelType, transmission);
    return carRepository.findAll(spec);
  }
}

