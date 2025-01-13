"use strict";
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
    //setCategoryNumber(categoryNumbers);//카테고리 상품 진열
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


/*function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.querySelector('.categoryBtn').addEventListener('click', function() {
    const mainNav = document.querySelector('.mainNav');
    mainNav.classList.toggle('open');
});*/


const getCategoryItem = async (url, name, setMode) => {
    let listTitle;
	let setBlockEle = '';
	if(setMode === 'subCategory'){
		listTitle = document.querySelector('.main-block-title');
		setBlockEle = document.querySelector('.item-list');
	}
    try {
		if(listTitle){
	        const response = await fetch(url);
	        if (!response.ok) {
	            throw new Error('Network response was not ok');
	        }
	        const data = await response.json();
			listTitle.innerHTML = `중 <b>${name} 카테고리 상품 (${data.length}개)</b>`;
			
			setHTMLdata(data, setBlockEle);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}


const setHTMLdata = (data, ele) => {
	let setHTML = '';
	data.forEach((d) => {
		let reName = d.name.length > 14 ? d.name.substring(0, 13)+'...' : d.name;
		let itemString = JSON.stringify(d).replace(/"/g, '&quot;');
		setHTML += `
		<section>
			<section class="item-img" data-item="${itemString}">
				<img src="http://akgi.co.kr/images/1000/gransen_${d.code}.jpg" class="d-img">
				<section class="in-logo"><img src="/images/logo_02.png"></section>
			</section>
			<section class="item-info">
				<article>${reName}</article>
				<article>${getCurrentMony(d.price)}</article>
			</section>
		</section>
		`;
	});
	ele.innerHTML = setHTML;
	
	VanillaTilt.init(ele.querySelectorAll(".item-img"), {
	    max: 25,
	    speed: 400,
	    glare: true,
	    "max-glare":1,
	});
}