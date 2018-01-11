const express = require('express')
const request = require('request-promise')
const app = express()


app.get('/' , async (req, res) => {
    const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1197257430&uin=545067444&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_= ${ + new Data()}`
    try {
        res.json(await request ({
            uri: url,
            json: true,
            headers:{
                'accept' : 'application/json',
                'authority': 'c.y.qq.com',
                'origin': 'https://m.y.qq.com',
                'referer': 'https://m.y.qq.com/',
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
            }
        }))
    } catch(e){
        res.json({error:e.message})
    }
})

// app.get('/search',async(req, res) =>{
//     const {} = 
//     const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=1197257430&uin=545067444&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeuricomponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1515660807427`
// })
app.listen(4000)
//
//curl 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=1197257430&uin=545067444&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=%E9%99%88%E5%A5%95%E8%BF%85&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1515653143646' -H 'origin: https://m.y.qq.com' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: zh-CN,zh;q=0.9' -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1' -H 'accept: application/json' -H 'referer: https://m.y.qq.com/' -H 'authority: c.y.qq.com' -H 'cookie: RK=KXVqq2qbMr; pgv_pvi=5429872640; OUTFOX_SEARCH_USER_ID_NCOO=462450307.7243392; tvfe_boss_uuid=13451ff537a822fc; o_cookie=545067444; yqq_stat=0; pgv_si=s4957455360; ptisp=ctc; ptcz=fbfda53486ede0b86877ae398be6b51d6224d7d7ce5a465e4718c912f69c9a34; uin=o0545067444; skey=@9OtYSGCWH; pt2gguin=o0545067444; ts_last=y.qq.com/w/album.html; ts_refer=ADTAGmyqq; ts_uid=4734634728; qqmusic_fromtag=10; pgv_info=ssid=s2109454070; pgv_pvid=1869010520' --compressed