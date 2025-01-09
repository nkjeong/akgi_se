"use strict";
//input focus, blur 이벤트
const input = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"]');
input.forEach(inp => {
	inp.addEventListener('focus', (field) =>{
		field.currentTarget.style.backgroundColor = `#2c2c2c`;
	});
	inp.addEventListener('blur', (field) =>{
		field.currentTarget.style.backgroundColor = `#111111`;
	});
});

//패스원드 검증
class PasswordValidator {
    constructor(passwordSelector1, passwordSelector2, feedbackSelector, statusSelector) {
        this.password1Element = document.querySelector(passwordSelector1);
        this.password2Element = document.querySelector(passwordSelector2);
        this.feedbackElement = document.querySelector(feedbackSelector);
        this.statusElement = document.querySelector(statusSelector);

        this.addEventListeners();
    }
    hasSpecialChar(value) {
        const specialChars = ['!', '@', '#', '%', '_'];
        return specialChars.some(char => value.includes(char));
    }
    hasConsecutiveChars(str) {
        for (let i = 0; i < str.length - 2; i++) {
            if (str[i] === str[i + 1] && str[i + 1] === str[i + 2]) {
                return true;
            }
        }
        return false;
    }
    validatePasswords() {
        const pwd1 = this.password1Element.value;
        const pwd2 = this.password2Element.value;
        if (pwd1.trim().length === 0 || pwd2.trim().length === 0) {
            this.feedbackElement.innerHTML = '<span style="color:#e42221;">동일한 비밀번호를 입력하세요</span>';
            this.statusElement.value = 'NO';
            return;
        }
        if (pwd1 !== pwd2) {
            this.feedbackElement.innerHTML = '<span style="color:#e42221;">동일한 비밀번호를 입력하세요</span>';
            this.statusElement.value = 'NO';
            return;
        }
        if (!this.hasSpecialChar(pwd1)) {
            this.feedbackElement.innerHTML = `<span style="color:#e42221;">"!, @, #, %, _" 중에 1자 이상 포함하세요</span>`;
            this.statusElement.value = 'NO';
            return;
        }
        this.feedbackElement.innerHTML = '<span style="color:#00a67d;">비밀번호 사용가능!</span>';
        this.statusElement.value = 'YES';
    }
    addEventListeners() {
		if(this.password1Element && this.password2Element){
			[this.password1Element, this.password2Element].forEach(passwordInput => {
	            passwordInput.addEventListener('keyup', () => {
	                if (passwordInput.value.length < 10) {
	                    this.feedbackElement.innerHTML = `<span style="color:#e42221;">비밀번호를 10자 이상 입력해 주세요</span>`;
	                    this.statusElement.value = 'NO';
	                } else if (this.hasConsecutiveChars(passwordInput.value)) {
	                    this.feedbackElement.innerHTML = `<span style="color:#e42221;">연속문자 3자 이상 사용불가!</span>`;
	                    this.statusElement.value = 'NO';
	                } else {
	                    this.validatePasswords();
	                }
	            });
	        });
		}
    }
}
const validator = new PasswordValidator('.userPw', '.userPwRe', '.ckPassword', '.ckPwd');