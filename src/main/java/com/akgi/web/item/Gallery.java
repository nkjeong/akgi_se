package com.akgi.web.item;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "gallery")
public class Gallery {
    
    @Id
    private String code;
    private String name;
    private char option;
    private String price;
    private String servicePrice;
    private String massage;
    private int hit;
    private String categoryCode;
    private String openMarket;
    private String itemNumber;
    private String size;
    private String origin;
    private String gmarket;
    private String auction;
    private String interpark;
    private String st11;
    private String coupang;
    private char suggestion;
    private LocalDateTime regDate;
    private LocalDateTime modifyDate;
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
	public char getOption() {
		return option;
	}
	public void setOption(char option) {
		this.option = option;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getServicePrice() {
		return servicePrice;
	}
	public void setServicePrice(String servicePrice) {
		this.servicePrice = servicePrice;
	}
	public String getMassage() {
		return massage;
	}
	public void setMassage(String massage) {
		this.massage = massage;
	}
	public int getHit() {
		return hit;
	}
	public void setHit(int hit) {
		this.hit = hit;
	}
	public String getCategoryCode() {
		return categoryCode;
	}
	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}
	public String getOpenMarket() {
		return openMarket;
	}
	public void setOpenMarket(String openMarketvar) {
		this.openMarket = openMarketvar;
	}
	public String getItemNumber() {
		return itemNumber;
	}
	public void setItemNumber(String itemNumbervar) {
		this.itemNumber = itemNumbervar;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public String getOrigin() {
		return origin;
	}
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	public String getGmarket() {
		return gmarket;
	}
	public void setGmarket(String gmarket) {
		this.gmarket = gmarket;
	}
	public String getAuction() {
		return auction;
	}
	public void setAuction(String auction) {
		this.auction = auction;
	}
	public String getInterpark() {
		return interpark;
	}
	public void setInterpark(String interpark) {
		this.interpark = interpark;
	}
	public String getSt11() {
		return st11;
	}
	public void setSt11(String st11) {
		this.st11 = st11;
	}
	public String getCoupang() {
		return coupang;
	}
	public void setCoupang(String coupang) {
		this.coupang = coupang;
	}
	public char getSuggestion() {
		return suggestion;
	}
	public void setSuggestion(char suggestion) {
		this.suggestion = suggestion;
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
