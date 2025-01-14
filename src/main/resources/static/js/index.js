"use strict";
const rootURL = 'http://akgi.co.kr';
const fetchJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
};

const setCategory = (categories) => {
    const mainNavigationElement = document.querySelector('section.navigation ul');
    const categoryNumbers = categories.map(category => ({
        "code": category.code, 
        "name": category.name
    }));
    setCategoryNumber(categoryNumbers);//카테고리 상품 진열
    const html = categories.map(category => `
        <li>
            <article>${category.name}</article>
            <article class="sub-menu" data-code="${category.code}">
                <ul></ul>
            </article>
        </li>
    `).join('');
    mainNavigationElement.innerHTML = html;
    setSubMenus(mainNavigationElement);
};

const setSubMenus = (element) => {
    const subMenuElements = element.querySelectorAll('article.sub-menu');
    subMenuElements.forEach(subMenuElement => {
        updateSubMenu(subMenuElement.dataset.code, subMenuElement);
    });
};

const updateSubMenu = async (categoryCode, subMenuElement) => {
    const categories = await fetchJSON(`/categoryone/category/${categoryCode}`);
    const ulElement = subMenuElement.querySelector('ul');
    ulElement.innerHTML = categories.map(category => `<li data-code="${categoryCode}" data-subcode="${category.code}">${category.name}</li>`).join('');
    if (categories.length === 0) {
        ulElement.parentNode.style.display = 'none';
    }
    
    const getSubmenus = ulElement.querySelectorAll('li');
    getSubmenus.forEach((btns)=>{
		btns.addEventListener('click', (btn)=>{
			getSubItems(btn.target);
			location.href='#categoryItemList';
		});
	});
}

const getSubItems = (ele) => {
	const firstCategoryName = ele.parentNode.parentNode.parentNode.querySelector('article:first-child').textContent;
	const code = ele.dataset.code+ele.dataset.subcode;
	const menuName = '<span style="color:#e42221;">'+firstCategoryName + ' -> ' + ele.textContent+'</span>';
	getCategoryItem(`/api/gallery/category/exact/${code}`, menuName, 'subCategory');
}

(async () => {
    try {
        const categories = await fetchJSON('/categories');
        setCategory(categories);
    } catch (error) {
        console.error('Fetch error:', error);
    }
})();


const setCategoryNumber = (categoryNumbers) => {
    const number = getRandomNumber(1, categoryNumbers.length);
	console.log(number)
    const { code, name } = categoryNumbers[number - 1];
    getCategoryItem(`/api/gallery/category/${code}`, name, 'categoryRandom');
}

function getRandomNumber(min, max) { //카테고리 코드 랜덤 얻기
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
document.querySelector('.categoryBtn').addEventListener('click', function() {
    const mainNav = document.querySelector('.mainNav');
    mainNav.classList.toggle('open');
});*/


const getCategoryItem = async (url, name, setMode) => {
	
	console.log(url)
	
    let listTitle;
	let setBlockEle = '';
	let limited = 0;
	if(setMode === 'subCategory'){
		listTitle = document.querySelector('section.cate>section>.main-block-title');
		setBlockEle = document.querySelector('section.cate>.item-list');
	}else if(setMode === 'categoryRandom'){
		listTitle = document.querySelector('section.random>section>.main-block-title');
		setBlockEle = document.querySelector('section.random>.item-list');
		limited = 5;
	}else if(setMode === 'search'){
		listTitle = document.querySelector('header .navigation .search-title');
		setBlockEle = document.querySelector('header .navigation .search-item-list');
	}
	
	console.log(setBlockEle)
    try {
		if(listTitle){
			
	        const response = await fetch(url);
	        if (!response.ok) {
	            throw new Error('Network response was not ok');
	        }
	        const data = await response.json();
			if(setMode === 'search'){
				listTitle.innerHTML = `<b>검색상품 : ${name}</b>`;
				let size = documentSize();
				setBlockEle.style.height = `${size.height-200}px`;
			}else{
				listTitle.innerHTML = `<b>${name} 카테고리 상품 (${data.length}개)</b>`;
			}
			
			if(limited === 0)limited = data.length;
			setHTMLdata(data, setBlockEle, limited);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}

const createItemHTML = (item) => {
    let itemName = item.name.length > 14 ? item.name.substring(0, 13) + '...' : item.name;
    let code = item.code;
    let itemString = JSON.stringify(item).replace(/"/g, '&quot;');
    return `
		<section data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${item.name}">
			<section class="item-img" data-item="${itemString}">
				<img src="${rootURL}/images/1000/gransen_${item.code}.jpg" class="d-img">
				<section class="in-logo"><img src="/images/logo_02.png"></section>
			</section>
			<section class="item-info">
				<article>${itemName}</article>
				<article>${getCurrentMony(item.price)}</article>
			</section>
		</section>
    `;
}

const setHTMLdata = (data, ele, limited) => {//서브카테고리 상품진열
	const itemsToShow = data.slice(0, Math.min(data.length, limited));
	
	if(data.length > 0){
		ele.innerHTML = itemsToShow.map(createItemHTML).join('');
	}else{
		ele.innerHTML = '<article style="margin:30px auto; font-size:1.3rem; font-weight:700; color:#e42221;">검색된 상품이 없습니다.</article>';
	}
	
	const tooltipTriggerList = ele.querySelectorAll('[data-bs-toggle="tooltip"]');
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
	vanillaTiltEle(ele, ".item-img");
}

const setLineItems = async ()=>{
	const lineItems = document.querySelector('.line-items');
	let setHTML = ''
	const directoryPath = 'C:/Users/abidan/git/repository/web/src/main/resources/static/images/banner/line_items';
	try {
        const response = await fetch(`/api/files/list?directoryPath=${encodeURIComponent(directoryPath)}`);
        const data = await response.json();
        data.forEach((d, i)=>{
			setHTML += `
				<article class="line-banner"><img src="/images/banner/line_items/${d}"></article>
				<article class="line-banner-dot">•</article>
			`;
		});
		lineItems.innerHTML = setHTML;
		vanillaTiltEle(lineItems, ".line-banner");
    } catch (error) {
        console.error('Error fetching the file list:', error);
    }
}

setLineItems();

const getSearchItems = () => {
	const keyword = document.querySelector('header .header form.searchForm input.search');
	const searchWrapper = document.querySelector('header .searchWrapper');
	keyword.addEventListener('keyup', (kw)=>{
		if(kw.target.value.length > 0){
			console.log(kw.target.value)
			getCategoryItem(`/api/gallery/search/${kw.target.value}`, kw.target.value, 'search');
		}else{
			
		}
	});
	keyword.addEventListener('focus', (kw)=>{
		searchWrapper.classList.add('searchWrapper-action');
		document.body.style.overflow = 'hidden'
	});
/*	keyword.addEventListener('blur', (kw)=>{
		searchWrapper.classList.remove('searchWrapper-action');
		keyword.value = '';
	});*/
}

getSearchItems();

const vanillaTiltEle = (ele, cls) => {
	VanillaTilt.init(ele.querySelectorAll(cls), {
	    max: 25,
	    speed: 400,
		perspective: 1000,
	    glare: true,
	    "max-glare":1,
	});
}

const documentSize = () => {
	let size = document.body.getBoundingClientRect();
	return size;
}