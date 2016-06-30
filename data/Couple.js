import mongoose from 'mongoose';

const CoupleSchema = new mongoose.Schema({
  nameA: {
    type: String,
    index: true
  },
  nameB: {
    type: String,
    index: true
  },
  createdBy: {
    type: String
  },
  tweet: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

CoupleSchema.pre("save", function(next) {
    console.log("Saving...");
    var self = this;
    //$or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]
    //nameA : { $in: [self.nameA, self.nameB] 
    mongoose.models["Couple"].find({$or:[ {nameA : { $in: [self.nameA, self.nameB]}}, {nameB : { $in: [self.nameA, self.nameB]}} ]},function(err, couple) {
        if(err) {
            //done(err);
            next(err);
        } else if(couple.length != 0) {
            console.log("Duplicate");
            console.log(couple);
            self.invalidate("nameA", "username must be unique. Try again.");
            //done(new Error("username must be unique"));
            next(new Error("username must be unique"));
        } else {
            //done();
            next();
        }
    });
    //next();
});

const Couple = mongoose.model('Couple', CoupleSchema);

export default Couple;