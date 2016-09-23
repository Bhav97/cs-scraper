var listScraper = require('./scraper/list-scraper.js');
var comicScraper = require('./scraper/comic-scraper.js');

module.exports = function(app) {

  /**
  * GET
  * Get posts from the specified page of website
  */
  app.get('/v1/home/:language/:page', function(req, res) {
    scrapeHome(res, req);
  });

  // app.get('/v1/home/fr/:page', function(res, req) {
  //   scrapeHome(res, req, "fr");
  // });

  app.post('/v1/comic', function(req, res) {
    scrapeComic(res, req);
  });


  /**
  * GET
  * 404 Content not found
  */
  app.get('/*', function(req, res) {
    res.writeHead(404, {'Content-Type':'text;charset=utf-8'});
    res.end("404 content not found");
  });
}

var scrapeHome = function(res, req) {
  url = "https://www.commitstrip.com/" + req.params.language + "/page/" + req.params.page
  listScraper.scrape(res, req, url, req.params.page);
}

var scrapeComic = function(res, req) {
  comicScraper.scrape(res, req, req.body.url);
}
