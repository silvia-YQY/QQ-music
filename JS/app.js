import {Search} from './search.js'
import {MusicPlayer} from './player.js'
import {TopList} from './topList.js'
import { Recommend } from './recommend.js'
import './tab.js'
import './resize.js'


(function(){
//
		let search = new Search(document.querySelector('.search-view'))
		let player = new MusicPlayer(document.querySelector('#player'))
		let topList = new TopList(document.querySelector('.rank-view')).launch()
		let recommend = new Recommend(document.querySelector('.rec-view')).launch()


		document.querySelector('.show-player').addEventListener('click',()=>{
			player.show()
		})


		onHashChange()
		window.addEventListener('hashchange',onHashChange)

		// document.querySelector('.song-list').addEventListener('click',()=>{
		// 	player.play()
		// })

		//window.player = player
		//window.search =search

		function onHashChange(){
			let hash = location.hash
			
			if(/^#player\?+/.test(hash)){
				let matches = hash.slice(hash.indexOf('.?') + 1).match(/(\w+)=([^&]+)/g)
				let options = matches && matches.reduce((res, cur) => {
					let arr = cur.split('=')
					res[arr[0]] = decodeURIComponent(arr[1])
					return res
				  }, {})
				//console.log('54', options)
				player.play(options)
			}else{
				player.hide()
			}
		}

})()