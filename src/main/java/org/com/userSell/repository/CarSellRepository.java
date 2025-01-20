package org.com.userSell.repository;

import org.com.userSell.entity.CarSell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarSellRepository extends JpaRepository<CarSell, Long> {
}