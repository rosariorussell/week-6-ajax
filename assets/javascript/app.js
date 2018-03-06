$(document).ready(function () {

    var topics = ["Horse", "Cat", "Dog", "Mouse"];

    function displayInfo() {
        var animal = $(this).attr("animal-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=h4IHLFTGkOeLSia4l5Lj33ka5x8H90S1&q=" + animal + "&limit=10";

        //use AJAX to GET information on animal button clicked

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            //empty animals div so new selection appends to emtpy div - do not want previous searches listed

            $("#animals").empty();

            var results = response.data;

            //user for loop to grab the rating information and appropriate gif for button clicked into its own div to keep information together

            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div class='userAnimal'>");

                //make variable for rating for clean appending

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                //make variables for still url and animated url for clean build

                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;

                //gif needs still source to load, and data attributes to store the still and animated gifs for pausing function

                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

                //append the gif and rating to the new div created during for loop

                animalDiv.append(gif);
                animalDiv.append(pRate);

                //append all for loop created divs to the DOM

                $("#animalImages").prepend(animalDiv);
            }

            //on click of gif still image, gif will play. When clicked again, gif will pause.

            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }

    //create buttons out of array indexes - gets information from JSON

    function renderButtons() {

        //delete original array of buttons everytime renders so they do not keep repeating

        $("#animalButtons").empty();

        //loop through array

        for (var i = 0; i < topics.length; i++) {

            var animalRender = $("<button>");

            //add class and attribute of name so display function knows what to GET.

            animalRender.addClass("animal");
            animalRender.attr("animal-name", topics[i]);
            animalRender.text(topics[i]);
            $("#animalButtons").append(animalRender);
        }
    }

    //on click event to add an additional animal button when submitted - push input to array.

    $("#addAnimal").on("click", function (event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();

        //push input to original topics array and then rerun render of buttons to show newly added button.
        topics.push(animal);
        $("#animal-input").val(" ");
        renderButtons();
    });


    //on click entire document to cover all elements named "animal" and run display function
    $(document).on("click", ".animal", displayInfo);

    //run function to display all buttons on startup
    renderButtons();
})