package org.com;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactRoutingController {

  @GetMapping(value = {"/{path:[^\\.]*}", "/{path:[^\\.]*}/**"})
  public String redirectToIndex() {
    return "forward:/index.html";
  }
}
