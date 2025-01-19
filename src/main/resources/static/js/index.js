"use strict";
const rootURL = 'https://akgi.co.kr';
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
    let listTitle;
	let setBlockEle = '';
	let limited = 0;
	if(setMode === 'subCategory'){
		listTitle = document.querySelector('section.cate>section .main-block-title');
		setBlockEle = document.querySelector('section.cate .item-list');
	}else if(setMode === 'categoryRandom'){
		listTitle = document.querySelector('section.random>section>.main-block-title');
		setBlockEle = document.querySelector('section.random>.item-list');
		limited = 5;
	}else if(setMode === 'search'){
		listTitle = document.querySelector('header .navigation .search-title section:nth-of-type(2)');
		setBlockEle = document.querySelector('header .navigation .search-item-list');
	}else if(setMode === 'all'){
		listTitle = document.querySelector('section.main-layout-block-full.all > section > .main-block-title');
		setBlockEle = document.querySelector('section.all-items-list.item-list');
	}
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
			}else if(setMode === 'all'){
				listTitle.innerHTML = `<b>${name} 상품 (${data.length}개)</b>`;
			}else{
				listTitle.innerHTML = `<b>카테고리 : ${name} 상품 (${data.length}개)</b>`;
			}
			
			if(limited === 0)limited = data.length;
			setHTMLdata(data, setBlockEle, limited, setMode);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}

const createItemHTML = (item, setMode) => {
	
    let itemName = item.name.length > 14 ? item.name.substring(0, 13) + '...' : item.name;
    let code = item.code;
    let itemString = JSON.stringify(item).replace(/"/g, '&quot;');
	let servicePrice = item.servicePrice;
	let price = item.price;
	let setPrice = '';
	if(authority){
		if(authority.value === 'A' || authority.value === 'B'){
			setPrice = `<span style="color:var(--bs-gray-500);">${getCurrentMony(price)}</span> -> <b style="color:var(--bs-danger); font-size:1.1rem;">${getCurrentMony(servicePrice)}</b>`;
		}else{
			setPrice = `${getCurrentMony(price)}`;
		}
	}else{
		setPrice = `${getCurrentMony(price)}`;
	}
	if(setMode === 'all'){
		return `
			<section data-code="${code}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${item.name}">
				<section class="item-img" data-item="${itemString}" data-evt="img-detail">
					<img class="d-img rep-image" data-src="${rootURL}/images/1000/gransen_${item.code}.jpg">
					<section class="in-logo"><img src="/images/logo_02.png"></section>
				</section>
				<section class="item-info">
					<article>${itemName}</article>
					<article>${setPrice}</article>
				</section>
			</section>
		`;
	}else{
		return `
			<section data-code="${code}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${item.name}">
				<section class="item-img" data-item="${itemString}" data-evt="img-detail">
					<img src="${rootURL}/images/1000/gransen_${item.code}.jpg" class="d-img">
					<section class="in-logo"><img src="/images/logo_02.png"></section>
				</section>
				<section class="item-info">
					<article>${itemName}</article>
					<article>${setPrice}</article>
				</section>
			</section>
		`;
	}
}

const setHTMLdata = (data, ele, limited, setMode) => {//서브카테고리 상품진열
	const itemsToShow = data.slice(0, Math.min(data.length, limited));
	
	if(data.length > 0){
		ele.innerHTML = itemsToShow.map(item => createItemHTML(item, setMode)).join('');
		if(setMode === 'all'){
			const images = ele.querySelectorAll('.rep-image');
		    const lazyLoad = (entries, observer) => {
		        entries.forEach(entry => {
		            if (entry.isIntersecting) {
		                const img = entry.target;
		                img.src = img.dataset.src; // data-src 속성의 값을 src로 설정
		                img.classList.add('loaded'); // 로드 완료된 이미지에 클래스 추가
		                observer.unobserve(img); // 더 이상 관찰하지 않음
		            }
		        });
		    };
		    const observer = new IntersectionObserver(lazyLoad, {
		        root: null, // 뷰포트를 기준으로 관찰
		        rootMargin: "0px",
		        threshold: 0.5 // 10%만 보여도 로드 시작
		    });
		    images.forEach(image => {
		        observer.observe(image); // 모든 이미지 관찰 시작
		    });
		}
		
		const item = ele.querySelectorAll('.item-img');
		item.forEach((btns)=>{
			btns.addEventListener('click', (btn)=>{
				modal(btn.currentTarget);
			});
		});
		
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
			getCategoryItem(`/api/gallery/search/${kw.target.value}`, kw.target.value, 'search');
		}else{
			const searchTitle = searchWrapper.querySelector('.search-title section:nth-of-type(2)');
			const searchItemList = searchWrapper.querySelector('section.search-item-list');
			searchTitle.innerHTML = `<b>검색상품</b>`;
			searchItemList.innerHTML = `<article style="margin:30px auto;font-size:1.3rem;font-weight:700;color:#e42221;">검색어를 입력하세요</article>`;
		}
	});
	keyword.addEventListener('focus', (kw)=>{
		searchWrapper.classList.add('searchWrapper-action');
		document.body.style.overflow = 'hidden'
	});
	
	const closeBtn = searchWrapper.querySelector('i.fa-solid.fa-xmark.fa-beat');
	closeBtn.addEventListener('click', (kw)=>{
		searchWrapper.classList.remove('searchWrapper-action');
		document.body.style.overflow = 'scroll';
		keyword.value = '';
	});
	
/*	keyword.addEventListener('blur', (kw)=>{
		searchWrapper.classList.remove('searchWrapper-action');
		keyword.value = '';
	});*/
}

getSearchItems();

const getAllItems = () =>{
	getCategoryItem('/api/gallery', '전체', 'all');
}

getAllItems();

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


