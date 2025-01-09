package com.akgi.web.member;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberController {

    @GetMapping("/joinPage")
    public String joinPage() {
        return "join/index";
    }
    
    @GetMapping("/loginPage")
    public String loginPage() {
        return "login/index";
    }
}