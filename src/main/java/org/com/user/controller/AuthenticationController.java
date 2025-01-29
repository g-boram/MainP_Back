package org.com.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.com.component.JwtUtil;
import org.com.user.entity.CustomUserDetails;
import org.com.user.entity.User;
import org.com.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Tag(name = "Auth API", description = "로그인/회원가입 관련 API")
public class AuthenticationController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Operation(
            summary = "로그인 하기",
            description = "데이터베이스에 저장된 회원 확인 후 토큰발급.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "가입유저 확인 예제",
                                    value = """
                                        {
                                          "email": "admin@test.com",
                                          "password": "admin"
                                        }
                                    """
                            )
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "가입유저 확인 성공",
                            content = @Content(
                                    mediaType = "application/json",
                                    examples = @ExampleObject(
                                            name = "가입유저 확인 예제",
                                            value = """
                                                    {
                                                       "token": "ABcd12 ..."
                                                     }
                                                    """,
                                            description = """
                                                    TODO: 리프레시 토큰 구현 고민
                                                    """
                                    )
                            )
                    )
            }
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "로그인 성공"),
        @ApiResponse(responseCode = "401", description = "아이디 또는 비밀번호가 잘못됨"),
        @ApiResponse(responseCode = "400", description = "유효하지 않은 요청 데이터")
    })
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email");
            String password = loginData.get("password");

            // 사용자 인증
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
            );

            // 인증된 사용자 정보 가져오기
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            // JWT 토큰 생성
            String token = jwtUtil.generateToken(userDetails.getUsername());

            // 응답 데이터 생성
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);

            Map<String, Object> user = new HashMap<>();
            user.put("id", userDetails.getUserId());
            user.put("email", userDetails.getUsername());
            user.put("phone", userDetails.getPhoneNumber());
            user.put("address", userDetails.getAddress());
            user.put("role", userDetails.getRole());
            user.put("username", userDetails.getUsernameDisplay());
            user.put("createdAt", userDetails.getCreatedAt());
            user.put("updatedAt", userDetails.getUpdatedAt());

            response.put("user", user);


            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // 디버깅을 위해 예외 출력
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "아이디와 비밀번호를 확인해주세요.");
            return ResponseEntity.status(401).body(errorResponse);
        }
    }




    // 회원가입 처리
    @Operation(
            summary = "회원가입 처리",
            description = "입력값에 맞게 회원정보를 등록.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "사용자 생성 예제",
                                    value = """
                                            {
                                               "email": "admin@test.com",
                                               "password": "admin",
                                               "username": "admin",
                                               "phoneNumber": "01011112222",
                                               "gender": "여",
                                               "imageUrl": "",
                                               "birth": "20240101"
                                             }
                                            """,
                                    description = """
                                            role 기본값 : USER,
                                            created_at : 자동생성,
                                            photoURL과 address는 가입시 입력하지 않음.
                                    """
                            )
                    )
            )
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "회원가입 성공", content = {}),
        @ApiResponse(responseCode = "409", description = "이미 존재하는 사용자 입니다.", content = {}),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터", content = {})
    })
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, String> registrationData) {
        try {
            String username = registrationData.get("username");
            String email = registrationData.get("email");
            String password = registrationData.get("password");
            String phoneNumber = registrationData.get("phoneNumber");
            String address = registrationData.get("address");
            String gender = registrationData.get("gender");
            String birth = registrationData.get("birth");
            String role = registrationData.get("role"); // role 추가
            String imageUrl = registrationData.get("imageUrl");

            // role 값 파싱
            User.Role userRole = null;
            if (role != null) {
                try {
                    userRole = User.Role.valueOf(role.toUpperCase());
                } catch (IllegalArgumentException ex) {
                    userRole = User.Role.USER; // 잘못된 값인 경우 기본값 설정
                }
            }
            // 회원가입
            userService.registerUser(username, email, password, phoneNumber, address, gender, birth, userRole, imageUrl);

            Map<String, String> response = new HashMap<>();
            response.put("message", "회원가입이 완료되었습니다.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            System.out.println("***** ERROR: 회원가입 ***** " + e.getMessage());
            errorResponse.put("message", "회원가입에 실패하였습니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}