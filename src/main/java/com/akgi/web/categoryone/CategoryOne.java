package com.akgi.web.categoryone;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

@Entity
@IdClass(CategoryOneId.class)
public class CategoryOne {

    @Id
    private String code;

    private String name;

    @Id
    private String categoryCode;

    // 기본 생성자
    public CategoryOne() {
    }

    // 모든 필드를 초기화하는 생성자
    public CategoryOne(String code, String name, String categoryCode) {
        this.code = code;
        this.name = name;
        this.categoryCode = categoryCode;
    }
    
    public CategoryOneId getId() {
        return new CategoryOneId(this.code, this.categoryCode);
    }

    // Getters and Setters
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    @Override
    public String toString() {
        return "CategoryOne{" +
                "code='" + code + '\'' +
                ", name='" + name + '\'' +
                ", categoryCode='" + categoryCode + '\'' +
                '}';
    }
}
