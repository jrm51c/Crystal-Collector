$(document).ready(function() {
  //==========================================
  // Declare global variables
  // Store number for player to guess
  var targetNumber = 0;
  // Store player score
  var totalScore = 0;
  var gameOver = false;
  //============================================
  // Declare functions
  // Generate a random target number for player to guess
  // Number must be between 19 - 120 Math.floor(Math.random() * max - min + 1)) + min
  // Display number on the page
  function targetNum() {
    targetNumber = Math.floor(Math.random() * (102) + 19);

    $("#number-to-guess").text(targetNumber);
  };
  targetNum();

  function crystalValues() {
    var crystals = $("#crystals");
    // Variable to hold players cumulative score
    //var totalScore = 0;
    // Array to hold crystal values
    var numberOptions = [];
    // Create 4 crystals each with their own unique number value
    // Values must be between 1 - 12
    // Push each random value generated into the numberOptions array
    for (var i = 0; i < 4; i++) {
      var number = Math.floor(Math.random() * (12) + 1);
      numberOptions.push(number);
    }
    // For loop to create a crystal for each number in the numberOptions array (4)
    for (var i = 0; i < numberOptions.length; i++) {
      // For each iteration, we will create an imageCrystal
      var imageCrystal = $("<img>");
      // First each crystal will be given the class ".crystal-image".
      // This will allow the CSS to take effect.
      imageCrystal.addClass("crystal-image");
      // Each imageCrystal will be given a src link to the crystal image
      imageCrystal.attr("src", "./assets/images/crystal" + i + ".jpg");
      // Add alt attribute in case image does not load
      imageCrystal.attr("alt", "image of crystals");
      // Each imageCrystal will be given a data attribute called data-crystalValue.
      // This data attribute will be set equal to the array value.
      imageCrystal.attr("data-crystalvalue", numberOptions[i]);
      // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
      //crystals.append(imageCrystal);
      crystals.append(imageCrystal);
      }
  }
  crystalValues();

  // Click event applies to every single crystal on the page. Not just one.
  $(".crystal-image").click(function() {
      if (!gameOver) {
          // Determining the crystal's value requires us to extract the value from the data attribute.
          // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
          // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
          // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
          var crystalValue = ($(this).attr("data-crystalvalue"));
          crystalValue = parseInt(crystalValue);
          // We then add the crystalValue to the players total score which is a global variable.
          // Every click, from every crystal adds to the total score
          totalScore += crystalValue;
          // All of the same game win-lose logic applies. So the rest remains unchanged.
          $("#total-score").text(totalScore);

          if (totalScore === targetNumber) {
            gameOver = true;
            $("#game-status").text("You win!!!!");
            //wait 5 seconds then  call function
            setTimeout(playAgain, 3000);
          } else if (totalScore > targetNumber) {
            gameOver = true;
            $("#game-status").text("You Lose!!!");
            //wait 5 seconds then  call function
            setTimeout(playAgain, 3000);
          }
      }
  });

  function playAgain()  {
    var confirmation = confirm("Would you like to play again?");
    if (confirmation === true) {
      //set target number to 0 and clear old target number from display
      targetNumber = 0;
      gameOver = false;
      $("#number-to-guess").text("");
      //set total score to 0 and clear total score from display
      totalScore = 0;
      $("#total-score").text("");
      //clear game status from display
      $("#game-status").text("");
      //call function to select target number
      targetNum();
      //call function to assign crystal values and present images
      crystalvalues();
    } else {
      //close window
      closeWindow();
    }
    /* Firefox workaround */
    function closeWindow() {
        window.open('','_parent','');
        window.close();
    }
  }
});