"use strict";

let scroll_y = 0;
const isLogin = document.querySelector('.isLogin');
const authority = document.querySelector('.authority');

if(authority){
	if(authority.value === 'A'){
		const admin = document.querySelector('.admin');
		admin.style.display = 'block';
	}
}

// 스크롤 위치 업데이트
window.addEventListener('scroll', () => {
    scroll_y = window.scrollY; // 또는 window.pageYOffset
});

// 공통 함수: 모달 열기
const openModal = async (title, contentSetter, e) => {
    const modalElement = document.querySelector('.new-modal');
    const contentBox = document.querySelector('.content-box');

    modalElement.style.top = `${scroll_y}px`;
	console.log(scroll_y)
    // 기존 모달 제목 제거
    const existingTitle = contentBox.querySelector('.modal-info');
    if (existingTitle) existingTitle.remove();

    // 새 모달 제목 추가
    const modalTitle = document.createElement('section');
    modalTitle.setAttribute('class', 'modal-info');
    modalTitle.innerHTML = `
        <section class="modal-close modal-title"><span>${title}</span> <i class="fa-solid fa-xmark fa-beat"></i></section>
    `;
	if(e.dataset.evt === 'img-detail'){
		const itemLine = e.dataset.item.replace(/&quot;/g, '"');
		const item = JSON.parse(itemLine);
		let sPrice = '0';
		const code = item.code;
		
		if(isLogin){
			sPrice = `<b style="color:#dc3545;">${getCurrentMony(item.servicePrice)}</b>`;
		}else{
			sPrice = sPrice + ' [login info]';
		}
		const option = item.option;
		let optionValue = '';
		if(option === 'N'){
			optionValue = '옵션없음';
		}else{
			const fetchedOption = await fetchOptionByCode(code);
			if (fetchedOption) {
	            optionValue = fetchedOption.value;
	        } else {
	            console.log('Option not found');
	        }
		}
		modalTitle.innerHTML += `
			<section class="item-info">
				<section><img src="${rootURL}/images/1000/gransen_${code}.jpg"></section>
				<section>
					<section>
						<section>
							<section>소비자가</section>
							<section>${getCurrentMony(item.price)}</section>
						</section>
						<section>
							<section>공급가</section>
							<section>${sPrice}</section>
						</section>
						<section>
							<section>상품코드</section>
							<section>${item.code}</section>
						</section>
						<!--<section>
							<section>규격</section>
							<section>${item.massage}</section>
						</section>
						<section>
							<section>사이즈</section>
							<section>${item.size}</section>
						</section>
						<section>
							<section>품번</section>
							<section>${item.itemNumber}</section>
						</section>-->
						<section>
							<section>원산지</section>
							<section>${item.origin}</section>
						</section>
						<!--<section>
							<section>등록일</section>
							<section>${item.regDate}</section>
						</section>-->
						<section>
							<section>옵션</section>
							<section>${option}</section>
						</section>
						<section>
							<section>옵션값</section>
							<section>${optionValue}</section>
						</section>
					</section>
				</section>
			</section>
		`;
		contentBox.classList.add('re-size-content-box-detail');
	}
	if(e.dataset.evt === 'login'){
			contentBox.classList.add('re-size-content-box-login');
		}

    // 닫기 버튼 이벤트 등록
    const closeBtn = modalTitle.querySelector('.modal-close i');
    closeBtn.addEventListener('click', () => closeModal(modalElement, modalTitle, contentBox));

    contentBox.prepend(modalTitle);

    // 모달 활성화
    modalElement.classList.add('new-modal-open');
    contentBox.classList.add('content-box-slide');
    document.body.style.overflow = 'hidden';

    // 내용 설정
    const scrollableContent = modalElement.querySelector('.scrollable-content');
    scrollableContent.innerHTML = contentSetter();
	
	if(e.dataset.evt === 'join'){
		const pw = scrollableContent.querySelector('.user_pw');
		const pwCon = scrollableContent.querySelector('.user_pw_confirm');
		const conditionPassword = scrollableContent.querySelector('.condition-password');
		const conditionMsg = scrollableContent.querySelector('.condition-msg');
		validatePassword(pw, pwCon, conditionPassword, conditionMsg);
		
		const userId = scrollableContent.querySelector('.user_id');
		const conditionId = scrollableContent.querySelector('.condition-id');
		validateUserId(userId, conditionId, conditionMsg);
		
		const zipCode = scrollableContent.querySelector('.company_zip_code');
		const addr_1 = scrollableContent.querySelector('.company_addr_1');
		const addr_2 = scrollableContent.querySelector('.company_addr_2');
		address(zipCode, addr_1, addr_2);
		
		const form = scrollableContent.querySelector('form[name="joinForm"]');
		const resetBtn = scrollableContent.querySelector('.btn[type="reset"]');
		rest(resetBtn, form);
	}else if(e.dataset.evt === 'modify'){
		const memberData = e.dataset.memberdb.replace(/&quot;/g, '"');
		const memberDB = JSON.parse(memberData);
		const getForm = scrollableContent.querySelector('form');
		getForm.setAttribute('name','modifyForm');
		getForm.setAttribute('class','modifyForm');
		getForm.setAttribute('onsubmit','return modifyData(event);');
		
		getForm.userName.value = memberDB.userName;
		getForm.userId.value = memberDB.userId;
		getForm.userEmail.value = memberDB.userEmail;
		getForm.companyName.value = memberDB.companyName;
		getForm.businessNumber.value = memberDB.businessNumber;
		getForm.companyZipCode.value = memberDB.companyZipCode;
		getForm.companyAddr_1.value = memberDB.companyAddr1;
		getForm.companyAddr_2.value = memberDB.companyAddr2;
		getForm.userMobilePhone.value = memberDB.userMobilePhone;
		getForm.companyPhone.value = memberDB.companyPhone;
		getForm.companyFAX.value = memberDB.companyFAX;
		getForm.userId.setAttribute('readonly', true);
	}
};

const fetchOptionByCode = async (code) => {
	const url = `/api/options/${code}`;
	try {
	    const response = await fetch(url, {
	        method: 'GET',
	        headers: {
	            'Content-Type': 'application/json',
	        },
	    });

	    if (!response.ok) {
	        throw new Error(`HTTP error! status: ${response.status}`);
	    }

	    const option = await response.json();
	    return option;
	} catch (error) {
	    console.error('Error fetching option:', error);
	}
}

// 공통 함수: 모달 닫기
const closeModal = (modalElement, modalTitle, contentBox) => {
    modalElement.classList.remove('new-modal-open');
	contentBox.classList.remove('content-box-slide');
	contentBox.classList.remove('re-size-content-box-detail');
	contentBox.classList.remove('re-size-content-box-login');
    modalTitle.remove();
    document.body.style.overflow = 'scroll';
};

// 모달 초기화
const modal = (openMode) => {
    if (openMode === 'member') {
		if(isLogin){
			const memberModify = document.querySelector('.member-modify');
			if(memberModify){
			    memberModify.addEventListener('click', (e) => {
			        openModal('회원정보수정', setJoinForm, e.currentTarget);
			    });
			}
		}else{
			// '회원가입' 버튼 이벤트 등록
			const memberJoin = document.querySelector('.member-join');
			if(memberJoin){
			    memberJoin.addEventListener('click', (e) => {
			        openModal('회원가입', setJoinForm, e.currentTarget);
			    });
			}

			// '로그인' 버튼 이벤트 등록
			const memberLogin = document.querySelector('.member-login');
			if(memberLogin){
				memberLogin.addEventListener('click', (e) => {
				    openModal('로그인', setLoginForm, e.currentTarget);
				});
			}
		}
    } else {
        const data = openMode.dataset.item.replace(/&quot;/g, '"');
        const item = JSON.parse(data);

        openModal(item.name, () => setItemDetail(item), openMode);
    }
};

modal('member'); // 'member' 모드 초기화

// 회원가입 폼 HTML 생성
const setJoinForm = () => `
    <form name="joinForm" class="joinForm" onsubmit="return dataSubmit(event);">
		${[
		    { label: '이름', required: true, type: 'text', maxlength: 15, placeholder: '이름을 입력하세요.', class: 'user_name', name: 'userName' },
		    { label: '아이디', required: true, type: 'text', maxlength: 20, placeholder: '아이디를 입력하세요. 10자이상 15자 이하', class: 'user_id', name: 'userId' },
		    { label: '비밀번호', required: true, type: 'password', maxlength: 20, placeholder: '비밀번호를 입력하세요. 12자 이상 20자 이상', class: 'user_pw', name: 'userPw' },
		    { label: '비밀번호확인', required: true, type: 'password', maxlength: 20, placeholder: '비밀번호를 다시 입력하세요.', class: 'user_pw_confirm', name: 'user_pw_confirm' },
		    { label: '이메일', required: true, type: 'email', placeholder: '이메일 주소를 입력하세요.', class: 'user_email', name: 'userEmail' },
		    { label: '회사이름', required: true, type: 'text', maxlength: 30, placeholder: '회사 이름을 입력하세요.', class: 'company_name', name: 'companyName' },
		    { label: '사업자등록번호', required: true, type: 'number', maxlength: 10, placeholder: '사업자 등록번호를 입력하세요.', class: 'business_number', name: 'businessNumber' },
		    { label: '우편번호(회사)', required: true, type: 'text', readonly: true, placeholder: '우편번호를 입력하세요.', class: 'company_zip_code', name: 'companyZipCode' },
		    { label: '주소(회사)', required: true, type: 'text', readonly: true, placeholder: '회사 주소를 입력하세요.', class: 'company_addr_1', name: 'companyAddr_1' },
		    { label: '상세주소(회사)', required: true, type: 'text', maxlength: 100, placeholder: '상세 주소를 입력하세요.', class: 'company_addr_2', name: 'companyAddr_2' },
		    { label: '핸드폰번호', required: true, type: 'number', maxlength: 12, placeholder: '핸드폰 번호를 입력하세요.', class: 'user_mobile_phone', name: 'userMobilePhone' },
		    { label: '전화번호(회사)', required: true, type: 'number', maxlength: 12, placeholder: '회사 전화번호를 입력하세요.', class: 'company_phone', name: 'companyPhone' },
		    { label: '팩스번호(회사)', required: false, type: 'number', maxlength: 12, placeholder: '회사 팩스번호를 입력하세요.', class: 'companyfax', name: 'companyFAX' },
		]
		    .map(
		        ({ label, required, type, maxlength, readonly, placeholder, class: className, name }) => `
		        <div class="input-group input-group-sm mb-3">
		            <span class="input-group-text">${label}</span>
		            <input 
		                type="${type}" 
		                class="form-control ${className}" 
		                name="${name}" 
		                ${required ? 'required' : ''} 
		                ${maxlength ? `maxlength="${maxlength}"` : ''} 
		                ${readonly ? 'readonly' : ''} 
		                placeholder="${placeholder}">
		        </div>`
		    )
		    .join('')}
			<input type="hidden" class="condition-password" name="condition-password" value="">
			<input type="hidden" class="condition-id" name="condition-id" value="">
			<input type="hidden" class="userPhone" name="userPhone" value="no">
			<input type="hidden" class="userFAX" name="userFAX" value="no">
			<input type="hidden" class="userZipCode" name="userZipCode" value="no">
			<input type="hidden" class="userAddr_1" name="userAddr_1" value="no">
			<input type="hidden" class="userAddr_2" name="userAddr_2" value="no">
			<input type="hidden" class="authority" name="authority" value="C">
			<input type="hidden" class="userSubscribe" name="userSubscribe" value="N">
			<div class="join-btns">
				<div>
					<input class="btn btn-primary" type="submit" value="Submit">
					<input class="btn btn-primary" type="reset" value="Reset">
				</div>
			</div>
    </form>
    <div class="member-msg">
		<div>
			대광악기사는 사업자 회원제로 운영되고 있습니다.<br>
			사업자등록증을 아래 팩스 또는 이메일을 이용하여 발송하여 주십시오.<br>
			회원 승인 후 사이트를 이용할 수 있습니다.<br>
			팩스 : 02-458-5776<br>
			이메일 : kyc100k@naver.com<br>
			전화 : 02-456-2383
		</div>
		<div class="condition-msg"></div>
    </div>
`;

// 로그인 폼 HTML 생성
const setLoginForm = () => `
	<section class="login-form-wrapper" name="loginFormWrapper">
		<form name="loginForm" onsubmit="return login(event)">
			<div class="form-floating mb-3">
			  <input type="text" class="form-control" id="floatingInput" placeholder="아이디를 입력하세요" required name="userId">
			  <label for="floatingInput">아이디</label>
			</div>
			<div class="form-floating mb-3">
			  <input type="password" class="form-control" id="floatingPassword" placeholder="비밀번호를 입력하세요" required name="userPw">
			  <label for="floatingPassword">비밀번호</label>
			</div>
		    <button type="submit" class="btn btn-primary">로그인</button>
			<section class="login-failure-msg"></section>
		</form>
	</section>
`;

// 아이템 상세 정보 HTML 생성
const setItemDetail = (item) => `
    <div class="item-detail">
        <div>
			<img src="${rootURL}/images/detail/gransen_${item.code}.jpg">
		</div>
    </div>
`;

const validatePassword = (pw, pwCon, conditionPassword, conditionMsg) => {
    // 비밀번호 검증 로직
    const passwordRegex = /^[a-z0-9~!@#$%&*]+$/; // 허용된 문자 (영문 소문자, 숫자, 특수 문자)
    const mustContainLowercase = /[a-z]/; // 반드시 포함: 영문 소문자
    const mustContainNumber = /[0-9]/; // 반드시 포함: 숫자
    const mustContainSpecialChar = /[~!@#$%&*]/; // 반드시 포함: 특수 문자

    const updateValidationResult = () => {
        const password = pw.value;
        const passwordConfirm = pwCon.value;

        let message = '';
        let isValid = true;

        // 비밀번호 길이 검증
        if (password.length < 12 || password.length > 20) {
            message = '비밀번호는 12~20자로 입력해야 합니다.';
            isValid = false;
        }

        // 비밀번호 허용된 문자 검증
        if (isValid && !passwordRegex.test(password)) {
            message = '비밀번호는 영문 소문자, 숫자, ~!@#$%&*만 입력 가능합니다.';
            isValid = false;
        }

        // 비밀번호 구성 검증 (영문 소문자 포함 여부)
        if (isValid && !mustContainLowercase.test(password)) {
            message = '비밀번호에는 영문 소문자가 반드시 포함되어야 합니다.';
            isValid = false;
        }

        // 비밀번호 구성 검증 (숫자 포함 여부)
        if (isValid && !mustContainNumber.test(password)) {
            message = '비밀번호에는 숫자가 반드시 포함되어야 합니다.';
            isValid = false;
        }

        // 비밀번호 구성 검증 (특수 문자 포함 여부)
        if (isValid && !mustContainSpecialChar.test(password)) {
            message = '비밀번호에는 ~!@#$%&* 중 하나의 특수 문자가 반드시 포함되어야 합니다.';
            isValid = false;
        }

        // 비밀번호 확인 일치 여부 검증
        if (isValid && password !== passwordConfirm) {
            message = '비밀번호가 일치하지 않습니다.';
            isValid = false;
        }

        // 조건에 따른 결과 반영
        if (isValid) {
            message = '비밀번호 조건을 만족합니다.';
            conditionPassword.value = 'Y';
        } else {
            conditionPassword.value = 'N';
        }

        // 메시지 출력
        conditionMsg.textContent = message;
        conditionMsg.style.color = isValid ? 'blue' : 'red';
    };

    // 이벤트 리스너 등록
    pw.addEventListener('keyup', updateValidationResult);
    pwCon.addEventListener('keyup', updateValidationResult);
};


const validateUserId = (userId, conditionId, conditionMsg) => {
    // 아이디 검증 로직
    const allowedCharsRegex = /^[a-zA-Z0-9_]+$/; // 허용된 문자: 영문 대소문자, 숫자, 밑줄(_)
    const mustContainLetter = /[a-zA-Z]/; // 반드시 포함: 영문 대문자 또는 소문자
    const mustContainNumber = /[0-9]/; // 반드시 포함: 숫자
    const noTripleCharsRegex = /(.)\1\1/; // 같은 문자 3회 연속 금지
    const minLength = 7; // 최소 길이
    const maxLength = 15; // 최대 길이

    const updateValidationResult = async () => {
        const idValue = userId.value.trim();

        let message = '';
        let isValid = true;

        // 아이디 길이 검증
        if (idValue.length < minLength || idValue.length > maxLength) {
            message = `아이디는 ${minLength}자 이상 ${maxLength}자 이하로 입력해야 합니다.`;
            isValid = false;
        }

        // 아이디 허용된 문자 검증
        if (isValid && !allowedCharsRegex.test(idValue)) {
            message = '아이디는 영문 대소문자, 숫자, 밑줄(_)만 입력 가능합니다.';
            isValid = false;
        }

        // 아이디 구성 검증: 영문 대소문자 중 하나 포함 여부
        if (isValid && !mustContainLetter.test(idValue)) {
            message = '아이디에는 영문 대문자 또는 소문자가 반드시 포함되어야 합니다.';
            isValid = false;
        }

        // 아이디 구성 검증: 숫자 포함 여부
        if (isValid && !mustContainNumber.test(idValue)) {
            message = '아이디에는 숫자가 반드시 포함되어야 합니다.';
            isValid = false;
        }

        // 아이디 구성 검증: 같은 문자 3회 연속 금지
        if (isValid && noTripleCharsRegex.test(idValue)) {
            message = '아이디에 같은 문자를 3번 이상 사용할 수 없습니다.';
            isValid = false;
        }

        // 서버에 아이디 중복 확인 요청
        if (isValid) {
            try {
                const response = await fetch(`/checkUserId?userId=${encodeURIComponent(idValue)}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const result = await response.text();

                    if (result === 'MEMBER') {
                        message = '이미 사용중인 아이디입니다. 다른 아이디를 입력하세요.';
                        isValid = false;
                    } else if (result === 'NO-MEMBER') {
                        message = '사용할 수 있는 아이디입니다.';
                    } else {
                        message = '서버에서 알 수 없는 응답을 받았습니다.';
                        isValid = false;
                    }
                } else {
                    message = '서버 요청 중 오류가 발생했습니다.';
                    isValid = false;
                }
            } catch (error) {
                message = '서버 요청 중 오류가 발생했습니다.';
                isValid = false;
            }
        }

        // 조건에 따른 결과 반영
        conditionId.value = isValid ? 'Y' : 'N';

        // 메시지 출력
        conditionMsg.textContent = message;
        conditionMsg.style.color = isValid ? 'blue' : 'red';
    };

    // 이벤트 리스너 등록
    userId.addEventListener('keyup', updateValidationResult);
};

const address = (zipCode, addr_1, addr_2) => {
    const addClickListener = (element) => {
        element.addEventListener('click', () => {
            openAddressBoard(zipCode, addr_1, addr_2);
        });
    };

    [zipCode, addr_1].forEach(addClickListener);
};

const openAddressBoard = (zipCode, addr_1, addr_2) => {
	new daum.Postcode({
	    oncomplete: function(data) {
	        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

	        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
	        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	        var roadAddr = data.roadAddress; // 도로명 주소 변수
	        var extraRoadAddr = ''; // 참고 항목 변수

	        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
	        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
	        if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
	            extraRoadAddr += data.bname;
	        }
	        // 건물명이 있고, 공동주택일 경우 추가한다.
	        if(data.buildingName !== '' && data.apartment === 'Y'){
	           extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	        }
	        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
	        if(extraRoadAddr !== ''){
	            extraRoadAddr = ' (' + extraRoadAddr + ')';
	        }

	        // 우편번호와 주소 정보를 해당 필드에 넣는다.
	        zipCode.value = data.zonecode;
	        addr_1.value = roadAddr;
	        /*document.getElementById("sample4_jibunAddress").value = data.jibunAddress;*/
	        
	        // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
	        if(roadAddr !== ''){
	            addr_2.value = extraRoadAddr;
	        } else {
	            addr_2.value = '';
	        }
	    }
	}).open();
}

async function dataSubmit(event) {
    event.preventDefault(); // 폼의 기본 동작을 막음

    const form = event.target;
    const formData = new FormData(form);

    // Hidden input 검증
    const conditionPassword = form.querySelector('.condition-password').value;
    const conditionId = form.querySelector('.condition-id').value;

    if (conditionPassword !== 'Y' || conditionId !== 'Y') {
        alert('아이디 또는 비밀번호 조건을 만족하지 못했습니다. 확인 후 다시 시도해 주세요.');
        return false; // 데이터 전송 중단
    }

    // 폼 데이터를 JSON 객체로 변환
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/join/memberJoin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.text();

        if (response.ok) {
            alert(`회원가입을 축하합니다. 로그인 하시기 바랍니다.\n페이지가 새로고침 됩니다.`);
            location.href = '/';
        } else {
            alert(`회원가입 중에 오류가 발생했습니다. 잠시 후 다시 시도해 주세요!`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('서버와의 통신 중 오류가 발생했습니다.');
    }
}

async function modifyData(event){
	event.preventDefault(); // 폼의 기본 동작을 막음

	    const form = event.target;
	    const formData = new FormData(form);
}

async function login(event){
	event.preventDefault(); // 폼의 기본 동작을 막음

    const form = event.target;
    const formData = new FormData(form);
	

    // 폼 데이터를 JSON 객체로 변환
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/login/isMember', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.text();

        if (response.ok && result === 'SUCCESS') {
            alert('로그인 성공! 메인 페이지로 이동합니다.');
            location.href = '/';
        } else {
            form.querySelector('.login-failure-msg').innerText = 
                '아이디 또는 비밀번호가 맞지 않습니다. 다시 로그인 하세요!';
        }
    } catch (error) {
        console.error('Error:', error);
        form.querySelector('.login-failure-msg').innerText = 
            '서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
    }
}

const rest = (btn, f) => {
	btn.addEventListener('click', () => {
	    const form = f;
	    form.reset(); // 폼 필드 초기화
	    // 숨겨진 input 값 초기화
	    form.querySelectorAll('input[type="hidden"]').forEach(hiddenInput => {
	        hiddenInput.value = hiddenInput.defaultValue || ''; // 기본값으로 초기화
	    });
	    alert('입력 내용이 초기화되었습니다.');
	});
}