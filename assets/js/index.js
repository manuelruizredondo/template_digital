import LocomotiveScroll from "locomotive-scroll";
import barba from '@barba/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from 'swiper';



//helpers
function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}




//init zone
gsap.registerPlugin(ScrollTrigger);

let scroll;


function initPage(){
	initSwiper();
	cursor();
	contentAnimation();
}



function cursor() {
	console.log("eeeeierpoiejirejerpoijerpoirejpoirj");
	var cursor = document.querySelector(".cursor");
	var follower = document.querySelector(".cursor-follow");
	var hoverables = document.querySelectorAll(".hoverable");
	var drags = document.querySelectorAll(".drag");
	for (let i = 0; i < hoverables.length; i++) {
		hoverables[i].addEventListener("mouseenter", onMouseHover);
		hoverables[i].addEventListener("mouseleave", onMouseHoverOut);
		hoverables[i].addEventListener("click", onMouseHoverOut);
	}
	for (let i = 0; i < drags.length; i++) {
		drags[i].addEventListener("mouseenter", onDragOn);
		drags[i].addEventListener("mouseleave", onDragOff);
	}
	var posX = 0,
		posY = 0;
	var posX2 = 0,
		posY2 = 0;
	var mouseX = 0,
		mouseY = 0;
		gsap.to({}, { duration: 0.016, repeat: -1, onRepeat: () => {
			posX += (mouseX - posX) / 7;
			posY += (mouseY - posY) / 7;
			posX2 += (mouseX - posX2) / 4;
			posY2 += (mouseY - posY2) / 4;
			gsap.set(follower, { css: { left: posX - 10, top: posY - 10 } });
			gsap.set(cursor, { css: { left: posX2, top: posY2 } });
		  } });



	document.addEventListener("mousemove", function (e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	// Hover an element
function onMouseHover() {
	gsap.to(follower, { duration: 0.3, css: { backgroundColor: "#fff", scale: 4 } });
  }
  function onMouseHoverOut() {
	gsap.to(follower, { duration: 0.3, css: { backgroundColor: "#f70154", scale: 1 } });
  }

	function onDragOn() {
		document.body.classList.add('drag')
	}

	function onDragOff() {
		document.body.classList.remove('drag')
	}




}





// This code creates a ScrollTrigger scrollerProxy that can be used to manipulate the scroll position of the element with the data-scroll-container attribute. It provides two functions, scrollTop() and getBoundingClientRect(). The scrollTop() function allows you to set or get the scroll position of the element. The getBoundingClientRect() function returns the size and position of the element. Finally, the pinType property is set to either "transform" or "fixed" depending on if the element has a transform style attribute.

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

	changeBackgroundColorOnScrollEnter();

	scroll.on("scroll", ScrollTrigger.update);

	ScrollTrigger.addEventListener("refresh", () => scroll.update());
	ScrollTrigger.refresh();
}


//The function uses the GSAP library to change the background color of an element with the class container-color to a color specified by the obj.id property.
function changeBackgroundColorOnScrollEnter() {
	setTimeout(function() {
		scroll.on("call", (value, way, obj) => {
			if (way === "enter") {
			
				switch (value) {
					case "pageColor":
						// get color code from data-scroll-id  assigned to body by obj.id
						gsap.to(".container-color", { backgroundColor: obj.id });
						break;
				}
			}
		});

	}, 100); // delay in milliseconds (100 = 0,1 seconds)
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

//This function can be used to create a loading screen effect, where the loading screen element slides in from the left, stays visible for a moment, and then slides out to the right. The use of the Expo.easeInOut easing function and the delays between the animations help to create a smooth and natural-looking transition.


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
	cursor();
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
