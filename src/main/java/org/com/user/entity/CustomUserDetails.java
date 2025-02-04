package org.com.user.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role = "ROLE_" + user.getRole().toString();
        return Collections.singleton(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new IllegalStateException("User email cannot be null or empty");
        }
        return user.getEmail();
    }

    // 추가 정보 접근자 메서드
    public String getUserId() {
        return String.valueOf(user.getUserId());
    }

    public String getPhoneNumber() {
        return user.getPhoneNumber() != null ? user.getPhoneNumber() : "N/A";
    }

    public String getAddress() {
        return user.getAddress() != null ? user.getAddress() : "N/A";
    }

    public User.Role getRole() {
        return user.getRole();
    }

    public String getUsernameDisplay() {
        return user.getUsername();
    }

    public String getCreatedAt() {
        return user.getCreatedAt().toString();
    }

    public String getUpdatedAt() {
        return user.getUpdatedAt().toString();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 기본값 설정
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // 기본값 설정
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 기본값 설정
    }

    @Override
    public boolean isEnabled() {
        return true; // 기본값 설정
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        CustomUserDetails that = (CustomUserDetails) obj;
        return user.equals(that.user);
    }

    @Override
    public int hashCode() {
        return user.hashCode();
    }
}
