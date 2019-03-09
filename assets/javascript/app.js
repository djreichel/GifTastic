//  alert("animals");

var topics = ["dogs", "cats", "fish", "birds", "squirrels", "rabbits", "ferrets", "chipmunks", "hamsters", "gerbils", "spiders", "monkees", "elephants", "rhinos"];

// Grabbing and storing the data-animal property value from the button
//var animal = $(this).attr("#animal-buttons");
// Constructing a queryURL using the animal names
//var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=EfSiXFeSa9QWCkmrO5pS1A8YDhVkLhvm&limit=10";

//function to create dynamic buttons from topics array
$(document).ready(function() {
    for (var i = 0; i < topics.length; i++) {
        $("#animal-buttons").append("<button type='button' onclick='searchGif(\"" + topics[i] + "\")' class='btn btn-primary' value=' " + topics[i] + "'> " + topics[i] + " </button>");
    }
});
//function to display gifs to match clicked animal button
function animalButtonClicked() {
    var userInput = $("#animal-buttons").val();
    searchGif(userInput);
    console.log(userInput);
    console.log(userInput);
}

function submitButtonClicked() {
    var userInput = $('#animal-input').val();

    if (userInput) {
        $('#animal-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
    console.log(userInput);
}

function searchGif(gifName) {
    $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=EfSiXFeSa9QWCkmrO5pS1A8YDhVkLhvm&limit=10",
            method: "GET"
        })
        .then(function(response) {
            displayGif(response); //displays the gifs
                console.log(queryURL);
                console.log(response);
                console.log("entered searchGif function");
        })
}

function displayGif(response) {
    $("#animals").empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            " ' data-still=' " + response.data[i].images.fixed_height_still.url +
            " ' data-animate=' " + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = "<div class='col-md-12'>" + image + "</div>";
        $("#animals").append(image);
        console.log("entered displayGif function");
    }

    $("#animals").on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}