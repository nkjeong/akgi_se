package com.akgi.web.categoryone;

import java.io.Serializable;
import java.util.Objects;

public class CategoryOneId implements Serializable {

	private static final long serialVersionUID = 1L;
	private String code;
    private String categoryCode;

    // 기본 생성자
    public CategoryOneId() {
    }

    // 모든 필드를 초기화하는 생성자
    public CategoryOneId(String code, String categoryCode) {
        this.code = code;
        this.categoryCode = categoryCode;
    }

    // Getters and Setters
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategoryOneId that = (CategoryOneId) o;
        return Objects.equals(code, that.code) && Objects.equals(categoryCode, that.categoryCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code, categoryCode);
    }

    @Override
    public String toString() {
        return "CategoryOneId{" +
                "code='" + code + '\'' +
                ", categoryCode='" + categoryCode + '\'' +
                '}';
    }
}
