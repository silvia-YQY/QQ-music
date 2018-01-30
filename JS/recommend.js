import { Slider } from './carousel.js'
import { lazyload } from './lazyload.js'

export class Recommend{
    constructor(el){
        this.$wl = el
    }

    launch(){
        fetch('http://localhost:3000')
            .then(res => res.json())
            .then(json => this.json = json)
            .then(() => this.render())
        return this
    }

    render(){
        this.renderSlider(this.json.data.slider)
        this.renderRadios(this.json.data.radioList)
        this.renderPlaylists(this.json.data.songList)
        lazyload()
    }

    renderSlider(slides){
        this.slides = new Slider({
            el:document.querySelector("#slider"),
            slides: slides.map(slide => ({
                    link:slide.linkUrl,
                    image:slide.picUrl 
            }))
        })
	}
        

    renderRadios(radios){
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

	renderPlaylists(playlists){
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
    
}