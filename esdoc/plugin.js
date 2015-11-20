const cheerio = require('cheerio');

exports.onHandleHTML = function (ev) {
  const $ = cheerio.load(ev.data.html);
  $('header a[data-ice="repoURL"]')
    .attr('href', 'https://github.com/skratchdot/stats-collector')
    .addClass('repo-url-github');
  $('header a:first-child').text('Stats Collector');
  $('footer').append(
    ' , Copyright &copy; 2015 <a href="http://skratchdot.com/">skratchdot.com</a>'
  );
  // linkify extends
  $('div[data-ice="extendsChain"] div').each(function () {
    const items = $(this).find('span').text().split('~');
    if (items.length === 2) {
      $(this).html(`<a href="./class/${items[0]}.js~${items[1]}.html">${items[1]}</a>`);
    }
  });
  ev.data.html = $.html();
};
