const express = require('express');
const morgan = require('morgan');
const {main} = require('./views/index');

const app = express();
const { db } = require('./models')

db.authenticate().
then(() => {
  console.log('connected to the db')
} )


app.use(morgan('dev'));
app.use(express.static(__dirname + "/stylesheets"));
app.use(express.urlencoded());



app.get('/', (req,res,next) => {

  res.send(main());
})

let init = async () => {
  await db.sync();

  app.listen('3000', () => console.log('App listening in port 3000'));
}

init();
