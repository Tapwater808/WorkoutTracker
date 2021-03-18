const db = require("../models");

require("mongoose");

module.exports = (app) => {


    // Workout Creation
    app.post("/api/workouts", (req, res) => {
        db.Workout.create({}).then(data => res.json(data))
        .catch(err => {
            console.log("error", err);
            res.json(err);

          });
    });
    // Exercise
    app.put("/api/workouts/:id", (req, res) => {

        db.Workout.findByIdAndUpdate(req.params.id,
            {$push: {exercises: req.body}},
            {new: true, runValidators: true})
          
        .then(data => res.json(data))
        .catch(err => {
            console.log("error", err);
            res.json(err);
          });
    });
    // Workout Ranges
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).limit(7).then(data => res.json(data))
        .catch(err => {
            console.log("error", err);
            res.json(err);
          });
    });   
    // get most recent Workout
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).then(data => res.json(data))
        .catch(err => {
            console.log("error", err);
            res.json(err);
          });
    });  
    // catchall on the "/"
    app.get("*", (req, res) => {
        res.redirect("/");
    });
};