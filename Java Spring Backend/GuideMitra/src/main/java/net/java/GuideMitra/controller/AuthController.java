package net.java.GuideMitra.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import net.java.GuideMitra.dto.LoginRequest;
import net.java.GuideMitra.dto.SignupRequest;
import net.java.GuideMitra.entity.User;
import net.java.GuideMitra.service.UserService;

@CrossOrigin(origins = "https://guide-mitra.vercel.app", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS })
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        User newUser = userService.registerUser(signupRequest);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = userService.loginUser(loginRequest);
        if (user.isPresent()) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
