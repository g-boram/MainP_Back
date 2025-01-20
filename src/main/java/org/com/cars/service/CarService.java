package org.com.cars.service;

import org.com.cars.entity.Car;
import org.com.cars.repository.CarRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

  private final CarRepository carRepository;

  public CarService(CarRepository carRepository) {
    this.carRepository = carRepository;
  }

  public List<Car> getAllCars() {
    return carRepository.findAll();
  }

  public Optional<Car> getCarById(Long carId) {
    return carRepository.findById(carId);
  }

  public List<Car> getCarsBySellerId(Long sellerId) {
    return carRepository.findBySellerId(sellerId);
  }

  // 차량 등록
  public Car saveCar(Car car) {
    return carRepository.save(car);
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