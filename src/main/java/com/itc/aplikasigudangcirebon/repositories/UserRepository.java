package com.itc.aplikasigudangcirebon.repositories;

import com.itc.aplikasigudangcirebon.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}
