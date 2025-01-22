package org.com.map;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "map")
public class Map {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String category;
  private String codeName;
  private String name;
  private String telNo;
  private Double lat;
  private Double lng;
  private String address;
  private String openTime;
  private String closeTime;
  private String weekClose;
}