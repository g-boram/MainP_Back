package org.com.map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/other")
public class MapController {

  private final MapService service;

  @Autowired
  public MapController(MapService service) {
    this.service = service;
  }

  @GetMapping("/maps")
  public List<Map> getAllMaps() {
    return service.getAllMaps();
  }
}
