package com.akgi.web.member;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
public class User {

    @Id
    @Column(name = "idx", length = 4)
    private String id;

    @Column(name = "userId")
    private String userId;

    @Column(name = "userPw")
    private String userPw;

    @Column(name = "userName")
    private String userName;

    @Column(name = "userPhone")
    private String userPhone;

    @Column(name = "userMobilePhone")
    private String userMobilePhone;

    @Column(name = "userFAX")
    private String userFAX;

    @Column(name = "userZipCode")
    private String userZipCode;

    @Column(name = "userAddr_1")
    private String userAddr1;

    @Column(name = "userAddr_2")
    private String userAddr2;

    @Column(name = "authority")
    private String authority;

    @Column(name = "userEmail")
    private String userEmail;

    @Column(name = "companyName")
    private String companyName;

    @Column(name = "companyPhone")
    private String companyPhone;

    @Column(name = "companyFAX")
    private String companyFAX;

    @Column(name = "businessNumber")
    private String businessNumber;

    @Column(name = "userSubscribe")
    private String userSubscribe;

    @Column(name = "companyZipCode")
    private String companyZipCode;

    @Column(name = "companyAddr_1")
    private String companyAddr1;

    @Column(name = "companyAddr_2")
    private String companyAddr2;

    @Column(name = "regDate")
    private LocalDateTime regDate;

    @Column(name = "modifyDate")
    private LocalDateTime modifyDate;

    @PrePersist
    protected void onCreate() {
        regDate = LocalDateTime.now();
        modifyDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        modifyDate = LocalDateTime.now();
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserPw() {
        return userPw;
    }

    public void setUserPw(String userPw) {
        this.userPw = userPw;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public String getUserMobilePhone() {
        return userMobilePhone;
    }

    public void setUserMobilePhone(String userMobilePhone) {
        this.userMobilePhone = userMobilePhone;
    }

    public String getUserFAX() {
        return userFAX;
    }

    public void setUserFAX(String userFAX) {
        this.userFAX = userFAX;
    }

    public String getUserZipCode() {
        return userZipCode;
    }

    public void setUserZipCode(String userZipCode) {
        this.userZipCode = userZipCode;
    }

    public String getUserAddr1() {
        return userAddr1;
    }

    public void setUserAddr1(String userAddr1) {
        this.userAddr1 = userAddr1;
    }

    public String getUserAddr2() {
        return userAddr2;
    }

    public void setUserAddr2(String userAddr2) {
        this.userAddr2 = userAddr2;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyPhone() {
        return companyPhone;
    }

    public void setCompanyPhone(String companyPhone) {
        this.companyPhone = companyPhone;
    }

    public String getCompanyFAX() {
        return companyFAX;
    }

    public void setCompanyFAX(String companyFAX) {
        this.companyFAX = companyFAX;
    }

    public String getBusinessNumber() {
        return businessNumber;
    }

    public void setBusinessNumber(String businessNumber) {
        this.businessNumber = businessNumber;
    }

    public String getUserSubscribe() {
        return userSubscribe;
    }

    public void setUserSubscribe(String userSubscribe) {
        this.userSubscribe = userSubscribe;
    }

    public String getCompanyZipCode() {
        return companyZipCode;
    }

    public void setCompanyZipCode(String companyZipCode) {
        this.companyZipCode = companyZipCode;
    }

    public String getCompanyAddr1() {
        return companyAddr1;
    }

    public void setCompanyAddr1(String companyAddr1) {
        this.companyAddr1 = companyAddr1;
    }

    public String getCompanyAddr2() {
        return companyAddr2;
    }

    public void setCompanyAddr2(String companyAddr2) {
        this.companyAddr2 = companyAddr2;
    }

    public LocalDateTime getRegDate() {
        return regDate;
    }

    public void setRegDate(LocalDateTime regDate) {
        this.regDate = regDate;
    }

    public LocalDateTime getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(LocalDateTime modifyDate) {
        this.modifyDate = modifyDate;
    }
}
