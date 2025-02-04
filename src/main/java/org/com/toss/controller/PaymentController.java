package org.com.toss.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.com.toss.entity.PaymentEntity;
import org.com.toss.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://boram-app.com.herokuapp.com")
@Tag(name = "Toss API", description = "Toss 결제 관련 API")
public class PaymentController {

  @Autowired
  private PaymentService paymentService;


  @PostMapping("/buy/success")
  public String savePayment(@RequestBody PaymentEntity payment) {
    paymentService.savePayment(payment);
    return "Payment data saved successfully!";
  }
  @GetMapping("/buy/order")
  public List<PaymentEntity> getDistinctOrderData() {
    return paymentService.getDistinctOrderIdsWithData();
  }
}
