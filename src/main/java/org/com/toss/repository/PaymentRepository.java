package org.com.toss.repository;

import org.com.toss.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, String> {


  @Query("SELECT p FROM PaymentEntity p WHERE p.orderId IN (SELECT DISTINCT p2.orderId FROM PaymentEntity p2)")
  List<PaymentEntity> findDistinctOrderIdsWithData();
}
