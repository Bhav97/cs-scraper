/**
* Scraper that scrapes off comic data from url
*/

var cheerio = require('cheerio');
var request = require('request');

module.exports = {
  scrape : function(res, req, url) {
    request(url, function(err, inres, html) {
      if(!err && inres.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        var $ = cheerio.load(html);
        var comic = {}
        comic.id = parseInt($('article').attr('id').replace(/^\D+/, ''));
        comic.image = $('.entry-content').children().eq(0).children().eq(0).attr('src');
        comic.height =  parseInt($('.entry-content').children().eq(0).children().eq(0).attr('height'));
        comic.width = parseInt($('.entry-content').children().eq(0).children().eq(0).attr('width'));
        res.end(JSON.stringify(comic));
      } else {
        res.writeHead(500, {'Content-Type' : 'text;charset=utf-8'});
        console.log('Application Error : %j\t%j', inres.statusCode, err);
        res.end();
      }
    });
  }
}
