/**
* Scraper that scrapes off comic data from url
*/

var cheerio = require('cheerio');
var request = require('request');

module.exports = {
  scrape : function(req, res) {
    request('http://www.commitstrip.com/' + req.params.language, function(err, inres, html) {
      if(!err && inres.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        $ = cheerio.load(html);
        list = []
        $('.collapsing.archives').each(function(index) {
          url = $(this).children().eq(0).attr('href');
          title = $(this).children().eq(0).attr('title');
          count = $(this).children().eq(0).children().eq(0).text().replace(/[()]/g, "");
          if(typeof(url) !== 'undefined' && typeof(title) !== 'undefined') {
            list.push({
              url : url,
              title: title,
              count: count
            });
        }
        });
        res.end(JSON.stringify(list))
      } else {
        res.writeHead(500, {'Content-Type' : 'text;charset=utf-8'});
        console.log('Application Error : %j\t%j', inres.statusCode, err);
        res.end();
      }
    });
  }
}
