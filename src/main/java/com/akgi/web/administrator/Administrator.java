package com.akgi.web.administrator;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpSession;

import org.springframework.ui.Model;

@Controller
@RequestMapping("/administrator")
public class Administrator {

    @GetMapping("/index")
    public String getAdminPage(HttpSession session, Model model) {
        // session에서 user 객체를 가져옴
        Object user = session.getAttribute("user");

        // user 객체를 모델에 추가
        model.addAttribute("user", user);

        // index.mustache를 반환
        return "/administrator/index";
    }
}