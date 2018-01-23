class Search{
    constructor(el){
        this.$el = el
        this.$input = this.$el.querySelector('#search')
        this.$input.addEventListener('keyup',this.onkeyUp.bind(this))
        this.$songs = this.$el.querySelector('.song-list')
        this.keyword = ''
        this.page = 1
        this.songs=[]
        this.perpage = 20
        this.fetching = false
        this.nomore = false
        this.onscroll = this.onScroll.bind(this)
        window.addEventListener("scroll",this.onscroll)
        
    }

    onkeyUp(event){
        let keyword = event.target.value.trim()
        if(!keyword) return this.reset()
        if(event.key !== "Enter") return
        this.loading()
        this.search(keyword)

    }

    onScroll(){
        if(this.nomore) return window.removeEventListener('scroll',this.onscroll)
        if(document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50){
            this.search(this.keyword,this.page + 1)
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
        if(this.fetching ) return
        this.keyword = keyword
        this.fetching = true
        fetch(`http://localhost:3000/search?keyword=${this.keyword}&page=${page || this.page}`)
            .then(res => res.json())
            .then(json => {
                this.page = json.data.song.curpage
                this.nomore = (json.message === 'no results')  //no results
                this.songs.push(...json.data.song.list)
                return json.data.song.list
            })
            .then(songs => this.append(songs))
            .then(() => this.loading())
            .then(() => this.fetching = false)
            .then(() => this.endLoading())
            .catch(() => this.fetching = false)
        
    }

    append(songs){
        let html = songs.map(song =>`
            <li class='song-item'>
                <a src = >
                    <i class='icon icon-music'><img src="img/Music.png" alt=""></i>
                    <h6 class='song-name ellipsis'>${song.songname}</h6>
                    <p class='song-artist ellipsis'>${song.singer.map(s => s.name).join(" ")}</p> 
                </a>
            </li>`).join(" ")

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