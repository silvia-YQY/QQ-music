(function(){

	fetch('/json/rec.json')
		.then(res => res.json())
		.then(render)

		function render(json){
			renderSlider(json.data.slider)
			renderRadios(json.data.radioList)
			renderPlaylists(json.data.songList)
			lazyload(document.querySelectorAll('.lazyload'))
		}
	
		function renderSlider(slides){
			slides = slides.map(slide => {
				return {
					link:slide.linkUrl,
					image:slide.picUrl }
			})
	
			new Slider({
				el:document.querySelector("#slider"),
				slides:slides
			})
		}
	
		function renderRadios(radios){
			document.querySelector('.radios .list').innerHTML = radios.map(radio =>
				`<div class="list-item">
					<div class="list-media">
						<img class="lazyload" data-src="${radio.picUrl}" alt="">
						<span class="icon icon-play" ></span>
					</div>
					<div class="list-title">
						${radio.Ftitle}
					</div>
				</div>`).join(" ")
		}

		function renderPlaylists(playlists){
			document.querySelector('.playlists .list').innerHTML = playlists.map(list =>
				`<div class="list-item">
					<div class="list-media">
						<img class="lazyload" data-src="${list.picUrl}" alt="">
						<span class="icon icon-play" ></span>
					</div>
					<div class="list-title">
						${list.songListDesc}
					</div>
				</div>`).join(" ")

		}


})()