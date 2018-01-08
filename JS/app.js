(function(){

	let slider = new Slider({
		el:document.querySelector("#slider"),
		slides:[
			{ link:"#1", image: "./img/C1.jpg" },
			{ link:"#2", image: "./img/C2.jpg" },
			{ link:"#3", image: "./img/C3.jpg" },
			{ link:"#4", image: "./img/C4.jpg" },
			{ link:"#5", image: "./img/C5.jpg" }

		]
	})

	window.slider = slider

})()