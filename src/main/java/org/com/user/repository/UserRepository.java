package org.com.user.repository;

import org.com.user.entity.User;
import org.com.user.entity.User.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    List<User> findByRole(Role role);

    @Query("SELECT u FROM User u WHERE " +
        "(:username IS NULL OR u.username = :username) AND " +
        "(:email IS NULL OR u.email LIKE %:email%) AND" +
        "(:phoneNumber IS NULL OR u.phoneNumber = :phoneNumber) AND " +
        "(:gender IS NULL OR u.gender = :gender) AND " +
        "(:address IS NULL OR u.address LIKE %:address%)"
    )
    List<User> findUsersByCriteria(
        @Param("username") String username,
        @Param("email") String email,
        @Param("phoneNumber") String phoneNumber,
        @Param("gender") String gender,
        @Param("address") String address
        );

}
