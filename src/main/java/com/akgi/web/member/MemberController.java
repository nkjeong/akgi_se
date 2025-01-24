package com.akgi.web.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@RestController
@RequestMapping("/administrator")
public class MemberController {

    @Autowired
    private UserService userService;

    @GetMapping("/memberList")
    public ResponseEntity<List<User>> getMemberList() {
        List<User> members = userService.getAllUsers();
        return ResponseEntity.ok(members);
    }
    @PutMapping("/updateAuthority")
    public ResponseEntity<String> updateAuthority(@RequestParam String userId) {
        try {
            userService.updateAuthority(userId, "B");
            return ResponseEntity.ok("successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("error");
        }
    }
}