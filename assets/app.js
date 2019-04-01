// 1. Initialize Firebase

var config = {
    apiKey: "AIzaSyBCo7SVY1Q4GG99L6B2nHmqc9D04i08Sz0",
    authDomain: "train-project-82d8c.firebaseapp.com",
    databaseURL: "https://train-project-82d8c.firebaseio.com",
    projectId: "train-project-82d8c",
    storageBucket: "train-project-82d8c.appspot.com",
    messagingSenderId: "324736283059"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();
      
      var trainName = $("#train-input").val().trim();
      var trainDestiny = $("#destination-input").val().trim();
      var trainTime = $("#time-input").val().trim();
      var trainFrequency = $("#frequency-input").val().trim();

      var newTrain = {
        name: trainName,
        destination: trainDestiny,
        time: trainTime,
        frequency: trainFrequency,
      };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
    alert("New Train Added Successfully!")
    
    
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestiny = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestiny);
    console.log(trainTime);
    console.log(trainFrequency);

    var trainName = $("#train-input").val().trim();
    var trainDestiny = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    var prettyChoo = moment();
    var trainDifference = moment().diff(moment(trainTime), "minutes");
    var trainRemaining = trainDifference % trainFrequency;
      //var prettyChoo = moment.unix(trainTime).format("HH:mm");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestiny),
        $("<td>").text(trainFrequency),
        $("<td>").text(trainTime),
        $("<td>").text(prettyChoo),
      );
    
      // Append the new row to the table
      $("#train-track > tbody").append(newRow);
    });