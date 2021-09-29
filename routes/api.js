const router = require("express").Router();
const Workout = require("../models/Workout");


router.post("/api/workouts", ({ body }, res) => {
  
    Workout.create(body)
    .then(({ _id }) =>
			db.Workout.findOneAndUpdate(
				{ $push: { exercises: _id } },
				{ new: true }
			)
		)
     .then(dbWorkouts => {
         res.json(dbWorkouts);
     })
     .catch(err => {
         res.json(err);
     });
 });

 router.put("/api/workouts/:id", function (req,res) {
     let id = req.params.id;
        Workout.findByIdAndUpdate(
         id,
         { $push: { exercises: req.body }},
         {
             new: true,
             runValidator: true,
         },
     ) .then(dbWorkouts => {
        console.log(dbWorkouts)
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
 });

router.get("/api/workouts", (req,res) => {
    Workout.aggregate([{
        $addFields: {
            totalDuration: { $sum: '$exercises.duration' },
        },
    }])
    .then(dbWorkouts => {
        console.log(dbWorkouts)
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});


 router.get("/api/workouts/range", function(req,res) {
     Workout.aggregate([{
         $addFields: {
             totalDuration: { $sum: '$exercises.duration' },
         }
     }]).sort({_id: -1}).limit(7)
     .then(dbWorkouts => {
        console.log(dbWorkouts)
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
 });

module.exports = router;