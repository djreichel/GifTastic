//  alert("animals");

var topics = ["dogs", "cats", "fish", "birds", "squirrels", "rabbits", "ferrets", "chipmunks", "hamsters", "gerbils", "spiders", "monkees", "elephants", "rhinos"];

    // // Function for displaying animal buttons from array
    // function renderButtons() {
      $(document).ready(function() {
        for (var i = 0; i < topics.length; i++) {
            $("#animal-buttons").append("<button type='button' onclick='searchGif(\"" + topics[i] + "\")' class='btn btn-primary' value=' " + topics[i] + "'> " + topics[i] + " </button>");
              //"<button type='button' onclick='searchGif(\"" + topics[i] + "\")' class='btn btn-primary' value=' " + topics[i] + "'> " + topics[i] + " </button>");
        }
    });
  //finction to display gifs to match clicked animal button
  function animalButtonClicked() {
      var userInput = $("#animal-buttons").val();
      searchGif(userInput);
  }
  //finction to create new animal button
  function submitButtonClicked() {
      var userInput = $('#animal-input').val();
  
      if (userInput) {
          $('#animal-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
      }
  }

    // Adding click event listener to all buttons
    $("button").on("click", function() {

        // Keeps page from reloading //
        event.preventDefault();

        // Grabbing and storing the data-animal property value from the button
        var animal = $(this).attr("data-animal");

        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=EfSiXFeSa9QWCkmrO5pS1A8YDhVkLhvm&limit=10";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(queryURL);
                console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(animalDiv);

          };
        });
        //  this function pauses and restarts the animation - THIS PAUSE ISN'T WORKING - The console log works & the alert works after two clicks
        $("#gifs-appear-here").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
              console.log("static");
              alert("static");
            }
          });

    });