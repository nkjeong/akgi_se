package com.akgi.web.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    public String login(@RequestParam("userId") String userId, 
                        @RequestParam("userPw") String userPw, 
                        HttpSession session, 
                        Model model) {
        User user = userService.findByUserId(userId);
        if (user != null && user.getUserPw().equals(userPw)) {
            session.setAttribute("user", user);
            return "redirect:/";
        } else {
            model.addAttribute("error", "아이디 또는 비밀번호가 맞지 않습니다. 다시 로그인 하세요!");
            return "login/index"; // 템플릿 경로 포함
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
    public String memberJoin(@RequestParam("userSubscribe") String userSubscribe, 
				    		 @RequestParam("authority") String authority, 
				    		 @RequestParam("userName") String userName, 
    						 @RequestParam("userId") String userId, 
                             @RequestParam("userPw") String userPw, 
                             @RequestParam("userEmail") String userEmail, 
                             @RequestParam("userZipCode") String userZipCode,
                             @RequestParam("userAddr_1") String userAddr1,
                             @RequestParam("userAddr_2") String userAddr2,
                             @RequestParam("userPhone") String userPhone,
                             @RequestParam("userMobilePhone") String userMobilePhone,
                             @RequestParam("userFAX") String userFAX,
                             @RequestParam("companyName") String companyName,
                             @RequestParam("businessNumber") String businessNumber,
                             @RequestParam("companyZipCode") String companyZipCode,
                             @RequestParam("companyAddr_1") String companyAddr1,
                             @RequestParam("companyAddr_2") String companyAddr2,
                             @RequestParam("companyPhone") String companyPhone,
                             @RequestParam("companyFAX") String companyFAX,
                             Model model) {
        User user = new User();
        user.setId(userService.generateNewIdx()); // 새로운 idx 값 설정
        user.setUserSubscribe(userSubscribe);
        user.setAuthority(authority);
        user.setUserName(userName);
        user.setUserId(userId);
        user.setUserPw(userPw);
        user.setUserEmail(userEmail);
        user.setUserZipCode(userZipCode);
        user.setUserAddr1(userAddr1);
        user.setUserAddr2(userAddr2);
        user.setUserPhone(userPhone);
        user.setUserMobilePhone(userMobilePhone);
        user.setUserFAX(userFAX);
        user.setCompanyName(companyName);
        user.setBusinessNumber(businessNumber);
        user.setCompanyZipCode(companyZipCode);
        user.setCompanyAddr1(companyAddr1);
        user.setCompanyAddr2(companyAddr2);
        user.setCompanyPhone(companyPhone);
        user.setCompanyFAX(companyFAX);

        userService.saveUser(user);

        return "redirect:/login";
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
