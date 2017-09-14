/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBfrOTVt3aJQGG-HGrXVzu-K47uzqvTflc",
    authDomain: "firstfirebase-8b4e6.firebaseapp.com",
    databaseURL: "https://firstfirebase-8b4e6.firebaseio.com",
    projectId: "firstfirebase-8b4e6",
    storageBucket: "firstfirebase-8b4e6.appspot.com",
    messagingSenderId: "845087908146"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFirst = moment($("#first-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    first: trainFirst,
    frequency: trainFrequency,
    currentTime: moment().format("X")
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFrequency);

  // Prettify the employee start
  //var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  //var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  //console.log(empMonths);

  // Calculate the total billed rate
  //var empBilled = empMonths * empRate;
  //console.log(empBilled);

  // Add each train's data into the table

    var firstTimeConverted = moment.unix(trainFirst);
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted, "HH:mm"), "minutes");
    console.log(diffTime)
    // Time apart (remainder)
    var tRemainder = diffTime % parseInt(trainFrequency);
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = parseInt(trainFrequency) - tRemainder;
    console.log(tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    console.log("next Train" + nextTrain)



  $("#train-table > tbody").append("<tr class='" + childSnapshot.key + "'><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

function timeUpdater() {
  database.ref().once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      database.ref(child.key).update({
        currentTime: moment().format("X")
      })
    })
  })
}

setInterval(timeUpdater, 10000);

database.ref().on("child_changed", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFrequency);

  // Prettify the employee start
  //var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  //var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  //console.log(empMonths);

  // Calculate the total billed rate
  //var empBilled = empMonths * empRate;
  //console.log(empBilled);

  // Add each train's data into the table

    var firstTimeConverted = moment.unix(trainFirst);
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted, "HH:mm"), "minutes");
    console.log(diffTime)
    // Time apart (remainder)
    var tRemainder = diffTime % parseInt(trainFrequency);
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = parseInt(trainFrequency) - tRemainder;
    console.log(tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    console.log("next Train" + nextTrain)



  $("." + childSnapshot.key).html("<td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td>");
});



// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case