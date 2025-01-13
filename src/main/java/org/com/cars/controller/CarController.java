package org.com.cars.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.com.cars.entity.Car;
import org.com.cars.service.CarService;
import org.com.board.service.S3Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/car")
@CrossOrigin(origins = "http://localhost:3000") // React frontend port
@Tag(name = "Car API", description = "자동차 관련 API")
public class CarController {

  private final CarService carService;
  private final S3Service s3Service;

  public CarController(CarService carService, S3Service s3Service) {
    this.carService = carService;
    this.s3Service = s3Service;
  }

  @Operation(
      summary = "전체 차량 조회",
      description = "전체 차량을 조회합니다."
  )
  @GetMapping
  public List<Car> getAllCars() {
    return carService.getAllCars();
  }

  @Operation(
      summary = "특정 ID 차량 조회하기",
      description = "특정 ID의 차량을 조회합니다."
  )
  @GetMapping("/{id}")
  public ResponseEntity<Car> getCarById(@PathVariable Long id) {
    return carService.getCarById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @Operation(
      summary = "특정 판매자가 담당하는 차량 조회",
      description = "특정 판매자가 판매하는 차량을 조회합니다."
  )
  @GetMapping("/seller/{sellerId}")
  public List<Car> getCarsBySeller(@PathVariable Long sellerId) {
    return carService.getCarsBySellerId(sellerId);
  }

  @Operation(
      summary = "필터링 된 차량 조회하기",
      description = "전달된 조건에 맞게 필터링 된 정보를 조회합니다."
  )
  @GetMapping("/filter")
  public List<Car> filterCars(
      @RequestParam(required = false) String make,
      @RequestParam(required = false) String model,
      @RequestParam(required = false) String color,
      @RequestParam(required = false) Integer year,
      @RequestParam(required = false) String status,
      @RequestParam(required = false) Double minPrice,
      @RequestParam(required = false) Double maxPrice,
      @RequestParam(required = false) Double minMileage,
      @RequestParam(required = false) Double maxMileage,
      @RequestParam(required = false) String fuelType,
      @RequestParam(required = false) String transmission
  ) {
    return carService.filterCars(make, model, color, year, status, minPrice, maxPrice, minMileage, maxMileage, fuelType, transmission);
  }


  @Operation(
      summary = "차량 게시글 생성",
      description = "신규 차량을 생성합니다. JSON 형태의 CarReq와 파일을 함께 전송합니다."
  )
  @PostMapping(consumes = {"multipart/form-data"})
  public Car createCar(
      @RequestPart("carReq") String carReq, // JSON 문자열로 받기
      @RequestPart(value = "file", required = false) MultipartFile file
  ) throws JsonProcessingException {
    System.out.println("[ createCar ]-----Controller executed!");

    // JSON을 객체로 변환
    ObjectMapper objectMapper = new ObjectMapper();
    Car car = objectMapper.readValue(carReq, Car.class);
    // 파일 처리
    if (file != null && !file.isEmpty()) {
      String fileUrl = s3Service.uploadFile(file);
      car.setImageUrl(fileUrl);
    }
    // 데이터 저장
    return carService.saveCar(car);
  }

  @Operation(
      summary = "차량 게시글 수정",
      description = "차량 정보를 수정합니다. JSON 형태의 CarReq와 파일을 함께 전송합니다."
  )
  @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
  public Car updateCar(
      @PathVariable Long id,
      @RequestPart("carReq") String carReq,
      @RequestPart(value = "file", required = false) MultipartFile file
  ) throws JsonProcessingException {
    System.out.println("[ updateCar ]-----Controller executed!");

    // JSON을 객체로 변환
    ObjectMapper objectMapper = new ObjectMapper();
    Car updatedCarData = objectMapper.readValue(carReq, Car.class);

    // 기존 데이터 가져오기
    Car existingCar = carService.getCarById(id)
        .orElseThrow(() -> new RuntimeException("Car not found with ID: " + id));

    // 기존 데이터를 새 데이터로 업데이트
    existingCar.setMake(updatedCarData.getMake());
    existingCar.setModel(updatedCarData.getModel());
    existingCar.setYear(updatedCarData.getYear());
    existingCar.setPrice(updatedCarData.getPrice());
    existingCar.setMileage(updatedCarData.getMileage());
    existingCar.setFuelType(updatedCarData.getFuelType());
    existingCar.setTransmission(updatedCarData.getTransmission());
    existingCar.setColor(updatedCarData.getColor());
    existingCar.setStatus(updatedCarData.getStatus());
    existingCar.setDescription(updatedCarData.getDescription());

    if (file != null && !file.isEmpty()) {
      String fileUrl = s3Service.uploadFile(file);
      existingCar.setImageUrl(fileUrl);
    }

    return carService.saveCar(existingCar);
  }

  @Operation(
      summary = "차량 게시글 삭제",
      description = "특정 차량을 삭제합니다."
  )
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
    if (carService.getCarById(id).isPresent()) {
      carService.deleteCar(id);
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }
}