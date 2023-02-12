const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

(async () => {
  // const response = await axios.get('https://waltonbd.com/refrigerator-freezer/direct-cool-refrigerator?sort=p.price&order=DESC&limit=20');
  // const $ = cheerio.load(response.data);
  // const href_arr = [
  //   "https://waltonbd.com/wfe-2n5-elnx-xx",
  //   "https://waltonbd.com/wfa-2d4-rxxx-xx",
  //   "https://waltonbd.com/wfa-2a3-rlxx-xx",
  //   "https://waltonbd.com/wfa-2a3-elxx-xx",
  //   "https://waltonbd.com/wfb-2x1-rnxx-rp",
  //   "https://waltonbd.com/wfb-2e4-gdeh-sc",
  // ]
  const data = []
  
  // $(".grid-style h6 a").each((i, element) => {
  //   const href = $(element).attr("href")
  //   href_arr.push(href)
  // });
  
  for (let i = 0; i < href_arr.length; i++) {
    data.push(await getData(href_arr[i]))
  }
  
  async function getData(href) {
    const response = await axios.get(href)
    const $ = cheerio.load(response.data);
    // const html = $.html();
    
    const url = href.split("/").pop().split("?").shift()
    const price = $(".price-style").find(".final_price").text()
    
    const mini_map = [];
    $(".MagicScroll.mcs-rounded > a").each((i, element) => {
      const src = $(element).attr("data-image-2x");
      mini_map.push(src);
    });
    
    if (mini_map.length <= 0) {
      const srcset = $("img[itemprop]").attr("srcset")
      const src = srcset.match(/\/\/[^\s]+thumb1000x1000[^\s]+jpg/)[0]
      
      mini_map.push(src)
    }
    
    /*fs.writeFile('data.html' ,html , (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    })
    */
    
    return mini_map
    
    // return {
    //   url,
    //   price,
    //   mini_map
    // }
  }
  
  console.log(data)
  
  /*fs.writeFile('data.js', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })*/
})();