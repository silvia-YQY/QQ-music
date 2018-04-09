export class Search{
    constructor(el){
        this.$el = el
        this.$input = this.$el.querySelector('#search')
        this.$input.addEventListener('keyup',this.onkeyUp.bind(this))
        this.$songs = this.$el.querySelector('.song-list')
        this.keyword = ''
        this.page = 1
        this.songs={}
        this.perpage = 20
        this.fetching = false
        this.nomore = false
        this.onscroll = this.onScroll.bind(this)  
        //绑定this（Search）给onScroll函数，以免下面监听scroll时间更换this（Windows）
        //window.addEventListener('scroll', this.onscroll)    
        //直接监听window的scroll事件会有bug，就是还没有点击搜索的tab，页面也会监听到scroll而运行onScroll函数
        this.$el.addEventListener("scroll",this.onscroll)
        //但是若果指定监听搜索页面，却无法运行。
        //console.log(this.$el)
    }

    onkeyUp(event){
        let keyword = event.target.value.trim()
        if(!keyword) return this.reset()
        if(event.key !== "Enter" || event.keyCode !== 13) return
        this.search(keyword)
        // console.log('onkeyUp')
    }

    onScroll(event){
        //console.log('asdsafonkeyUp')
        if(this.nomore) return window.removeEventListener('scroll',this.onscroll)
        if(document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50){
            this.search(this.keyword,this.page + 1)
            //console.log("songs[5].songname")
        }
        
    }

    reset(){
        this.page = 1
        this.keyword = ''
        this.songs = []
        this.$songs.innerHTML = ''
        this.$el.querySelector('.search-loading').classList.add("hide")
    }

    search(keyword,page){
        if(this.keyword === keyword && this.songs[page || this.page]) return
        if(this.fetching || this.nomore) return
        //if(this.keyword !== keyword ) return
        this.keyword = keyword
        this.loading()
        this.fetching = true
        
        fetch(`http://localhost:3000/search?keyword=${this.keyword}&page=${page || this.page}`)
            .then(res => res.json())
            .then(json => {
                this.page = json.data.song.curpage
                this.nomore = (json.message === 'no results')  //no results
                this.songs[this.page] = json.data.song.list
                return json.data.song.list
            })
            .then(songs => this.append(songs))
            .then(() => this.loading())
            .then(() => this.fetching = false)
            .then(() => this.endLoading())
            .catch(() => this.fetching = false)
    }

    append(songs){
        //console.log(songs[1].songname,songs[1].songmid)
        //href = "https://i.y.qq.com/v8/playsong.html?songmid=${song.songmid}&ADTAG=myqq&from=myqq&channel=10007100"
        let html = songs.map(song =>`
            <li class='song-item' data-songId='${song.songid}'>
                <a href="#player?artist=${song.singer.map(er => er.name).join(' ')}&songid=${song.songid}&songmid=${song.songmid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
                    <i class='icon icon-music'><img src="img/Music.png" alt=""></i>
                    <h6 class='song-name ellipsis'>${song.songname}</h6>
                    <p class='song-artist ellipsis'>${song.singer.map(s => s.name).join(" ")}</p> 
                </a>
            </li>`).join(" ")
        //console.log("songs[1].songname")
        this.$songs.insertAdjacentHTML('beforeEnd',html)
    }

    loading(){
        this.$el.querySelector('.search-loading').classList.remove("hide")
    }

    endLoading(){
        if(this.nomore){
            this.$el.querySelector('.loading-text').classList.add("hide")
            this.$el.querySelector('.loading-done').classList.remove("hide")
        }
    }
}