"use strict";
const fetchJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
};

const setCategory = (categories) => {
    const mainNavigationElement = document.querySelector('section.mainNav ul');
    const categoryNumbers = categories.map(category => ({
        "code": category.code, 
        "name": category.name
    }));
    setCategoryNumber(categoryNumbers);//카테고리 상품 진열
    const html = categories.map(category => `
        <li>
            <article>${category.name}</article>
            <article class="subMenu" data-code="${category.code}">
                <ul></ul>
            </article>
        </li>
    `).join('');
    mainNavigationElement.innerHTML = html;
    setSubMenus(mainNavigationElement);
};

const setSubMenus = (element) => {
    const subMenuElements = element.querySelectorAll('article.subMenu');
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
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.querySelector('.categoryBtn').addEventListener('click', function() {
    const mainNav = document.querySelector('.mainNav');
    mainNav.classList.toggle('open');
});
