package org.com.userSell.service;

import org.com.userSell.DTO.CarSellRequest;
import org.com.userSell.entity.CarSell;
import org.com.userSell.repository.CarSellRepository;
import org.springframework.stereotype.Service;

@Service
public class CarSellService {

    private final CarSellRepository carSellRepository;

    public CarSellService(CarSellRepository carSellRepository) {
        this.carSellRepository = carSellRepository;
    }

    public void saveCarSell(CarSellRequest request) {
        CarSell carSell = new CarSell();
        carSell.setRegion(request.getRegion());
        carSell.setPhone(request.getPhone());
        carSell.setTime(request.getTime());
        carSell.setMileage(request.getMileage());
        carSell.setPrice(request.getPrice());
        carSell.setColor(request.getColor());
        carSell.setNotes(request.getNotes());

        carSellRepository.save(carSell);
    }
}


