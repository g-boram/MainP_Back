package org.com.toss.service;

import org.com.toss.entity.PaymentEntity;
import org.com.toss.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PaymentService {

  @Autowired
  private PaymentRepository paymentRepository;

  public void savePayment(PaymentEntity payment) {
    paymentRepository.save(payment);
  }

  public List<PaymentEntity> getDistinctOrderIdsWithData() {
    return paymentRepository.findDistinctOrderIdsWithData();
  }
}