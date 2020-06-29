const puppeteer = require('puppeteer')
// const $ = require('jQuery')

// 爬取热门电影信息
const url = 'https://movie.douban.com/cinema/nowplaying/beijing/'

module.exports = async () => {
  // 1.打开浏览器
  const browser = await puppeteer.launch({
    // args: ['--no-sandbox']
    // 以无头浏览器形式打开浏览器（没有界面，后台运行）
    headless: false
  })
  // 2.创建tab标签页
  const page = await browser.newPage()
  // 3.跳转到指定网址
  await page.goto(url, {
    // 等待网络空闲时，再跳转加载页面
    waitUntil: 'networkidle2'
  })

  // 4.等待网址加载完，爬取数据
  // await page.screenshot()
  await timeout()
  let result = await page.evaluate(() => {
    // 对加载好的页面进行dom操作
    // 对应界面console中输入$/jQuery有响应，则可以直接用
    let result = []
    const $list = $('#nowplaying>.mod-bd>.lists>.list-item')

    console.log(typeof ($list))
    // 伪数据。for 循环遍历
    for (let i = 0; i < $list.length; i++) {
      const liDom = $list[i];
      //电影标题
      let title = $(liDom).data('title');
      //电影评分
      let rating = $(liDom).data('score');
      //电影片长
      let runtime = $(liDom).data('duration');
      //导演
      let directors = $(liDom).data('director');
      //主演
      let casts = $(liDom).data('actors');
      //豆瓣id
      let doubanId = $(liDom).data('subject');
      //电影的详情页网址
      let href = $(liDom).find('.poster>a').attr('href');
      //电影海报图
      let image = $(liDom).find('.poster>a>img').attr('src');

      result.push({
        title,
        rating,
        runtime,
        directors,
        casts,
        href,
        image,
        doubanId
      })
    }

    return result
  })
  console.log("result", result)

  // 获取详情页数据 (forEech里面函数用不了await)
  for (let i = 0; i < result.length; i++) {
    let item = result[i]

    let url = item.href

    await page.goto(url, {
      waitUntil: 'networkidle2'
    })

    // 爬取详情页中类型、介绍等信息
    let itemResult = await page.evaluate(() => {
      let genre = []
      const $genre = $('[property="v:genre"]')
      for (let j = 0; j < $genre.length; j++) {
        genre.push($genre[j].innerText)
      }
      // 去除换行和空格
      const summary = $('[property="v:summary"]').html().replace(/\s+/g, '')

      const releaseDate = $('[property="v:initialReleaseDate"]')[0].innerText

      // evaluate()中代码在浏览器中使用，获取不到item
      // item.genre = genre
      // item.summary = summary
      return {
        genre,
        summary,
        releaseDate
      }
    })

    item.genre = itemResult.genre
    item.summary = itemResult.summary
    item.releaseDate = itemResult.releaseDate

  }
  console.log("result2", result)

  // 5.关闭浏览器
  await browser.close()

  return result
}

function timeout() {
  return new Promise(resolve => setTimeout(resolve, 2000))
}