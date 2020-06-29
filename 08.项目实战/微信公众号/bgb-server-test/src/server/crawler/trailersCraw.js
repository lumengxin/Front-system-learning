const puppeteer = require('puppeteer')

// 爬取即将上映电影信息（预告片不全）
// const url = 'https://movie.douban.com/coming'
// 1.爬取最近高分电影信息
const url = 'https://movie.douban.com/explore#!type=movie&tag=热门&sort=rank'
const randomSec = Math.ceil(Math.random() * 10)

module.exports = async () => {
  const browser = await puppeteer.launch({
    headless: false
  })

  const page = await browser.newPage()

  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  await timeout(2)
  let result = await page.evaluate(() => {

    let result = []
    const $list = $('.list-wp>.list>.item')

    for (let i = 0; i < $list.length; i++) {
      const liDom = $list[i];
      //电影标题
      let title = $(liDom).find('p')[0].innerText.split(' ')[0]
      //电影评分
      let rating = $(liDom).find('p')[0].innerText.split(' ')[1]
      //豆瓣id
      let doubanId = $(liDom).find('div').data('id')
       //电影海报图
       let image = $(liDom).find('div>img').attr('src')
      //电影的详情页网址
      let href = $(liDom).attr('href')
     

      result.push({
        title,
        rating,
        href,
        image,
        doubanId
      })
    }

    return result
  })
  console.log("result", result)

  // 2.爬取详情页数据
  for (let i = 0; i < result.length; i++) {

    let item = result[i]

    let url = item.href

    await page.goto(url, {
      waitUntil: 'networkidle2'
      // timeout: 0
    })

    await timeout(2)

    let itemResult = await page.evaluate(() => {
      let genre = []
      const $genre = $('[property="v:genre"]')
      for (let j = 0; j < $genre.length; j++) {
        genre.push($genre[j].innerText)
      }
      // 剧情简介
      const summary = $('[property="v:summary"]').html().replace(/\s+/g, '')
      // 上映时间
      const releaseDate = $('[property="v:initialReleaseDate"]')[0].innerText
      // 预告片界面地址
      const trailerHref = $('.related-pic-bd>.label-trailer').find('a').attr('href')
      // 预告片背景图
      const cover = $('.related-pic-bd>.label-trailer').find('a').css('background-image').split('"')[1].split('?')[0]
      // 评价人数
      const ratingNum = parseInt($('.rating_sum a')[0].innerText)

      // 详情
      const infos = $('#info')[0].innerText.split(/\n/g)
      // 导演
      const directors = infos[0]
      // 演员
      const casts = infos[2]
      // 时长
      const runtime = infos[7]

      return {
        genre,
        summary,
        releaseDate,
        trailerHref,
        cover,
        ratingNum,
        infos,
        directors,
        casts,
        runtime
      }
    })

    item.genre = itemResult.genre
    item.summary = itemResult.summary
    item.releaseDate = itemResult.releaseDate
    item.trailerHref = itemResult.trailerHref
    item.cover = itemResult.cover
    item.ratingNum = itemResult.ratingNum
    item.infos = itemResult.infos
    item.directors = itemResult.directors
    item.casts = itemResult.casts
    item.runtime = itemResult.runtime

    // await timeout(randomSec)
  }
  console.log("result2", result)

  // 3.爬取预告片链接
  for (let i = 0; i < result.length; i++) {
    let item = result[i]

    let url = item.trailerHref

    await page.goto(url, {
      waitUntil: 'networkidle2'
    })

    await timeout(2)

    let attr = await page.evaluate(() => {
      return $('video')[0].currentSrc
    })

    item.attr = attr

    // await timeout(1)
  }
  console.log("result3", result)

  await browser.close()

  return result
}

function timeout(s) {
  return new Promise(resolve => setTimeout(resolve, s*1000))
}