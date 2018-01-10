class Slider {
	constructor(options = {}){
		this.$el = options.el
		this.slides = options.slides
		this.interval = options.interval || 3000
		this.index = 0
		this.render()
		this.start()
		
	}

	render(){
		this.$el.innerHTML = 
		`
			<ul class="img-ct">
			</ul>
		`
		this.$wrap = this.$el.firstElementChild
		this.length = this.$el.firstElementChild.children.length
		this.$wrap.style.width = `${this.slides.length * 100}%`
		this.$wrap.innerHTML = this.slides.map(slide =>
			`<li class="qq-slider-item">
				<a href="${slide.link}">
					<img src="${slide.image}">
			 	</a>
			 </li>`
		).join('')

	// 	this.$el.innerHTML += 
	// 	`<ul class="link"> 
	// 		${this.length * <li></li> } 
	// 	</ul>`
	// 	
	}

	start(){
		setInterval(this.next.bind(this),this.interval)

		// setInterval(()=>{
		// 	this.next()
		// },this.interval)
	}

	next(){
		this.index += 1
		if(this.index === this.slides.length){
			this.$wrap.style.transform = `translate(0)`
			this.index = 0
			return 
		}
		let x = `-${this.index * 100 / this.slides.length}%`
		this.$wrap.style.transform = `translate(${x})`
	}
}

