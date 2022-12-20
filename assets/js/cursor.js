function cursor() {
	console.log("eeeeierpoiejirejerpoijerpoirejpoirj")
	var $cursor = document.querySelector(".cursor");
	var $follower = document.querySelector(".cursor-follow");
	var $hoverables = document.querySelectorAll(".hoverable");
	var $drags = document.querySelectorAll(".drag");

	for (let i = 0; i < $hoverables.length; i++) {
		$hoverables[i].addEventListener("mouseenter", onMouseHover);
		$hoverables[i].addEventListener("mouseleave", onMouseHoverOut);
		$hoverables[i].addEventListener("click", onMouseHoverOut);
	}

	for (let i = 0; i < $drags.length; i++) {
		$drags[i].addEventListener("mouseenter", onDragOn);
		$drags[i].addEventListener("mouseleave", onDragOff);

	}
	var posX = 0,
		posY = 0;

	var posX2 = 0,
		posY2 = 0;

	var mouseX = 0,
		mouseY = 0;
	


	TweenMax.to({}, 0.016, {
		repeat: -1,
		onRepeat: function () {
			posX += (mouseX - posX) / 7;
			posY += (mouseY - posY) / 7;
			posX2 += (mouseX - posX2) / 4;
			posY2 += (mouseY - posY2) / 4;
			TweenMax.set($follower, {
				css: {
					left: posX - 10,
					top: posY - 10,
				},
			});
			TweenMax.set($cursor, {
				css: {
					left: posX2,
					top: posY2,
				},
			});
		},
	});
	document.addEventListener("mousemove", function (e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});


	// Hover an element
	function onMouseHover() {
		TweenMax.to($follower, 0.3, {
			css: {
				backgroundColor: "#fff",
				scale: 4,
			},
		});
	}
	function onMouseHoverOut() {
		TweenMax.to($follower, 0.3, {
			scale: 1,
			css: {
				backgroundColor: "#f70154",
				scale: 1,
			},
		});
	}


	function onDragOn() {
		document.body.classList.add('drag')
	}

	function onDragOff() {
		document.body.classList.remove('drag')
	}


}




