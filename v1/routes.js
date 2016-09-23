var listScraper = require('./scraper/list-scraper.js')

module.exports = function(app) {

  /**
  * GET
  * Get posts from the specified page of website
  */
  app.get('/v1/home/en/:page', function(req, res) {
    scrapeHome(res, req, "en");
  });

  app.get('/v1/home/fr/:page', function(res, req) {
    scrapeHome(res, req, "fr");
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

var scrapeHome = function(res, req, language) {
  url = "https://www.commitstrip.com/" + language + "/page/" + req.params.page
  listScraper.scrape(res, req, url, req.params.page);
}
