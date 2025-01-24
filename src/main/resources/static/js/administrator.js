"use strict";

const fetchMemberList = async () => {
    try {
        const response = await fetch('/administrator/memberList', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const memberList = await response.json();

        // 회원 리스트를 HTML로 렌더링
        const memberListWrapper = document.querySelector('.member-list-wrapper');
		let authority = '';
		let memberListLine = `
			<section>
				<article class="no-cell">No.</article>
				<article class="authority">회원구분</article>
				<article class="userId">아이디</article>
				<article class="userName">이름</article>
				<article class="userEmail">이메일</article>
				<article class="companyName">회사명</article>
				<article class="businessNumber">사업자등록번호</article>
				<article class="companyZipCode">우편번호</article>
				<article class="companyAddr_1">주소1</article>
				<article class="companyAddr_2">주소2</article>
				<article class="companyFAX">팩스</article>
				<article class="companyPhone">전화번호</article>
				<article class="userMobilePhone">핸드폰번호</article>
			</section>
		`;
        memberList.forEach((member, i) => {
			let memberAuthority = member.authority;
			if(memberAuthority === 'A'){
				authority = '관리자';
			}else if(memberAuthority === 'B'){
				authority = '회원';
			}else{
				authority = '미승인회원';
			}
			memberListLine += `
				<section>
					<article class="no-cell">${member.id}</article>
					<article class="authority authority-${memberAuthority}" data-userid="${member.userId}">${authority}</article>
					<article class="userId">${member.userId}</article>
					<article class="userName">${member.userName}</article>
					<article class="userEmail">${member.userEmail}</article>
					<article class="companyName">${member.companyName}</article>
					<article class="businessNumber">${member.businessNumber}</article>
					<article class="companyZipCode">${member.companyZipCode}</article>
					<article class="companyAddr_1">${member.companyAddr1}</article>
					<article class="companyAddr_2">${member.companyAddr2}</article>
					<article class="companyFAX">${member.companyFAX}</article>
					<article class="companyPhone">${member.companyPhone}</article>
					<article class="userMobilePhone">${member.userMobilePhone}</article>
				</section>
			`;
        });
        memberListWrapper.innerHTML = memberListLine;
		const authorityCls = document.querySelectorAll('.authority-C');
		authorityCls.forEach((line) => {
			line.parentNode.style.color = '#dc3545';
			const lineBtn = document.createElement('article');
			lineBtn.setAttribute('class', 'authority-btn');
			lineBtn.setAttribute('data-userid', line.dataset.userid);
			lineBtn.textContent ='회원승인';
			line.prepend(lineBtn);
			line.querySelector('.authority-btn').addEventListener('click', (btn)=>{
				updateAuthority(btn.currentTarget.dataset.userid);
			});
					});
    } catch (error) {
        console.error('Error fetching member list:', error);
    }
};

// 호출
fetchMemberList();


const updateAuthority = async (userId) => {
    const url = `/administrator/updateAuthority?userId=${userId}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text(); // 서버에서 반환된 텍스트 값
        console.log('Response:', result);

        // 결과 값 비교
        if (result === "successfully") {
			alert('정보가 변경 되었습니다.');
            location.href='/administrator/index';
        } else {
            console.log("Authority update failed.");
            // 실패 시 처리
        }
    } catch (error) {
        console.error('Error updating authority:', error);
    }
};
