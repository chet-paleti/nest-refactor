const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', 'views');

const Routes = require('./routes/all_routes');

app.use(bodyParser.urlencoded({ extended: false }));



app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false
    })
);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    //cb(null, new Date().toISOString() + '-' + file.originalname);
    
      cb(null, req.session.user + '.jpg');
      //cb(null, 'test.jpg')
  }
});

app.use(
  multer({ storage: fileStorage}).single('image')
);



app.use(Routes);

app.listen(3000);