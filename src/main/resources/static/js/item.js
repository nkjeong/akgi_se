"use strict";
const sessionUserId = document.querySelector('.sessionUserId');
//카테고리 상품 가져오기
const getCategoryItem = async (url, name, setMode) => {
    let listTitle;
    if(setMode == 'category'){
		listTitle = document.querySelector('.listCategory .listTitle span.itemSize');
	}else if(setMode == 'all'){
		listTitle = document.querySelector('.listAll .listTitle span.itemSize');
	}else if(setMode == 'subCategory'){
		listTitle = document.querySelector('.listSearch .listTitle span.itemSize');
	}else{
		const urlPath = url.split('/');
		const keyword = ' <span style="color:#e42221;">{' + urlPath[urlPath.length-1] + '}</span>';
		name += keyword;
		listTitle = document.querySelector('.listSearch .listTitle span.itemSize');
	}
    try {
		if(listTitle){
	        const response = await fetch(url);
	        if (!response.ok) {
	            throw new Error('Network response was not ok');
	        }
	        const data = await response.json();
			listTitle.innerHTML = `<b>${name}(${data.length}개)</b>`;
			if(setMode == 'category'){
				itemsMoreBtn.forEach((i)=>{
					if(i.dataset.mode == 'category'){
						const urlPath = url.split('/');
						i.dataset.code = urlPath[urlPath.length-1];
					}
				});
			}
			
	        setList(data, setMode);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}

const createItemHTML = (item) => {
    let itemName = item.name.length > 10 ? item.name.substring(0, 11) + '...' : item.name;
    let code = item.code;
    let itemString = JSON.stringify(item).replace(/"/g, '&quot;');
    return `
        <section class="item" data-item="${itemString}" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <article data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${item.name}"><img src="/images/1000/gransen_${code}.jpg"></article>
            <article>${itemName}</article>
            <article>${getCurrentMony(item.price)}</article>
        </section>
    `;
}

const setList = (data, setMode) => {
	let listEle;
	let limited;
	if(setMode == 'category'){
		listEle = document.querySelector('.listCategory .itemList');
		limited = 6;
	}else if(setMode == 'all'){
		listEle = document.querySelector('.listAll .itemList');
		limited = 24;
	}else{
		const searchHiddenSection = document.querySelector('section.mainDivider.searchHiddenSection');
		searchHiddenSection.style.display = 'flex';
		listEle = document.querySelector('.listSearch .itemList');
		limited = data.length;
	}
    const itemsToShow = data.slice(0, Math.min(data.length, limited));
    if(data.length > 0){
		listEle.innerHTML = itemsToShow.map(createItemHTML).join('');
	}else{
		listEle.innerHTML = '<article style="margin:30px auto; font-size:1.3rem; font-weight:700; color:#e42221;">검색된 상품이 없습니다.</article>';
	}
    
    
	const tooltipTriggerList = listEle.querySelectorAll('[data-bs-toggle="tooltip"]');
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    const item = listEle.querySelectorAll('section.item');
    item.forEach(btns=>{
		btns.addEventListener('click', btn => {
			itemDetailView(btn.currentTarget, data);
		});
	});
}

const setCategoryNumber = (categoryNumbers) => {
    const number = getRandomNumber(1, categoryNumbers.length);
    const { code, name } = categoryNumbers[number - 1];
    getCategoryItem(`/api/gallery/category/${code}`, name, 'category');
}

const retrieveItemData = (ele) => {
    let itemString = ele.dataset.item.replace(/&quot;/g, '"');
    let item = JSON.parse(itemString);
    return item;
}

const getDetailImg = async (directoryPath, fileName) => {
	try {
        const response = await fetch(`/api/files/search?directoryPath=${encodeURIComponent(directoryPath)}&filename=${fileName}`);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching the file list:', error);
    }
}

const itemDetailView = (ele) => {
    const { price, servicePrice, origin, itemNumber, size, name: itemName, code } = retrieveItemData(ele);
    
    const offcanvas = document.querySelector('div.offcanvas.offcanvas-start');
    const offcanvasBody = offcanvas.querySelector('.offcanvas-body');
    const offcanvasFirstDiv = offcanvasBody.querySelector('div:first-child');
    const offcanvasLastDiv = offcanvasBody.querySelector('div:last-child');
    
    const offcanvasExampleLabel = offcanvas.querySelector('#offcanvasExampleLabel');
    const representativeImage = offcanvasFirstDiv.querySelector('section:first-child');
    const itemInfomation = offcanvasFirstDiv.querySelector('section:last-child');
    const itemNameSection = offcanvasLastDiv.querySelector('section:first-child');
    const itemDetailSection = offcanvasLastDiv.querySelector('section:last-child img');


    offcanvasExampleLabel.innerText = `${itemName} ${itemNumber}`;
    
    representativeImage.innerHTML = `<img src="/images/1000/gransen_${code}.jpg">`;
    
    const createInfoSection = (title, value) => {
		
		if(sessionUserId === null && title === '공급가'){
			value = 'You can view it after logging in.';
		}
		
		return `
	        <section>
	            <article>${title} :</article>
	            <article>${value}</article>
	        </section>
    	`;
    }

    itemInfomation.innerHTML = `
        ${createInfoSection('정상가', getCurrentMony(price))}
        ${createInfoSection('공급가', getCurrentMony(servicePrice))}
        ${createInfoSection('원산지', origin)}
        ${createInfoSection('모델명', itemNumber)}
        ${createInfoSection('사이즈', size)}
        ${createInfoSection('쇼핑몰', '')}
        ${createInfoSection('옵 션', '')}
        ${createInfoSection('코 드', code)}
    `;
    getDetailImg('/web/akgiwebapp/src/main/resources/static/images/detail', `gransen_${code}.jpg`).then(data => {
    //getDetailImg('j:/akgi/git/akgi/web/src/main/resources/static/images/detail', `gransen_${code}.jpg`).then(data => {
	//getDetailImg('E:/gitakgi/akgi/web/src/main/resources/static/images/detail', `gransen_${code}.jpg`).then(data => {
	//getDetailImg('H:/0_akgi/github/akgi/web/src/main/resources/static/images/detail', `gransen_${code}.jpg`).then(data => {
	    itemNameSection.innerHTML = `<section>Detail View [${itemName}]</section>`;
	    itemDetailSection.setAttribute('src', '/images/detail/'+data);
	});
}

//전체상품 가져오기
getCategoryItem('/api/gallery', '전체', 'all');

//검색상품 가져오기
const getSearchItems = () => {
	const keyword = document.querySelector('section.searchFormWrapper form.searchForm input.keyword');
	keyword.addEventListener('keyup', (kw)=>{
		if(kw.target.value.length > 0){
			getCategoryItem(`/api/gallery/search/${kw.target.value}`, '검색상품', 'search');
		}else{
			
		}
	});
}

if(window.location.pathname === '/') {
	getSearchItems();
}