import LocomotiveScroll from "locomotive-scroll";
import barba from '@barba/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Swiper from 'swiper';

gsap.registerPlugin(ScrollTrigger);

let scroll;


function initPage(){
	initSwiper();
	contentAnimation();
}

function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}


ScrollTrigger.scrollerProxy("[data-scroll-container]", {
	scrollTop(value) {
		return arguments.length
			? locoScroll.scrollTo(value, 0, 0)
			: locoScroll.scroll.instance.scroll.y;
	},
	getBoundingClientRect() {
		return {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight,
		};
	},
	pinType: document.querySelector("[data-scroll-container]").style.transform
		? "transform"
		: "fixed",
});


function locoSlider() {


	scroll = new LocomotiveScroll({
		el: document.querySelector("[data-scroll-container]"),
		smooth: true,
		getDirection: true,
		repeat: true,
		direction: "vertical",
		smartphone: {
			smooth: true,
		},
		tablet: {
			smooth: true,
		},

	});
	console.log("locoslider");


	scroll.on("scroll", function (t) {
		document.documentElement.setAttribute("data-direction", t.direction);
	});

	setTimeout(() => {
	
		scroll.on("call", (value, way, obj) => {

			console.log("valor"+value);
			console.log("way"+way);
			console.log("obj"+obj);

			if (way === "enter") {
			
				switch (value) {
					case "pageColor":
						// get color code from data-scroll-id  assigned to body by obj.id
						gsap.to(".container-color", { backgroundColor: obj.id });
						break;
				}
			}
		});
	}, 100);

	scroll.on("scroll", ScrollTrigger.update);

	ScrollTrigger.addEventListener("refresh", () => scroll.update());
	ScrollTrigger.refresh();
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






//barba

barba.hooks.after(() => {
	locoSlider();
});
barba.hooks.enter(() => {
	window.scrollTo(0, 0);
});
barba.init({
	//debug: true,
	sync: true,
	transitions: [
		{
			async once(data) {
				initPage();
				locoSlider();
		
			},
			async leave(data) {
				const done = this.async();
				pageTransition();
				await delay(1000);
				done();
			},
			async enter(data) {
				initPage();
				locoSlider();
		
			},
			async beforeEnter(data) {
				scroll.destroy();
				locoSlider();
	
			},
		},
	],
});
