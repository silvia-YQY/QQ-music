//let text = "[ti&#58;等你下课&#40;with&#32;杨瑞代&#41;]&#10;[ar&#58;周杰伦]&#10;[al&#58;]&#10;[by&#58;]&#10;[offset&#58;0]&#10;[00&#58;01&#46;74]等你下课&#40;with&#32;杨瑞代&#41;&#32;&#45;&#32;周杰伦&#10;[00&#58;08&#46;09]词：周杰伦&#10;[00&#58;10&#46;18]曲：周杰伦&#10;[00&#58;12&#46;61]&#10;[00&#58;15&#46;16]Jay：你住的&#32;巷子里&#10;[00&#58;18&#46;77]我租了一间公寓&#10;[00&#58;21&#46;93]&#10;[00&#58;22&#46;48]为了想与你不期而遇&#10;[00&#58;27&#46;25]&#10;[00&#58;28&#46;55]高中三年&#32;我为什么&#10;[00&#58;31&#46;60]为什么不好好读书&#10;[00&#58;34&#46;55]&#10;[00&#58;35&#46;69]没考上跟你一样的大学&#10;[00&#58;39&#46;89]&#10;[00&#58;40&#46;64]我找了份工作&#10;[00&#58;42&#46;89]&#10;[00&#58;43&#46;73]离你宿舍很近&#10;[00&#58;46&#46;23]&#10;[00&#58;46&#46;98]当我开始学会做蛋饼&#10;[00&#58;50&#46;41]才发现你&#32;不吃早餐&#10;[00&#58;55&#46;24]喔&#32;你又擦肩而过&#10;[00&#58;59&#46;33]&#10;[01&#58;00&#46;01]你耳机听什么&#10;[01&#58;02&#46;52]&#10;[01&#58;03&#46;18]能不能告诉我&#10;[01&#58;05&#46;64]&#10;[01&#58;06&#46;74]合：躺在你学校的操场看星空&#10;[01&#58;13&#46;50]&#10;[01&#58;14&#46;32]教室里的灯还亮着你没走&#10;[01&#58;19&#46;76]&#10;[01&#58;20&#46;78]记得&#32;我写给你的情书&#10;[01&#58;26&#46;32]&#10;[01&#58;27&#46;28]都什么年代了&#10;[01&#58;29&#46;68]&#10;[01&#58;30&#46;54]到现在我还在写着&#10;[01&#58;34&#46;17]总有一天总有一年会发现&#10;[01&#58;39&#46;54]&#10;[01&#58;40&#46;30]有人默默的陪在你的身边&#10;[01&#58;46&#46;10]&#10;[01&#58;46&#46;97]也许&#32;我不该在你的世界&#10;[01&#58;52&#46;47]&#10;[01&#58;53&#46;33]当你收到情书&#10;[01&#58;55&#46;70]&#10;[01&#58;56&#46;78]也代表我已经走远&#10;[02&#58;01&#46;67]&#10;[02&#58;24&#46;25]Gary：学校旁&#32;的广场&#10;[02&#58;27&#46;98]&#10;[02&#58;28&#46;54]我在这等钟声响&#10;[02&#58;31&#46;36]&#10;[02&#58;32&#46;39]等你下课一起走好吗&#10;[02&#58;37&#46;34]Jay：弹着琴&#32;唱你爱的歌&#10;[02&#58;41&#46;52]暗恋一点都不痛苦&#10;[02&#58;43&#46;88]Gary：一点都不痛苦&#10;[02&#58;45&#46;43]Jay：痛苦的是你&#10;[02&#58;46&#46;83]合：根本没看我&#10;[02&#58;49&#46;75]Jay：我唱这么走心&#10;[02&#58;52&#46;23]Gary：这么走心&#10;[02&#58;53&#46;40]Jay：却走不进你心里&#10;[02&#58;55&#46;49]Gary：进你心里&#10;[02&#58;56&#46;96]Jay：在人来人往&#10;[02&#58;58&#46;50]合：找寻着你&#32;守护着你&#10;[03&#58;01&#46;74]不求结局&#10;[03&#58;04&#46;63]合：喔&#10;[03&#58;06&#46;13]Gary：你又擦肩&#10;[03&#58;07&#46;57]合：而过&#10;[03&#58;08&#46;97]&#10;[03&#58;09&#46;62]Jay：我唱告白气球&#10;[03&#58;11&#46;86]&#10;[03&#58;12&#46;94]终于你回了头&#10;[03&#58;15&#46;69]&#10;[03&#58;16&#46;94]合：躺在你学校的操场看星空&#10;[03&#58;23&#46;27]&#10;[03&#58;24&#46;23]教室里的灯还亮着你没走&#10;[03&#58;29&#46;54]&#10;[03&#58;30&#46;58]记得&#32;我写给你的情书&#10;[03&#58;35&#46;76]&#10;[03&#58;37&#46;04]都什么年代了&#10;[03&#58;39&#46;09]&#10;[03&#58;40&#46;19]到现在我还在写着&#10;[03&#58;43&#46;89]总有一天总有一年会发现&#10;[03&#58;49&#46;31]&#10;[03&#58;50&#46;07]有人默默的陪在你的身边&#10;[03&#58;55&#46;87]&#10;[03&#58;56&#46;68]也许&#32;我不该在你的世界&#10;[04&#58;02&#46;12]&#10;[04&#58;02&#46;98]当你收到情书&#10;[04&#58;05&#46;29]&#10;[04&#58;06&#46;59]也代表我已经走远"

export class LyricsPlayer{
    constructor(el,audio){
        this.$el = el
        this.$el.innerHTML =  `<div class = 'player-lyrics-lines'></div>`
        this.$lines = this.$el.querySelector('.player-lyrics-lines')
        this.text = ''
        this.$audio = audio
        this.index = 0  //歌词行数
        this.elapsed = 0  //逝去时间
        this.lyrics = [] //歌词
        this.reset(this.text)
    }

    start(){
        this.pause()
        this.intervalId = setInterval(this.update.bind(this),1000)
        //每秒运行一次updata进行更新歌词条
    }

    pause(){
        clearInterval(this.intervalId)
    }

    update(){
        this.elapsed = Math.round(this.$audio ? this.$audio.currentTime : this.elapsed + 1)
        this.$lineClass = this.$el.querySelectorAll('.player-lyrics-line')
        if(this.index === this.lyrics.length - 1 ) return this.reset()
        for(let i = this.index + 1 ; i < this.lyrics.length; i++){
            let seconds = this.getSeconds(this.lyrics[i])
            if(
                this.elapsed === seconds &&
                (!this.lyrics[i + 1] || this.elapsed < this.getSeconds(this.lyrics[i + 1]))
            ){
                this.$lines.children[this.index].classList.remove('active')
                this.$lines.children[i].classList.add('active')
                this.index = i
                break
            }
        }

        //歌词大于第四行，开始滚动
        if(this.index > 4){
            let y = -(this.index - 4 ) * this.LINE_HEIFHT
            //console.log(this.$lineClass)
            Array.prototype.forEach.call(this.$lineClass,function(e,i){
                e.style.transform = `translateY(${y}px)`
            })
            //don't know why can't use []
            //[].forEach.call(this.$lineClass,(e) => e.style.transform = `translateY(${y}px)`)
            //this.$line.style.transform = `translateY(${y}px)`
            //this.$lineClass.style.transform = `translateY(${y}px)`
        }
    }


    reset(text){
        this.pause()
        this.index = 0
        this.elapsed = 0

        this.$lines.style.transform = `franslateY(0)`
        // let $active = this.$lines.querySelector('.active')
        // if ($active) {
        //   $active.classList.remove('active')
        // }

        if(text){
            this.text = this.formatText(text) || ''
            this.lyrics = this.text.match(/^\[\d{2}:\d{2}\.\d{2}\].+/gm) || []
            if(this.lyrics.length){
                this.render()
                this.$lines.children[this.index].classList.add('active')
            }
        }
    }

    render(){
        //console.log(this.lyrics)
        let html = this.lyrics.map(line => 
            `<div class = 'player-lyrics-line'> ${line.slice(10)} </div>`
        ).join('')
        //console.log(html)
        this.$lines.innerHTML = html
    }

    restart(){
        this.reset()
        this.start()
    }

    //获得歌词的秒数
    getSeconds(line){
    return + line.replace(/^\[(\d{2}):(\d{2}).+/, (match , p1, p2) => 60*(+p1)+ +p2)
    }

    //设置扒下来的歌词格式
    formatText(text){
        let div = document.createElement('div')
        div.innerHTML = text
        return div.innerText
    }
}

LyricsPlayer.prototype.LINE_HEIFHT = 39