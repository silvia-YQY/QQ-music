import {lazyload} from './lazyload.js'

export class TopList{
    constructor(el){
        this.$el = el
    }

    launch(){
        fetch('http://localhost:3000/toplist')
            .then(res => res.json())
            .then(json => this.list = json.data.topList)
            .then(() => this.renderTopList())
        return this

    }

    renderTopList(){
        document.querySelector('.rank-view .toolist').innerHTML = this.list.map(item => 
        `<li class="top-item">
            <div class="top-item-media">
                <a href="#">
                    <img class="lazyload" data-src="${item.picUrl.replace('http://','https://')}" alt="">
                </a>
            </div>
            <div class="top-item-info">
                <h3 class="top-list-title ellipsis">${item.topTitle}</h3>
                <ul class="top-item-list ">
                    ${this.songlist(item.songList)}
                    <i class="topic_arrow"> >  </i>
                </ul>
            </div>
        </li>`).join("")
        //console.log('TopList',this.list)

        lazyload(document.querySelectorAll('.rank-view .toolist .lazyload'))
    }
        
        songlist(songs){
            return songs.map((song,i) => 
            `<li class="top-item-song ellipsis">
                <i class="song-index ">${i+1}</i>
                <p class="ellipsis"><span class="song-name">${song.songname}</span>-${song.singername}</p>
            </li>`).join("")
        }
    


}