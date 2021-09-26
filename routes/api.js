const router = require("express").Router();
const { Workout } = require("../models/Workout");


app.post("/api/workouts", ({body, res}) => {
    console.log(body)
    db.Workout.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({},
     { $push: { exercise:_id}}, { new: true }))
     .then(dbWorkouts => {
         res.json(dbWorkouts);
     })
     .catch(err => {
         res.json(err);
     });
 });