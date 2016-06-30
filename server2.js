import express from 'express';
import graffiti from '@risingstack/graffiti';
//import mongooseSchema from './data/schema';
import { json } from 'body-parser';
import { getSchema } from '@risingstack/graffiti-mongoose';
import mongoose from 'mongoose';
import User from './data/User';
import Couple from './data/Couple';

const app = express();

const PORT = process.env.PORT || 8080;
process.env.MONGOLAB_URI = 'mongodb://quang:123@ds011495.mlab.com:11495/twittercouple'
const MONGO_URI = process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/graphql1';

mongoose.connect(MONGO_URI);


app.use(express.static('public'));
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')
app.set('views', __dirname + '/views');


app.use(json());

app.use(graffiti.express({
  schema : getSchema([Couple, User])
}));

app.get('/', function (req, res){
	res.render('index');
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log('Express server is listening on port ' + PORT);
});

export default app;