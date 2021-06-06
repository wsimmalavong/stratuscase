const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', (req, res) => {
  res.render('index', {
    city: null,
    des: null,
    icon: null,
    temp: null
  });
});

router.post('/', async (req, res) => {
  const url_api = `http://xkcd.com/614/info.0.json`;

  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
          const city = data.month;
          const des = data.transcript;
          const icon = data.year;
          const temp = data.img
          res.render('index', {
            city, des, icon, temp
          });
      });

  } catch (err) {
    res.render('index', {
      city: 'something wrong',
      des: null,
      icon: null,
      temp: null
    })
  }

})


module.exports = router;