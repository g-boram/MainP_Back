package org.com.cars.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Embeddable;
import lombok.Data;
import org.com.conf.JsonListConverter;

import java.util.List;

@Embeddable
@Data
public class CarOption {

    @Convert(converter = JsonListConverter.class)
    private List<Integer> optionIcon;

    @JsonProperty("eEmission")
    private String eEmission;

    @JsonProperty("tuning")
    private String tuning;

    @JsonProperty("special")
    private String special;

    @JsonProperty("changeUsed")
    private String changeUsed;

    @JsonProperty("accident")
    private String accident;

    @JsonProperty("simpleRepair")
    private String simpleRepair;
}
