(function(){
//
	fetch('http://localhost:3000')
		.then(res => res.json())
		.then(render)

	fetch('http://localhost:3000/toplist')
		.then(res => res.json())
		.then(json => json.data.topList)
		.then(renderTopList)

		function render(json){
			renderSlider(json.data.slider)
			renderRadios(json.data.radioList)
			renderPlaylists(json.data.songList)
			lazyload(document.querySelectorAll('.lazyload'))
		}

		let search = new Search(document.querySelector('.search-view'))
	
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

		function renderTopList(list){
			document.querySelector('.rank-view .toolist').innerHTML = list.map(item => 
			`<li class="top-item">
				<div class="top-item-media">
					<a href="#">
						<img class="lazyload" data-src="${item.picUrl}" alt="">
					</a>
				</div>
				<div class="top-item-info">
					<h3 class="top-list-title ellipsis">${item.topTitle}</h3>
					<ul class="top-item-list ">
						${songlist(item.songList)}
						<i class="topic_arrow"> >  </i>
					</ul>
				</div>
			</li>`).join("")

			lazyload(document.querySelectorAll('.rank-view .toolist .lazyload'))

			function songlist(songs){
				return songs.map((song,i) => 
				`<li class="top-item-song ellipsis">
					<i class="song-index ">${i+1}</i>
					<p class="ellipsis"><span class="song-name">${song.songname}</span>-${song.singername}</p>
				</li>`).join("")
			}
		}


})()