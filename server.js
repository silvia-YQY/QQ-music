const express = require('express')
const request = require('request-promise')
const app = express()
const cors = require('cors')
const {PORT = 3000} = process.env

const HEADERS = {
    'accept': 'application/json',
    'authority': 'c.y.qq.com',
    'origin': 'https://m.y.qq.com',
    'referer': 'https://m.y.qq.com/',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
}

app.use(cors())

app.get('/', async(req,res) => {
    const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1564641536&uin=545067444&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${ +new Date()}`
    try{
        res.json (await request({
            uri:url,
            json:true,
            headers:HEADERS
        }))
    }catch(e){
        res.json({error:e.message})
    }

})

app.get('/toplist',async(req,res) => {
    const url =`https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=761707437&uin=545067444&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${ +new Date()}`
    try{
        res.json (await request({
            uri:url,
            json:true,
            headers:HEADERS
        }))
    }catch(e){
        res.json({error:e.message})
    }
})

app.get('/hotkey', async (req, res) => {
    const url = `https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+new Date()}`
    try{
        res.json (await request({
            uri:url,
            json:true,
            headers:HEADERS
        }))
    }catch(e){
        res.json({error:e.message})
    }
  })

app.get('/search',async(req,res) => {
    const {keyword,page =1 } = req.query
    const url =`https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=1564641536&uin=545067444&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all&_=${ +new Date()}`
    try{
        res.json (await request({
            uri:url,
            json:true,
            headers:HEADERS
        }))
    }catch(e){
        res.json({error:e.message})
    }
})


//歌词捉取
app.get('/lyrics',async(req,res) => {
    const url =`https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?nobase64=1&musicid=5016168&songtype=0`
    try{
        let text =  (await request({
            uri:url,
            json:true,
            headers: {
                'accept': '*/*',
                'authority': 'c.y.qq.com',
                'referer': 'https://c.y.qq.com',
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
              }
        })).replace(/MusicJsonCallback\((.*)\)/, '$1')
        res.json(JSON.parse(text))
    }catch(e){
        res.json({error:e.message})
    }
})

app.listen(PORT)

//curl 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1564641536&uin=545067444&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1515726030736' -H 'origin: https://m.y.qq.com' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: zh-CN,zh;q=0.9' -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1' -H 'accept: application/json' -H 'referer: https://m.y.qq.com/' -H 'authority: c.y.qq.com' -H 'cookie: RK=KXVqq2qbMr; pgv_pvi=5429872640; OUTFOX_SEARCH_USER_ID_NCOO=462450307.7243392; tvfe_boss_uuid=13451ff537a822fc; o_cookie=545067444; ptisp=ctc; ptcz=fbfda53486ede0b86877ae398be6b51d6224d7d7ce5a465e4718c912f69c9a34; uin=o0545067444; skey=@5WWtGFQlz; pt2gguin=o0545067444; yqq_stat=0; pgv_si=s7586513920; ts_last=y.qq.com/m/act/year_personal_2017/index.html; ts_refer=ADTAGmyqq; ts_uid=4734634728; pgv_info=ssid=s6568362357; pgv_pvid=1869010520' --compressed

//https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1564641536&uin=545067444&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&pl


//https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=1564641536&uin=545067444&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=%E6%9D%A8%E5%8D%83%E5%AC%85&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1515742981714