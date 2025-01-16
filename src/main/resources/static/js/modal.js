"use strict";

let scroll_y = 0;

// 스크롤 위치 업데이트
window.addEventListener('scroll', () => {
    scroll_y = window.scrollY; // 또는 window.pageYOffset
});

// 공통 함수: 모달 열기
const openModal = (title, contentSetter) => {
    const modalElement = document.querySelector('.new-modal');
    const contentBox = document.querySelector('.content-box');

    modalElement.style.top = `${scroll_y}px`;

    // 기존 모달 제목 제거
    const existingTitle = contentBox.querySelector('.modal-info');
    if (existingTitle) existingTitle.remove();

    // 새 모달 제목 추가
    const modalTitle = document.createElement('section');
    modalTitle.setAttribute('class', 'modal-info');
    modalTitle.innerHTML = `
        <section class="modal-close"><i class="fa-solid fa-xmark fa-beat"></i></section>
        <section class="modal-title">${title}</section>
    `;

    // 닫기 버튼 이벤트 등록
    const closeBtn = modalTitle.querySelector('.modal-close i');
    closeBtn.addEventListener('click', () => closeModal(modalElement, modalTitle));

    contentBox.prepend(modalTitle);

    // 모달 활성화
    modalElement.classList.add('new-modal-open');
    contentBox.classList.add('content-box-slide');
    document.body.style.overflow = 'hidden';

    // 내용 설정
    const scrollableContent = modalElement.querySelector('.scrollable-content');
    scrollableContent.innerHTML = contentSetter();
};

// 공통 함수: 모달 닫기
const closeModal = (modalElement, modalTitle) => {
    modalElement.classList.remove('new-modal-open');
    modalTitle.remove();
    document.body.style.overflow = 'scroll';
};

// 모달 초기화
const modal = (openMode) => {
    if (openMode === 'member') {
        // '회원가입' 버튼 이벤트 등록
        document.querySelector('.member-join').addEventListener('click', () => {
            openModal('회원가입', setJoinForm);
        });

        // '로그인' 버튼 이벤트 등록
        document.querySelector('.member-login').addEventListener('click', () => {
            openModal('로그인', setLoginForm);
        });
    } else {
        const data = openMode.dataset.item.replace(/&quot;/g, '"');
        const item = JSON.parse(data);

        openModal(item.name, () => setItemDetail(item));
    }
};

modal('member'); // 'member' 모드 초기화

// 회원가입 폼 HTML 생성
const setJoinForm = () => `
    <form name="joinForm">
        ${[
            { label: '이름', required: true },
            { label: '아이디', required: true },
            { label: '비밀번호', required: true },
            { label: '비밀번호확인', required: true },
            { label: '이메일', required: true },
            { label: '회사이름', required: true },
            { label: '사업자등록번호', required: true },
            { label: '우편번호(회사)', required: true },
            { label: '주소(회사)', required: true },
            { label: '상세주소(회사)', required: true },
            { label: '핸드폰번호', required: true },
            { label: '전화번호(회사)', required: true },
            { label: '팩스번호(회사)', required: false },
        ]
            .map(
                ({ label, required }) => `
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text">${label}</span>
                    <input type="${required ? 'text' : 'text'}" class="form-control" required="${required}">
                </div>`
            )
            .join('')}
    </form>
    <div class="member-msg">
        대광악기사는 사업자 회원제로 운영되고 있습니다.<br>
        사업자등록증을 아래 팩스 또는 이메일을 이용하여 발송하여 주십시오.<br>
        회원 승인 후 사이트를 이용할 수 있습니다.<br>
        팩스 : 02-458-5776<br>
        이메일 : kyc100k@naver.com<br>
        전화 : 02-456-2383
    </div>
`;

// 로그인 폼 HTML 생성
const setLoginForm = () => `
    <form name="loginForm">
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text">아이디</span>
            <input type="text" class="form-control" required>
        </div>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text">비밀번호</span>
            <input type="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">로그인</button>
    </form>
`;

// 아이템 상세 정보 HTML 생성
const setItemDetail = (item) => `
    <div class="item-detail">
        <h3>${item.name}</h3>
        <p>${item.description || '상세 정보가 없습니다.'}</p>
    </div>
`;
