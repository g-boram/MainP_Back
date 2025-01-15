package org.com.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.com.user.dto.UserDto;
import org.com.user.entity.User;
import org.com.user.entity.User.Role;
import org.com.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  // 모든 사용자 조회
  @Operation(summary = "모든 사용자 조회", description = "모든 사용자 정보를 반환합니다.")
  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.getAllUsers();
    return ResponseEntity.ok(users);
  }

  @GetMapping("/filter")
  public List<User> getFilterUsers(@RequestParam(required = false) String username,
                                   @RequestParam(required = false) String email,
                                   @RequestParam(required = false) String phoneNumber,
                                   @RequestParam(required = false) String gender,
                                   @RequestParam(required = false) String address
                             ) {
    return userService.getUsersByCriteria(username, email, phoneNumber, gender, address);
  }

  // ID로 사용자 조회
  @Operation(summary = "특정 사용자 조회", description = "ID 값에 해당하는 사용자 정보를 반환합니다.")
  @GetMapping("/{id}")
  public ResponseEntity<UserDto> getUserById(@PathVariable Integer id) {
    UserDto userDTO = userService.getUserById(id);
    return ResponseEntity.ok(userDTO);
  }

  // 사용자 수정
  @Operation(summary = "특정 사용자 수정", description = "ID 값에 해당하는 사용자 정보를 수정합니다.")
  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Integer id, @Validated @RequestBody User user) {
    User updatedUser = userService.updateUser(id, user);
    return ResponseEntity.ok(updatedUser);
  }

  // 사용자 삭제
  @Operation(summary = "특정 사용자 삭제", description = "특정 사용자 정보를 삭제합니다.")
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
    userService.deleteUser(id);
    return ResponseEntity.ok("User deleted successfully");
  }

  // 역할(Role)별 사용자 조회
  @Operation(summary = "권한별 사용자 조회", description = "권한별 사용자 정보를 반환합니다.")
  @GetMapping("/role/{role}")
  public ResponseEntity<List<User>> getUsersByRole(@PathVariable Role role) {
    List<User> users = userService.getUsersByRole(role);
    return ResponseEntity.ok(users);
  }
}
