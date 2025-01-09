"use strict";
const itemsMoreBtn = document.querySelectorAll('.fa-arrow-up-right-from-square');
itemsMoreBtn.forEach(btns => {
	btns.addEventListener('click', (btn)=>{
		const mode = btn.currentTarget.dataset.mode;
		const code = btn.currentTarget.dataset.code;
		openMoreBack(mode, code);
	});
});
const openMoreBack = async (mode, code) => {
	document.body.style.overflowY = 'hidden';
	document.body.style.paddingRight = '8px';
	const moreBack = document.createElement('section');
	moreBack.classList.remove('fadeOut');
    moreBack.classList.add('moreBack', 'fadeIn');
	let setTitle;
	let url = '';
	if(mode == 'category'){
		setTitle = 'Category Items';
		url = `/api/gallery/category/${code}`;
	}else{
		setTitle = 'All Items';
		url = '/api/gallery';
	}
	moreBack.innerHTML = `
		<section>
			<article></article>
			<article>${setTitle}</article>
			<article class="moreBackCloseBtn"><i class="fa-solid fa-rectangle-xmark"></i></article>
		</section>
		<section class="mainBody">
			<section>
			  <div class="swiper mySwiper">
			    <div class="swiper-wrapper">

			    </div>
			    <div class="swiper-pagination"></div>
			  </div>
			</section>
		</section>
	`;
	document.body.appendChild(moreBack);
	
	await getMoreItems(url, moreBack);
	
	const moreBackCloseBtn = moreBack.querySelector('.moreBackCloseBtn');
	const mySwiper = moreBack.querySelector('.mySwiper');
	
	var swiper = new Swiper(mySwiper, {
		pagination : {
			el : ".swiper-pagination",
			dynamicBullets : true,
		},
	});
	
	moreBackCloseBtn.addEventListener('click', btn => {
		moreBack.classList.remove('fadeIn');
    	moreBack.classList.add('fadeOut');
	});
	moreBack.addEventListener('animationend', (event) => {
	    if(event.animationName === 'fadeIn') {
	        moreBack.classList.remove('fadeIn');
	    } else if(event.animationName === 'fadeOut') {
	        document.body.removeChild(moreBack);
	        document.body.removeAttribute('style');
	    }
	});
}

const getMoreItems = async (url, moreBack) => {
	try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const total = data.length;
        const pagePItem = 20;
        const page = Math.ceil(total / pagePItem);
        
        const swiperWrapper = moreBack.querySelector('.swiper-wrapper');
        let html = '';
        for(let i = 0 ; i < page ; i++){
			html += `<div class="swiper-slide">`;
			for(let j = i*pagePItem ; j < (i+1)*pagePItem ; j++){
				if(j > total-1)break;
				html += `
					<article class="item">yy</article>
				`;
			}
			html += `</div>`;
		}
		swiperWrapper.innerHTML = html;
        
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}