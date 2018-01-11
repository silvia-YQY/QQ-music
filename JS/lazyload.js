function lazyload(images){
    let imgs = [].slice.call(images) //Array.from(images) (es6的方法)

    if("IntersectionObserver" in window){ 
        //IntersectionObserver方法监听图片距离屏幕的距离
        //此方法兼容性较差
        let observer = new IntersectionObserver(function(entries){
            entries.forEach(entry =>{
                if (entry.intersectionRatio > 0){
                    loadImags(entry.target,() => {
                        observer.unobserve(entry.target)
                    } )
                }
            })
        },{threshold:0.01})
    
        imgs.forEach(img => observer.observe(img))

    }else{
        //通用的懒加载方法
        let onscroll = throttle (function (){
            if(images.length === 0 ){
                return window.removeEventListener('scroll',onscroll)
            }
            imgs = imgs.filter(img => img.classList.contains('lazyload'))
            imgs.forEach(img =>{
                if(inViewport(img)){
                    loadImags(img)
                }
            })
        },500)
    
        window.addEventListener('scroll',onscroll)
        window.dispatchEvent(new Event('scroll'))
    
    }

    
    // 限流
    function throttle(func,wait){
        let prev , timer
        return function fn(){
            let curr = Date.now()
            let diff = curr - prev
            if(!prev || diff >= wait){
                func()
                prev = curr
            }else if(diff < wait){
                clearTimeout(timer)
                timer = setTimeout(fn,wait - diff)
            }
        }
    }


    //检测图片是否在视窗内
    function inViewport(img){

        let {top, left, right, bottom} =  img.getBoundingClientRect()
        let vpWidth = document.documentElement.clientWidth
        let vpHeight = document.documentElement.clientHeight

        return (
            (top >0 && top < vpHeight  || bottom >0 && bottom <vpHeight)&& 
            (left >0 && left < vpWidth ||  right > 0 && right <vpWidth  )
        )

        // let rect = img.getBoundingClientRect()
        // let top = rect.top  *4   等价于上面第一行let的代码
        //上面return的方法仅适合  es6      

    }

    //加载图片
    function loadImags(img ,callback){
        let image = new Image()
        image.src = img.dataset.src
        image.onload = function(){
            img.src = image.src
            img.classList.remove('lazyload')
            if (typeof callback === 'function') callback()
        }
    }

}