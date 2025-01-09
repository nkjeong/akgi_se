// eslint-disable-next-line

function createTripleSlider(el) {
  // main swiper el
  const swiperEl = el.querySelector('.swiper');

  // create prev duplicate swiper
  const swiperPrevEl = swiperEl.cloneNode(true);
  swiperPrevEl.classList.add('triple-slider-prev');
  el.insertBefore(swiperPrevEl, swiperEl);
  const swiperPrevSlides = swiperPrevEl.querySelectorAll('.swiper-slide');
  const swiperPrevLastSlideEl = swiperPrevSlides[swiperPrevSlides.length - 1];
  swiperPrevEl
    .querySelector('.swiper-wrapper')
    .insertBefore(swiperPrevLastSlideEl, swiperPrevSlides[0]);

  // create next duplicate swiper
  const swiperNextEl = swiperEl.cloneNode(true);
  swiperNextEl.classList.add('triple-slider-next');
  el.appendChild(swiperNextEl);
  const swiperNextSlides = swiperNextEl.querySelectorAll('.swiper-slide');
  const swiperNextFirstSlideEl = swiperNextSlides[0];
  swiperNextEl
    .querySelector('.swiper-wrapper')
    .appendChild(swiperNextFirstSlideEl);

  // Add "main" class
  swiperEl.classList.add('triple-slider-main');

  // common params for all swipers
  const commonParams = {
    
    speed: 600,
    loop: true,
    parallax: true,
	autoplay: {
	      delay: 3000, // 자동 슬라이드 전환 시간 (ms)
	      disableOnInteraction: false, // 사용자 상호작용 이후에도 autoplay 유지
	    },
  };

  let tripleMainSwiper;

  // init prev swiper
  const triplePrevSwiper = new Swiper(swiperPrevEl, {
    ...commonParams,
    allowTouchMove: false,
	autoplay: false,
    on: {
      click() {
        tripleMainSwiper.slidePrev();
      },
    },
  });
  // init next swiper
  const tripleNextSwiper = new Swiper(swiperNextEl, {
    ...commonParams,
    allowTouchMove: false,
	autoplay: false,
    on: {
      click() {
        tripleMainSwiper.slideNext();
      },
    },
  });
  // init main swiper
  tripleMainSwiper = new Swiper(swiperEl, {
    ...commonParams,
    grabCursor: true,
    controller: {
      control: [triplePrevSwiper, tripleNextSwiper],
    },
    on: {
      destroy() {
        // destroy side swipers on main swiper destroy
        triplePrevSwiper.destroy();
        tripleNextSwiper.destroy();
      },
    },
  });

  // Mouse enter and leave events to stop/start autoplay
  swiperEl.addEventListener('mouseenter', () => {
    tripleMainSwiper.autoplay.stop(); // 마우스를 올리면 autoplay 중지
  });
  swiperEl.addEventListener('mouseleave', () => {
    tripleMainSwiper.autoplay.start(); // 마우스를 내리면 autoplay 시작
  });
  
  return tripleMainSwiper;
}
