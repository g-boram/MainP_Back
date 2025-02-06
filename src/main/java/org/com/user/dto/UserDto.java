package org.com.user.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.com.user.entity.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

  private Integer userId;
  private String username;
  private String email;
  private String phoneNumber;
  private String role;
  private String resMessage;
}
