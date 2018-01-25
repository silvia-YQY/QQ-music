class MusicPlayer{
    constructor(el){
        this.$el = el
        this.$el.addEventListener('click',this)
        this.$audio = this.createAudio()
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'),this.$audio)
        this.progress = new PragressBar(this.$el.querySelector('.progress'), 10, true)
        this.fetching = false
    }


    createAudio(){
        let audio = document.createElement('audio')
       // this.$audio.loop = true
        audio.id = `play-${Math.floor(Math.random() * 100)}-${+new Date()}`
        audio.onended = () =>{
            this.$audio.play()  //循环播放
            this.lyrics.restart()
            this.progress.restart()
            console.log('ended')
        }
        document.body.appendChild(audio)
        return audio
    }

    handleEvent(event){
        let target = event.target
        //console.log(target)
        switch(true){
            case target.matches('.icon-play'):
                this.onPlay(event)  
                break
            case target.matches('.icon-pause'):
                this.onPause(event)
                break
            case target.matches('.icon-list'):
                this.hide()
                break
            // case target.matches('.show-player'):
            //     this.show()
            //     break
        }
    }

    onPlay(event){
        if(this.fetching) return 
        this.$audio.play()
        this.lyrics.start()
        this.progress.start()
        event.target.classList.add('icon-pause')
        event.target.classList.remove('icon-play')  
    }

    onPause(event){
        this.$audio.pause()
        this.lyrics.pause()
        this.progress.pause()
        event.target.classList.remove('icon-pause')
        event.target.classList.add('icon-play')
    }

    //播放音乐
    play(options = {} ){
        if(!options) return

        this.$el.querySelector('.song-name').innerText = options.songname
        this.$el.querySelector('.song-artist').innerText = options.artist
        this.progress.reset(options.duration)

        let url = `https://y.gtimg.cn/music/photo_new/T001R68x68M000${options.albummid}.jpg`
        this.$el.querySelector('.album-cover').src = url
        this.$el.querySelector('.player-backgrouond').style.backgroudImage = `url(${url})`

        if(options.songid,options.songmid){
            if(this.songid !== options.songid){
                this.$el.querySelector('.icon-action').className =  'icon-action icon-play'
            }
            this.songid = options.songid
            this.songmid = options.songmid
            this.$audio.src=`http://isure.stream.qqmusic.qq.com/C100${this.songmid}.m4a?fromtag=32`
            fetch(`https://qq-music-api.now.sh/lyrics?id=${this.songid}`)
                .then(res => res.json() )
                .then(json => json.lyric )
                .then(text => this.lyrics.reset(text) )
                //.catch(() => {} )
        }
        this.show()
        
    }

    show(){
        this.$el.classList.remove('hide')
        //this.$el.classList.add('active')
    }

    hide(){
        this.$el.classList.add('hide')
        //this.$el.classList.remove('active')
    }
}