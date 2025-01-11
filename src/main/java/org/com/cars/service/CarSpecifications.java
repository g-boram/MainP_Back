package org.com.cars.service;

import jakarta.persistence.criteria.Predicate;
import org.com.cars.entity.Car;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class CarSpecifications {

  public static Specification<Car> filterCars(
      String make, String model, String color, Integer year, String status,
      Double minPrice, Double maxPrice, Double minMileage, Double maxMileage,
      String fuelType, String transmission) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (make != null && !make.isEmpty()) {
        predicates.add(criteriaBuilder.equal(root.get("make"), make));
      }
      if (model != null && !model.isEmpty()) {
        predicates.add(criteriaBuilder.equal(root.get("model"), model));
      }
      if (color != null && !color.isEmpty()) {
        predicates.add(criteriaBuilder.equal(root.get("color"), color));
      }
      if (year != null) {
        predicates.add(criteriaBuilder.equal(root.get("year"), year));
      }
      if (status != null && !status.isEmpty()) {
        predicates.add(criteriaBuilder.equal(root.get("status"), status));
      }

      if (minPrice != null) {
        predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
      }
      if (maxPrice != null) {
        predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
      }
      if (minMileage != null) {
        predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("mileage"), minMileage));
      }
      if (maxMileage != null) {
        predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("mileage"), maxMileage));
      }

      if (fuelType != null && !fuelType.isEmpty()) {
        predicates.add(criteriaBuilder.equal(root.get("fuelType"), fuelType));
      }
      if (transmission != null && !transmission.isEmpty()) {
        predicates.add(criteriaBuilder.equal(root.get("transmission"), transmission));
      }

      return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };
  }
}
