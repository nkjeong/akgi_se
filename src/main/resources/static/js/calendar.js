"use strict";

const setGransenInfo = async (url, cls) => {
	const getEle = document.querySelector('.'+cls);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        let html;
        if(cls == 'setTodate'){
			html = `
	        	${data.year}년 ${data.month}월 ${data.date}일 ${data.toDay}
	        `;
		}else{
			html = `
				총 상품 수 ${data}개
			`
		}
        getEle.innerHTML = html;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}
if(window.location.pathname === '/') {
	setGransenInfo('/calendar', 'setTodate');
	setGransenInfo('/api/gallery/count', 'setItemLength');
}