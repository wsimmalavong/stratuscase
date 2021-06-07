const router = require('express').Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');

router.get('/', (req, res) => {
  rand = Math.floor(Math.random() * 2400);
  res.cookie('username', 0);
  
  res.redirect('/comic/' + rand);
});

router.get('/comic/:id', async (req, res) => {
  const url_api = `http://xkcd.com/${req.params.id}/info.0.json`;
  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
          const month = data.month;
          const transcript = data.transcript.replace(/[\[\]]+/g,'**');
          const year = data.year;
          const img = data.img;
          const num = data.num;
          const link = data.link;
          const news = data.news;
          var safe_title = ""
          if (data.safe_title !== null){
            safe_title = data.safe_title;
          }
          const day = data.day;
          var views = 0;
          if (req.cookies[num] != null){
            views = parseInt(req.cookies[num]) + 1;
            res.cookie(num, parseInt(req.cookies[num]) + 1);
          }
          else{
            res.cookie(num, 1);
            views = 1;
          }
          res.render('index', {
            day, month, year, transcript, img, num, link, news, safe_title, views
          });
          
      });

  } catch (err) {
    res.render('index', {
      transcript: 'something wrong',
      month: null,
      day: null,
      year: null,
      img: "",
      num: 0,
      safe_title: "",
      views: 0
    })
  }

})


module.exports = router;