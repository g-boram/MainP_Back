package org.com.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.com.user.dto.UserDto;
import org.com.user.entity.User;
import org.com.user.entity.User.Role;
import org.com.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "https://www.hicar.shop")
@Tag(name = "User API", description = "회원 관련 API")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  // 모든 사용자 조회
  @Operation(summary = "모든 사용자 조회", description = "모든 사용자 정보를 반환합니다.")
  @ApiResponses({
      @ApiResponse(
          responseCode = "200",
          description = "사용자 조회 성공",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"userId\": 1, \"username\": \"string\", \"email\": \"test@test.com\", \"phoneNumber\": \"string\", \"role\": \"USER\"}")
          )
      ),
      @ApiResponse(
          responseCode = "400",
          description = "사용자 조회 실패",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"message\": \"요청 처리 중 오류가 발생했습니다.\"}")
          )
      ),
  })
  @GetMapping
  public ResponseEntity<Object> getAllUsers() {
    try {
      List<User> users = userService.getAllUsers();
      return ResponseEntity.ok(users);
    } catch (Exception e) {
      User message = new User();
      message.setResMessage("요청 처리 중 오류가 발생했습니다.");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }
  }


  @Operation(summary = "필터링된 사용자 조회", description = "필터링된 사용자 정보를 반환합니다.")
  @ApiResponses({
      @ApiResponse(
          responseCode = "200",
          description = "사용자 조회 성공",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"userId\": 1, \"username\": \"string\", \"email\": \"test@test.com\", \"phoneNumber\": \"string\", \"role\": \"USER\"}")
          )
      ),
      @ApiResponse(
          responseCode = "400",
          description = "사용자 조회 실패",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"message\": \"요청 처리 중 오류가 발생했습니다.\"}")
          )
      ),
  })
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
  @ApiResponses({
      @ApiResponse(
          responseCode = "200",
          description = "사용자 조회 성공",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"userId\": 1, \"username\": \"string\", \"email\": \"test@test.com\", \"phoneNumber\": \"string\", \"role\": \"USER\"}")
          )
      ),
      @ApiResponse(
          responseCode = "404",
          description = "사용자를 찾을 수 없음",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"message\": \"해당 ID의 사용자를 찾을 수 없습니다.\"}")
          )
      ),
      @ApiResponse(
          responseCode = "400",
          description = "사용자 조회 실패",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"message\": \"요청 처리 중 오류가 발생했습니다.\"}")
          )
      ),
  })
  @GetMapping("/{id}")
  public ResponseEntity<UserDto> getUserById(@PathVariable Integer id) {

    try {
      UserDto userDTO = userService.getUserById(id);
      return ResponseEntity.ok(userDTO);
    }catch (Exception e) {

      UserDto message = new UserDto();
      message.setResMessage("요청 처리 중 오류가 발생했습니다.");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }
  }

  // 이메일 중복체크
  @Operation(summary = "이메일 중복체크", description = "전달된 값과 데이터베이스 중복확인.")
  @ApiResponses({
      @ApiResponse(
          responseCode = "200",
          description = "사용가능한 이메일 입니다.",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"email\": \"test@test.com\", \"isDuplicated\": true || false }")
          )
      ),
      @ApiResponse(
          responseCode = "400",
          description = "사용자 조회 실패",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"message\": \"요청 처리 중 오류가 발생했습니다.\"}")
          )
      ),
  })
  @GetMapping("/checkEmail")
  public ResponseEntity<Map<String, Object>> checkEmail(@RequestParam String email) {
    boolean isDuplicated = userService.isEmailDuplicated(email);

    Map<String, Object> response = new HashMap<>();
    response.put("email", email);
    response.put("isDuplicated", isDuplicated);

    return ResponseEntity.ok(response);
  }

  // 사용자 수정
  @Operation(summary = "특정 사용자 수정", description = "ID 값에 해당하는 사용자 정보를 수정합니다.")
  @ApiResponses({
      @ApiResponse(
          responseCode = "200",
          description = "사용자 정보 수정 성공",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"message\": \"정보가 수정 되었습니다.\"}")
          )
      ),
      @ApiResponse(
          responseCode = "400",
          description = "사용자 정보 수정 실패",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "{\"message\": \"요청 처리 중 오류가 발생했습니다.\"}")
          )
      ),
  })
  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Integer id, @Validated @RequestBody User user) {
    User message = new User();
    try {
      userService.updateUser(id, user);
      message.setResMessage("정보가 수정 되었습니다.");
      return ResponseEntity.ok(message);
    } catch (Exception e) {
      message.setResMessage("요청 처리 중 오류가 발생했습니다.");
      return ResponseEntity.status(400).body(message);
    }
  }

  // 사용자 삭제
  @Operation(summary = "특정 사용자 삭제", description = "특정 사용자 정보를 삭제합니다.")
  @ApiResponses({
      @ApiResponse(
          responseCode = "204",
          description = "사용자 정보 삭제 성공",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "\"해당 사용자 정보가 삭제 되었습니다.\"")
          )
      ),
      @ApiResponse(
          responseCode = "400",
          description = "사용자 정보 삭제 실패",
          content = @Content(
              mediaType = "application/json",
              examples = @ExampleObject(value = "\"요청 처리 중 오류가 발생했습니다.\"")
          )
      ),
  })
  @DeleteMapping("/{id}")
  public ResponseEntity<User> deleteUser(@PathVariable Integer id) {
    User message = new User();
    try {
      userService.deleteUser(id);
      message.setResMessage("해당 사용자 정보가 삭제 되었습니다.");
      return ResponseEntity.ok(message);
    } catch (Exception e) {
      message.setResMessage("요청 처리 중 오류가 발생했습니다.");
      return ResponseEntity.status(400).body(message);
    }
  }

  // 역할(Role)별 사용자 조회
  @Operation(summary = "권한별 사용자 조회", description = "권한별 사용자 정보를 반환합니다.")
  @GetMapping("/role/{role}")
  public ResponseEntity<List<User>> getUsersByRole(@PathVariable Role role) {
    List<User> users = userService.getUsersByRole(role);
    return ResponseEntity.ok(users);
  }
}
