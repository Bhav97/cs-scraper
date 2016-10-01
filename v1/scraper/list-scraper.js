/**
* Scraper that scrapes off comic lists from the page
*/

var cheerio = require('cheerio');
var request = require('request');

module.exports = {
  scrape : function(res, req, url, page) {
    request(url, function(err, inres, html) {
      if(!err && inres.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        var $ = cheerio.load(html);
        var list = [];
        $('.excerpt').each(function(index) {
          thumbnail = $(this).children().eq(0).children().eq(0).children().eq(0).attr('src');
          if (typeof(thumbnail) === 'undefined') {
            thumbnail = $(this).children().eq(0).children().eq(0).children().eq(0).attr('style').replace(/[^D#]+/, "");
          }
          list.push({
            url : $(this).children().eq(0).children().eq(0).attr('href'),
            thumbnail : thumbnail,
            logo : "http://www.commitstrip.com/" + $(this).children().eq(0).children().eq(0).children().eq(1).children().eq(0).attr('src'),
            title : $(this).children().eq(0).children().eq(0).children().eq(1).children().eq(1).text(),
            page : page
          });
        });
        res.end(JSON.stringify(list));
      } else {
        res.writeHead(500, {'Content-Type' : 'text;charset=utf-8'});
        console.log('Application Error : %j\t%j', inres.statusCode, err);
        res.end();
      }
    });
  }
}
