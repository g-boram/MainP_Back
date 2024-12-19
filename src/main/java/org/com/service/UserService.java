package org.com.service;

import org.com.component.JwtUtil;
import org.com.entity.User;
import org.com.exception.CustomUserException;
import org.com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;



    // 로그인 처리
    public String login(String email, String password) throws Exception {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            return jwtUtil.generateToken(authentication.getName());
        } catch (Exception e) {
            throw new CustomUserException.InvalidCredentialsException("Invalid email or password");
        }
    }


    // 회원가입 처리
    public User registerUser(String username, String email, String password, String phoneNumber, String address) throws Exception {
        // 이메일 중복 체크
        if (userRepository.findByEmail(email).isPresent()) {
            throw new CustomUserException.UserAlreadyExistsException("Email already in use");
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(password);

        // 새 사용자 생성
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(encodedPassword);
        newUser.setRole(User.Role.USER); // 기본 역할 설정
//        newUser.setEnabled(true); // 활성화 상태 설정

        // 사용자 저장
        return userRepository.save(newUser);
    }
}

