import mongoose from 'mongoose';
import User from './User';
import Couple from './Couple';

const TodoSchema = new mongoose.Schema({
  text: {
    type: String
  },
  complete: {
    type: Boolean
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

export default [Todo, User, Couple];
