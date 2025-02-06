package org.com.toss.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.com.toss.entity.PaymentEntity;
import org.com.toss.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://www.hicar.shop")
@Tag(name = "Toss API", description = "Toss 결제 관련 API")
public class PaymentController {

  @Autowired
  private PaymentService paymentService;



  @Operation(
      summary = "결제 영수증 저장",
      description = "결제된 영수증을 저장합니다."
  )
  @PostMapping("/buy/success")
  public String savePayment(@RequestBody PaymentEntity payment) {
    paymentService.savePayment(payment);
    return "Payment data saved successfully!";
  }



  @Operation(
      summary = "전체 결제 영수증 조회하기",
      description = "결제된 모든 영수증을 조회합니다."
  )
  @GetMapping("/buy/order")
  public List<PaymentEntity> getDistinctOrderData() {
    return paymentService.getDistinctOrderIdsWithData();
  }
}
