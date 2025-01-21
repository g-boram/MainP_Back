package org.com.userSell.service;

import org.com.cars.entity.Car;
import org.com.userSell.DTO.CarSellRequest;
import org.com.userSell.entity.CarSell;
import org.com.userSell.repository.CarSellRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarSellService {

    private final CarSellRepository carSellRepository;

    public CarSellService(CarSellRepository carSellRepository) {
        this.carSellRepository = carSellRepository;
    }


    public List<CarSell> getAllCars() {
        return carSellRepository.findAll();
    }

    public void saveCarSell(CarSell request) {
        CarSell carSell = new CarSell();
        carSell.setRegion(request.getRegion());
        carSell.setPhone(request.getPhone());
        carSell.setTime(request.getTime());
        carSell.setMileage(request.getMileage());
        carSell.setPrice(request.getPrice());
        carSell.setColor(request.getColor());
        carSell.setNotes(request.getNotes());
        carSell.setEmail(request.getEmail());
        carSell.setUsername(request.getUsername());
        carSell.setOrderStatus(request.getOrderStatus());
        carSell.setOrderUserId(request.getOrderUserId());
        carSell.setSellerId(request.getSellerId());

        carSellRepository.save(carSell);
    }
}


