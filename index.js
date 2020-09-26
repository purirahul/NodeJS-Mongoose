const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {

  console.log("Connected Scuccessfully");

  Dishes.create({
    name: "Uthappizza",
    description: "test"
  })

    .then((dish) =>{
      console.log(dish);

      return Dishes.findByIdAndUpdate(dish._id, {
        $set: { description: "updated test"}
      },
      {
        new:  true
      });
    })
    .then((dish) =>{
      console.log(dish);

      dish.comments.push({
        rating: 5, comment: "Must try", author: "Rahul puri"
      });

      return dish.save()
    })
    .then((dish) => {
      console.log(dish);

      return Dishes.remove({});
    })
    .then((result) =>{
      console.log(result);

      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
