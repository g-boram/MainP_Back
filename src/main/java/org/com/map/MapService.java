package org.com.map;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MapService {

  private final MapRepository repository;

  public MapService(MapRepository repository) {
    this.repository = repository;
  }

  public List<Map> getAllMaps() {
    return repository.findAll();
  }
}
