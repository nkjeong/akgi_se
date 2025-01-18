package com.akgi.web.member;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpSession;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String loginForm() {
        return "login/index"; // 템플릿 경로 포함
    }

    @PostMapping("/login/isMember")
    @ResponseBody
    public String login(@RequestBody Map<String, String> requestData, 
                        HttpSession session) {
        // JSON 데이터에서 userId와 userPw 추출
        String userId = requestData.get("userId");
        String userPw = requestData.get("userPw");

        // 사용자 인증 로직
        User user = userService.findByUserId(userId);
        if (user != null && user.getUserPw().equals(userPw)) {
            // 새로운 User 객체 생성 (userPw 제외)
            User sessionUser = new User();
            sessionUser.setId(user.getId());
            sessionUser.setUserName(user.getUserName());
            sessionUser.setUserId(user.getUserId());
            sessionUser.setUserEmail(user.getUserEmail());
            sessionUser.setUserSubscribe(user.getUserSubscribe());
            sessionUser.setAuthority(user.getAuthority());
            sessionUser.setUserZipCode(user.getUserZipCode());
            sessionUser.setUserAddr1(user.getUserAddr1());
            sessionUser.setUserAddr2(user.getUserAddr2());
            sessionUser.setUserPhone(user.getUserPhone());
            sessionUser.setUserMobilePhone(user.getUserMobilePhone());
            sessionUser.setUserFAX(user.getUserFAX());
            sessionUser.setCompanyName(user.getCompanyName());
            sessionUser.setBusinessNumber(user.getBusinessNumber());
            sessionUser.setCompanyZipCode(user.getCompanyZipCode());
            sessionUser.setCompanyAddr1(user.getCompanyAddr1());
            sessionUser.setCompanyAddr2(user.getCompanyAddr2());
            sessionUser.setCompanyPhone(user.getCompanyPhone());
            sessionUser.setCompanyFAX(user.getCompanyFAX());
            sessionUser.setRegDate(user.getRegDate());
            sessionUser.setModifyDate(user.getModifyDate());

            // 세션에 userPw를 제외한 데이터 저장
            session.setAttribute("user", sessionUser);
            return "SUCCESS";
        } else {
            return "failure";
        }
    }
    
    @PostMapping("/update/user")
    @ResponseBody
    public String updateUser(@RequestBody Map<String, Object> requestData, HttpSession session) {
        String userId = (String) requestData.get("userId");
        String userPw = (String) requestData.get("userPw");

        User existingUser = userService.findByUserId(userId);

        if (existingUser != null && existingUser.getUserPw().equals(userPw)) {
            existingUser.setUserName((String) requestData.get("userName"));
            existingUser.setUserEmail((String) requestData.get("userEmail"));
            existingUser.setUserSubscribe((String) requestData.get("userSubscribe"));
            existingUser.setAuthority((String) requestData.get("authority"));
            existingUser.setUserZipCode((String) requestData.get("userZipCode"));
            existingUser.setUserAddr1((String) requestData.get("userAddr_1"));
            existingUser.setUserAddr2((String) requestData.get("userAddr_2"));
            existingUser.setUserPhone((String) requestData.get("userPhone"));
            existingUser.setUserMobilePhone((String) requestData.get("userMobilePhone"));
            existingUser.setUserFAX((String) requestData.get("userFAX"));
            existingUser.setCompanyName((String) requestData.get("companyName"));
            existingUser.setBusinessNumber((String) requestData.get("businessNumber"));
            existingUser.setCompanyZipCode((String) requestData.get("companyZipCode"));
            existingUser.setCompanyAddr1((String) requestData.get("companyAddr_1"));
            existingUser.setCompanyAddr2((String) requestData.get("companyAddr_2"));
            existingUser.setCompanyPhone((String) requestData.get("companyPhone"));
            existingUser.setCompanyFAX((String) requestData.get("companyFAX"));

            // 수정일을 LocalDateTime으로 설정
            existingUser.setModifyDate(LocalDateTime.ofInstant(new Date().toInstant(), ZoneId.systemDefault()));

            userService.saveUser(existingUser);
            session.setAttribute("user", existingUser);

            return "SUCCESS";
        } else {
            return "failure";
        }
    }



    @GetMapping("/")
    public String home(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        model.addAttribute("user", user);
        return "index"; // 홈 템플릿 경로
    }

    @GetMapping("/join")
    public String joinForm() {
        return "join/index"; // 회원 가입 템플릿 경로
    }

    @PostMapping("/join/memberJoin")
    @ResponseBody
    public String memberJoin(@RequestBody Map<String, Object> requestData) {
        User user = new User();
        user.setId(userService.generateNewIdx()); // 새로운 idx 값 설정

        // JSON 데이터를 User 객체에 매핑
        user.setUserSubscribe((String) requestData.get("userSubscribe"));
        user.setAuthority((String) requestData.get("authority"));
        user.setUserName((String) requestData.get("userName"));
        user.setUserId((String) requestData.get("userId"));
        user.setUserPw((String) requestData.get("userPw"));
        user.setUserEmail((String) requestData.get("userEmail"));
        user.setUserZipCode((String) requestData.get("userZipCode"));
        user.setUserAddr1((String) requestData.get("userAddr_1"));
        user.setUserAddr2((String) requestData.get("userAddr_2"));
        user.setUserPhone((String) requestData.get("userPhone"));
        user.setUserMobilePhone((String) requestData.get("userMobilePhone"));
        user.setUserFAX((String) requestData.get("userFAX"));
        user.setCompanyName((String) requestData.get("companyName"));
        user.setBusinessNumber((String) requestData.get("businessNumber"));
        user.setCompanyZipCode((String) requestData.get("companyZipCode"));
        user.setCompanyAddr1((String) requestData.get("companyAddr_1"));
        user.setCompanyAddr2((String) requestData.get("companyAddr_2"));
        user.setCompanyPhone((String) requestData.get("companyPhone"));
        user.setCompanyFAX((String) requestData.get("companyFAX"));

        // 사용자 저장
        userService.saveUser(user);

        return "SUCCESS";
    }
    
    @GetMapping("/checkUserId")
    @ResponseBody
    public String checkUserId(@RequestParam("userId") String userId) {
        User user = userService.findByUserId(userId);
        return (user != null) ? "MEMBER" : "NO-MEMBER";
    }
    
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }
}
