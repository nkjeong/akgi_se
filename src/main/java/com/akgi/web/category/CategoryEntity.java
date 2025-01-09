package com.akgi.web.category;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class CategoryEntity {

    @Id
    private String code;
    private String name;
    private String orderMenu;
    private String nameEng;
    
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
	public String getOrderMenu() {
		return orderMenu;
	}
	public void setOrderMenu(String orderMenu) {
		this.orderMenu = orderMenu;
	}
	public String getNameEng() {
		return nameEng;
	}
	public void setNameEng(String nameEng) {
		this.nameEng = nameEng;
	}
	
	public CategoryEntity(String code, String name, String orderMenu, String nameEng) {
		super();
		this.code = code;
		this.name = name;
		this.orderMenu = orderMenu;
		this.nameEng = nameEng;
	}
	public CategoryEntity() {
	}
}