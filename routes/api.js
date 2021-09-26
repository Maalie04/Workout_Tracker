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

 app.put("api/workouts/:id", function (req,res) {
     let id = req.params.id;
     db.Workout.findOneAndUpdate(
         { _id: id },
         { $push: { exercise: req.body }},
         function (error, success){
             if(error){
                 console.log(error);
             } else {
                 res.send(success);
             }
         }
     );
 });

app.get("/api/workouts", (req,res) => {
    db.Workout.aggregate([{
        $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
        },
    }])
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});


 app.get("/api/workouts/range", function(req,res) {
     db.Workout.aggregate([{
         $addFields: {
             totalDuration: { $sum: "$exercises.duration" },
             dateDifference: {
                 $subtract: [new Date(), "$day"],
             },
         }
     }])
     .then(function (dbWorkouts) {
         console.log(dbWorkouts)
         res.json(dbWorkouts);
     });
 });

 app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);