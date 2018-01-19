class MusicPlayer{
    constructor(el){
        this.$el = el
        this.$el.addEventListener('click',this)
        this.createAudio()
        //this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'))
        //this.progress = new LyricsPlayer(this.$el.querySelector('.progress'))
        
    }

    createAudio(event){
        this.$audio = document.createElement('audio')
        this.$audio.loop = true
        document.body.appendChild(this.$audio)
    }

    handleEvent(event){
        let target = event.target
        console.log(target)
        switch(true){
            case target.matches('.icon-play'):
                this.onPlay(event)  
                break
            case target.matches('.icon-pause'):
                this.onPause(event)
                break
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

    }

    hide(){

    }
}