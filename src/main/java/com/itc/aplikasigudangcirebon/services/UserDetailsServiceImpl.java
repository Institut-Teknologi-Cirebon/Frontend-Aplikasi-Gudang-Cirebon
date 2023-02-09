package com.itc.aplikasigudangcirebon.services;

import com.itc.aplikasigudangcirebon.entities.User;
import com.itc.aplikasigudangcirebon.repositories.UserRepository;
import com.itc.aplikasigudangcirebon.security.UserDetailsImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository repository;

    public UserDetailsServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByUsername(username)
                .orElseThrow();
        return new UserDetailsImpl(user);
    }
}
