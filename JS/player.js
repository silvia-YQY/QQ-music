class MusicPlayer{
    constructor(el){
        this.$el = el
        this.$el.addEventListener('click',this)
        this.createAudio()
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'))
        this.progress = new PragressBar(this.$el.querySelector('.progress'), 10, true)
        
    }

    createAudio(event){
        this.$audio = document.createElement('audio')
        this.$audio.loop = true
        document.body.appendChild(this.$audio)
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
            case target.matches('.show-player'):
                this.show()
        }
    }

    onPlay(event){
        event.target.classList.add('icon-pause')
        event.target.classList.remove('icon-play')  
    }

    onPause(event){
        event.target.classList.remove('icon-pause')
        event.target.classList.add('icon-play')
    }

    play(){

    }

    show(){
        this.$el.classList.remove('hide')
    }

    hide(){
        this.$el.classList.add('hide')
    }
}