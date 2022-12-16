import LocomotiveScroll from "locomotive-scroll";
gsap.registerPlugin(ScrollTrigger);

let scroll;

const pageContainer = document.querySelector(".container-color");


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

function changeColor() {

	gsap.registerPlugin(ScrollTrigger);
	scroll.on("scroll", ScrollTrigger.update);

	const pageContainer = document.querySelector(".container-color");


	console.log("estoy dentro");

	
		scroll.on("scroll", function (t) {
			document.documentElement.setAttribute("data-direction", t.direction);
		});

		
	

		
		ScrollTrigger.scrollerProxy(pageContainer, {
			scrollTop(value) {
				return arguments.length
					? scroll.scrollTo(value, 0, 0)
					: scroll.scroll.instance.scroll.y;
			},
			getBoundingClientRect() {
				return {
					left: 0,
					top: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
		});
	
		const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
		scrollColorElems.forEach((colorSection, i) => {
			const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
			const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;
			ScrollTrigger.create({
				trigger: colorSection,
				scroller: "[data-scroll-container]",
				start: "top 50%",
				onEnter: () =>
					gsap.to("body", {
						backgroundColor: colorSection.dataset.bgcolor,
						color: colorSection.dataset.textcolor,
						overwrite: "auto",
					}),
				onLeaveBack: () =>
					gsap.to("body", {
						backgroundColor: prevBg,
						color: prevText,
						overwrite: "auto",
					}),
			});
		});
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
				changeColor();
				
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
				changeColor()
				initSwiper();
			},
			async beforeEnter(data) {
				scroll.destroy();
				locoSlider();
				changeColor()
			},
		},
	],
});


