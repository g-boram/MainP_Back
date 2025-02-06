package org.com.cars.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import org.com.board.service.S3Service;
import org.com.cars.entity.Car;
import org.com.cars.service.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/car")
@CrossOrigin(origins = "https://www.hicar.shop")
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
  public ResponseEntity<List<Car>> getAllCars() {
      return carService.getAllCars();
  }



  @Operation(
      summary = "특정 ID 차량 조회하기",
      description = "특정 ID의 차량을 조회합니다."
  )
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "차량 조회 성공"),
      @ApiResponse(responseCode = "404", description = "차량을 찾을 수 없음")
  })
  @GetMapping("/{id}")
  public ResponseEntity<Car> getCarById(@PathVariable Long id) {
    try {
      return carService.getCarById(id)
          .map(ResponseEntity::ok)
          .orElse(ResponseEntity.notFound().build());
    } catch (Exception e) {
      System.out.println("***** ERROR: 차량 ID 조회 ***** " + e.getMessage());

      Car errorCar = new Car();
      errorCar.setMessage("차량 조회에 실패하였습니다. 아이디값을 확인해 주세요");
      return ResponseEntity.status(404).body(errorCar);
    }
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
      summary = "신규차량 등록 및 생성",
      description = "신규 차량을 생성합니다. JSON 형태의 CarReq와 파일을 함께 전송합니다."
  )
  @ApiResponses({
      @ApiResponse(
          responseCode = "201",
          description = "차량 등록 성공",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"id\": 1, \"make\": \"Sonata\", \"model\": \"Hyundai\"}")
          )
      ),
      @ApiResponse(
          responseCode = "400",
          description = "제조사 또는 모델명이 입력되지 않았습니다.",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"message\": \"제조사 또는 모델명이 입력되지 않았습니다.\"}")
          )
      ),
      @ApiResponse(
          responseCode = "409",
          description = "이미 등록된 차량",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"message\": \"이미 등록된 차량입니다.\"}")
          )
      )
  })
  @PostMapping(consumes = {"multipart/form-data"})
  public Car createCar(
      @RequestPart("carReq") String carReq, // JSON 문자열로 받기
      @RequestPart(value = "file", required = false) MultipartFile file
  ) throws JsonProcessingException {
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());

      Car car = objectMapper.readValue(carReq, Car.class);
      // 파일 처리
      if (file != null && !file.isEmpty()) {
        String fileUrl = s3Service.uploadFile(file);
        car.setImageUrl(fileUrl);
      }
      // 데이터 저장
      return carService.saveCar(car);

    } catch (IllegalArgumentException e) {
      Car errorCar = new Car();
      String errorMessage = e.getMessage();

      if ("409".equals(errorMessage)) {
        errorCar.setMessage("이미 등록된 차량입니다.");
        return errorCar;
      } else if ("400".equals(errorMessage)) {
        errorCar.setMessage("제조사 또는 모델명이 입력되지 않았습니다.");
        return errorCar;
      }
      errorCar.setMessage("알수없는 오류가 발생했습니다.");
      return errorCar;
    }
  }




  @Operation(
      summary = "차량 정보 수정",
      description = "차량 정보를 수정합니다. JSON 형태의 CarReq와 파일을 함께 전송합니다."
  )
  @ApiResponses({
      @ApiResponse(
          responseCode = "201",
          description = "차량 수정 성공",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"id\": 1, \"make\": \"Sonata\", \"model\": \"Hyundai\"}")
          )
      ),
      @ApiResponse(
          responseCode = "404",
          description = "차량을 찾을 수 없음 (ID: 해당 차량이 존재하지 않음)",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"message\": \"해당 ID의 차량을 찾을 수 없습니다 : id\"}")
          )
      ),
  })
  @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
  public Car updateCar(
      @PathVariable Long id,
      @RequestPart("carReq") String carReq,
      @RequestPart(value = "file", required = false) MultipartFile file
  ) throws JsonProcessingException {

      Car resMessage = new Car();

      ObjectMapper objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());

      Car updatedCarData = objectMapper.readValue(carReq, Car.class);

      Car existingCar = carService.getCarById(id)
          .orElseThrow(() -> new EntityNotFoundException("해당 ID의 차량을 찾을 수 없습니다 : " + id));

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
      existingCar.setHashtags(updatedCarData.getHashtags());
      existingCar.setEventName(updatedCarData.getEventName());
      existingCar.setEventEndTime(updatedCarData.getEventEndTime());
      existingCar.setCarOptionData(updatedCarData.getCarOptionData());
      existingCar.setCarNumber(updatedCarData.getCarNumber());
      existingCar.setOrderUserId(updatedCarData.getOrderUserId());
      existingCar.setCarStatus(updatedCarData.getCarStatus());
      existingCar.setSellerStatus(updatedCarData.getSellerStatus());
      existingCar.setRepairUserId(updatedCarData.getRepairUserId());

      if (file != null && !file.isEmpty()) {
        String fileUrl = s3Service.uploadFile(file);
        existingCar.setImageUrl(fileUrl);
      }

      carService.updateCar(existingCar);
      resMessage.setMessage("게시글 수정이 완료되었습니다.");

      return resMessage;
  }

  @Operation(
      summary = "등록된 차량정보 삭제",
      description = "특정 차량을 삭제합니다."
  )
  @ApiResponses({
      @ApiResponse(responseCode = "204", description = "차량 삭제 성공"),
      @ApiResponse(responseCode = "404", description = "삭제할 차량을 찾을 수 없음")
  })
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
    if (carService.getCarById(id).isPresent()) {
      carService.deleteCar(id);
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }
}