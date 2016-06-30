import express from 'express';
import graffiti from '@risingstack/graffiti';
//import schema from './schema';
import { json } from 'body-parser';

import mongoose from 'mongoose';
import User from './User';
import Pet from './Pet';
import {getSchema} from '@risingstack/graffiti-mongoose';

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/graphql1');


const app = express();
app.use(json());

app.use(graffiti.express({
  schema : getSchema([Pet, User])
}));

app.listen(3001, (err) => {
  if (err) {
    throw err;
  }

  console.log('Express server is listening on port 3001');
});