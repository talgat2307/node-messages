const router = require('express').Router();
const fs = require('fs');
let arr = [];

router.get('/', (req, res) => {
  const path = './messages';

  fs.readdir(path, (err, files) => {
    try {
      files.forEach(file => {
        arr.push(JSON.parse(fs.readFileSync(path + '/' + file)));
      });
    } catch (e) {
      arr = [];
    }
  });
  const messages = arr.slice(Math.max(arr.length - 5, 0));
  res.send(messages);
});

router.post('/', (req, res) => {
  const date = JSON.stringify(new Date());
  const messages = `./messages/${date}.txt`;
  const obj = req.body;
  obj.datetime = date;
  fs.writeFileSync(messages, JSON.stringify(obj));
  res.send(obj);
});

module.exports = router;

