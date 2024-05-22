var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

let multer = require('multer');
let upload = multer({dest:'uploads/'})

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), function(req,res){
  let file = req.file;
  let resObj = {
    name:file.originalname,
    type:file.mimetype,
    size:file.size
  };
  console.log(resObj);
  res.json(resObj);
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
