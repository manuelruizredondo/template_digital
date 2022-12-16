import LocomotiveScroll from "locomotive-scroll";
import barba from '@babel/core';


let scroll;

function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}

function locoSlider() {
	scroll = new LocomotiveScroll({
		el: document.querySelector("[data-scroll-container]"),
		smooth: true
	});
	console.log("locoss");
}

function initSwiper() {
	var swiper = new Swiper(".mySwiper", {
		slidesPerView: 3,
		spaceBetween: 30,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});
}

function pageTransition() {
	var tl = gsap.timeline();
	tl.to(".loading-screen", {
		duration: 1.2,
		width: "100%",
		left: "0%",
		ease: "Expo.easeInOut",
	});

	tl.to(".loading-screen", {
		duration: 1,
		width: "100%",
		left: "100%",
		ease: "Expo.easeInOut",
		delay: 0.3,
	});
	tl.set(".loading-screen", { left: "-100%" });
}

function contentAnimation() {
	var tl = gsap.timeline();
	tl.from("h1", {
		duration: 1,
		y: 30,
		opacity: 0,
		stagger: 0.4,
		delay: 0.2,
	});
}



barba.hooks.after(() => {
	locoSlider();
});

barba.hooks.enter(() => {
	window.scrollTo(0, 0);
});

barba.init({
	debug: true,
	sync: true,
	transitions: [
		{
			async once(data) {
				contentAnimation();
				initSwiper();
				locoSlider();
			},
			async leave(data) {
				const done = this.async();
				pageTransition();
				await delay(1000);
				done();
			},
			async enter(data) {
				contentAnimation();
				locoSlider();
				initSwiper();
			},
			async beforeEnter(data) {
				scroll.destroy();
				locoSlider();
			},
		},
	],
});

