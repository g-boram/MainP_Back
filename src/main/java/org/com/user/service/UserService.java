package org.com.user.service;

import jakarta.persistence.EntityNotFoundException;
import org.com.component.JwtUtil;
import org.com.user.dto.UserDto;
import org.com.user.entity.User;
import org.com.exception.CustomUserException;
import org.com.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public void registerUser(
        String username,
        String email,
        String password,
        String phoneNumber,
        String address,
        String gender,
        String birth,
        User.Role role,
        String imageUrl
    ) throws Exception {
        // 이메일 중복 체크
        if (userRepository.findByEmail(email).isPresent()) {
            throw new CustomUserException.UserAlreadyExistsException("이미 사용중인 이메일 입니다.");
        }
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(password);

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPhoneNumber(phoneNumber);
        newUser.setGender(gender);
        newUser.setPassword(encodedPassword);
        newUser.setBirth(birth);
        newUser.setAddress(address);
        newUser.setRole(role != null ? role : User.Role.USER);
        newUser.setImageUrl(imageUrl);

        userRepository.save(newUser);
    }

    // 전부 조회하기
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByIdAll(Integer id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("해당하는 ID의 유저가 없습니다. : " + id));
    }

    public boolean isEmailDuplicated(String email) {
        return userRepository.existsByEmail(email);
    }

    public UserDto getUserById(Integer id) {
        User user =  userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("해당하는 ID의 유저가 없습니다. : " + id));

        return new UserDto(
            user.getUserId(),
            user.getUsername(),
            user.getEmail(),
            user.getPhoneNumber(),
            user.getRole().name(),
            user.getResMessage()
        );
    }

    public List<User> getUsersByCriteria(String username, String email, String phoneNumber, String gender, String address) {

        return userRepository.findUsersByCriteria(username,
            email != null ? "%" + email + "%" : null,
            address != null ? "%" + address + "%" : null,
            phoneNumber, gender);
    }

    public void updateUser(Integer id, User updatedUser) {
        User existingUser = getUserByIdAll(id);
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
        existingUser.setGender(updatedUser.getGender());
        existingUser.setAddress(updatedUser.getAddress());
        existingUser.setRole(updatedUser.getRole());
        existingUser.setBirth(updatedUser.getBirth());
        existingUser.setAddress(updatedUser.getAddress());
        existingUser.setImageUrl(updatedUser.getImageUrl());
        existingUser.setUpdatedUserId(updatedUser.getUpdatedUserId());
        existingUser.setUpdatedUserName(updatedUser.getUpdatedUserName());

        userRepository.save(existingUser);
    }

    public void deleteUser(Integer id) {
        User user = getUserByIdAll(id);
        userRepository.delete(user);
    }

    public List<User> getUsersByRole(User.Role role) {
        return userRepository.findByRole(role);
    }
}

