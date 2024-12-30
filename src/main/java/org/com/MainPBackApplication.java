package org.com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:application.properties")
public class MainPBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainPBackApplication.class, args);
    }

}
