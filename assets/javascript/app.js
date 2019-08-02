/**
 * JavaScript file for Project 1 website
 * @author Max Coursey, Will White, Arianna Sanson
 * 
 */

//File submission changes
let file = document.getElementById("fileInput");
let picture

$("#fileInput").change ( function (e) {
    //console.log(e.target.files[0])
    $("#pictureSubmit").on("click", function () { submitPicture(e.target.files[0]) })
    previewFile()});



function previewFile(){
    var preview = document.querySelector('img'); 
    var file    = document.querySelector('input[type=file]').files[0]; 
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
        //console.log(reader.result) //logs img as url to console
        //$("#pictureSubmit").on("click", function () { submitPicture(reader.result) })
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }

};
//Merged these two submitPicture functions, didn't delete one b/c wasn't sure which one was needed
function submitPicture(picture) {
    //matt coming up with this. will nest once complete? Just console.logging picture name for now


    }
};
function submitPicture(picture) {   //TODO (MAX) - can we delete this entire function?
    //max coming up with this. will nest once complete? Just console.logging picture name for now

    console.log("picture submited")
    console.log(picture)
    document.getElementById("userPicture").src = picture;

}



//Face++ API query and array creation
let baseAlcohol; //base alcohol that will be included at the end of queryDrinkURL

const queryDrinkURL = "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + baseAlcohol;  //NOTE - the "1" is a temp developer key need to request new key if we publish to app store

const queryFaceURL = "https://api-us.faceplusplus.com/facepp/v3/detect/?"  //TODO not sure why this is not working right now - getting API NOT FOUND 404 error


let img_URL = "" //TODO temp variable for file upload URL if needed
let imgFile = "" //TODO temp file name of uploaded image


//intial call to cocktail DB--RIGHT NOW ONLY CONSOLE LOGS FIRST COCKTAIL FROM DEFINED DRINK
$.ajax({
    url: queryDrinkURL,
    method: "GET",
    headers: {
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        "X-RapidAPI-Key": "d1d151fcf6msha9240c9ffb25a4bp14a1ddjsn58db10897e38"
    }
}).then(function (response) {
    //console.log(response.drinks[0].strDrink);
});


/**
 * Takes image file with metadata and uploads to Face++ API - and process results into a sorted array
 * @param {*} inputFile 
 * @return sortedEmotion array of key value pairs "emotion: [1 - 100]"
 */

//-------------TEST CODE--------------------//
// $("#file").change(function (e) {
//     const inputFile = e.target.files[0];
//     console.log(inputFile);
//     submitPicture(inputFile);
// });
//-------------TEST CODE--------------------//

function submitPicture(inputFile) {
var form = new FormData();
    form.append("api_key", "5WD1Tc70yflyZBAXRMHZzg1p6lUF0Nbm");
    form.append("api_secret", "RvXCsEc7vf6xZFr-q1h1KH_F0hJ9vKzm");
    //form.append("image_url", "https://images-na.ssl-images-amazon.com/images/I/61Wo915nuTL._SL1000_.jpg");
    form.append("image_file", inputFile);
    form.append("return_attributes", "emotion");
// form.append("return_attributes", "gender"); //API seems to only take one attribute section as an input

var settings = {
    "url": "https://api-us.faceplusplus.com/facepp/v3/detect",
    "method": "POST",
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
}
    sortedEmotions.sort(function (a, b) {
        return b[1] - a[1];
    });

    //console.log(sortedEmotions);
    //console.log("Primary: " + sortedEmotions[0][0] + ": " + sortedEmotions[0][1]);
    //console.log("Secondary: " + sortedEmotions[1][0] + ": " + sortedEmotions[1][1]);


$.ajax(settings).done(function (response) {
    const face = JSON.parse(response);
    const tempFace = JSON.parse(response);
    const emotions = face.faces[0].attributes.emotion;
    sortedEmotions = [];

    for (var type in emotions) {
        sortedEmotions.push([type, emotions[type]])
    }
    sortedEmotions.sort(function (a, b) {
        return b[1] - a[1];
    });

    console.log(sortedEmotions);
    console.log("Primary: " + sortedEmotions[0][0] + ": " + sortedEmotions[0][1]);
    console.log("Secondary: " + sortedEmotions[1][0] + ": " + sortedEmotions[1][1]);
    return sortedEmotions;
});
};

//emotionKey-object linking emotions to base alcohols

const emotionKey = {
    anger: "vodka",
    disgust: "wine",
    fear: "tequila",
    happiness: "rum",
    neutral: "gin",
    sadness:"whiskey",
    surprise: "champagne"
};




//on click function, triggers:reveals hidden cards with random drink choices based on base alcohols
$("#pictureSubmit").on("click",function(){
    //selected user emotions----will replace later with face API response
    let inputOne = $("#emotionOne").val();
    let inputTwo = $("#emotionTwo").val();
    let inputThree = $("#emotionThree").val();
    //title of cards is selected emotions
    $("#moodNamePrimary").text(inputOne);
    $("#moodName2").text(inputTwo);
    $("#moodName3").text(inputThree);

    //baseAlcohols declared--- will be replaced later with link between returned emotions and base alcohols
    let baseAlcohol1 = emotionKey[$('#emotionOne').val()];
    let baseAlcohol2 = emotionKey[$("#emotionTwo").val()];
    let baseAlcohol3 = emotionKey[$("#emotionThree").val()];

    //must have three different cocktail API queries for each base alcohol
    const queryDrinkURL1 = "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + baseAlcohol1;  
    const queryDrinkURL2 = "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + baseAlcohol2;
    const queryDrinkURL3 = "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + baseAlcohol3;
    
    //ajax query for random drinks for primary mood
        $.ajax({
            url: queryDrinkURL1,
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
                "X-RapidAPI-Key": "d1d151fcf6msha9240c9ffb25a4bp14a1ddjsn58db10897e38"
            }
        }).then(function (response) {
           //variables for random drink one
           let testDrink1 = response.drinks[Math.floor(Math.random() * ((response.drinks.length-1) - 0 + 1) ) + 0];
           let testDrinkImg = testDrink1.strDrinkThumb;
           let imgLocation = $("<img>").attr("src",testDrinkImg)
            //variables for random drink two
           let testDrink2 = response.drinks[Math.floor(Math.random() * ((response.drinks.length-1) - 0 + 1) ) + 0];
           let testDrinkImg2 = testDrink2.strDrinkThumb;
           let imgLocation2 = $("<img>").attr("src",testDrinkImg2)
            //variables for random drink three
           let testDrink3 = response.drinks[Math.floor(Math.random() * ((response.drinks.length-1) - 0 + 1) ) + 0];
           let testDrinkImg3 = testDrink3.strDrinkThumb;
           let imgLocation3 = $("<img>").attr("src",testDrinkImg3)
            //random drink one to DOM
            $("#drinkOneRandOne").text(testDrink1.strDrink);
            $("#drinkOneRandOne").append(imgLocation);
            //random drink two to DOM
            $("#drinkOneRandTwo").text(testDrink2.strDrink);
            $("#drinkOneRandTwo").append(imgLocation2);
            //random drink three to DOM
            $("#drinkOneRandThree").text(testDrink3.strDrink);
            $("#drinkOneRandThree").append(imgLocation3);
        });

        //ajax query for drinks for secondary mood
        $.ajax({
            url: queryDrinkURL2,
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
                "X-RapidAPI-Key": "d1d151fcf6msha9240c9ffb25a4bp14a1ddjsn58db10897e38"
            }
        }).then(function (response) {
           
            //variables for random drink one
           let testDrink1 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg = testDrink1.strDrinkThumb;
           let imgLocation = $("<img>").attr("src",testDrinkImg)
            //variables for random drink two
           let testDrink2 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg2 = testDrink2.strDrinkThumb;
           let imgLocation2 = $("<img>").attr("src",testDrinkImg2)
            //variables for random drink three
           let testDrink3 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg3 = testDrink3.strDrinkThumb;
           let imgLocation3 = $("<img>").attr("src",testDrinkImg3)
            //random drink one to DOM
            $("#drinkTwoRandOne").text(testDrink1.strDrink);
            $("#drinkTwoRandOne").append(imgLocation);
            //random drink two to DOM
            $("#drinkTwoRandTwo").text(testDrink2.strDrink);
            $("#drinkTwoRandTwo").append(imgLocation2);
            //random drink three to DOM
            $("#drinkTwoRandThree").text(testDrink3.strDrink);
            $("#drinkTwoRandThree").append(imgLocation3);

        });

        //ajax query for random drink for third mood
        $.ajax({
            url: queryDrinkURL3,
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
                "X-RapidAPI-Key": "d1d151fcf6msha9240c9ffb25a4bp14a1ddjsn58db10897e38"
            }
        }).then(function (response) {
           
             //variables for random drink one
           let testDrink1 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg = testDrink1.strDrinkThumb;
           let imgLocation = $("<img>").attr("src",testDrinkImg)
            //variables for random drink two
           let testDrink2 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg2 = testDrink2.strDrinkThumb;
           let imgLocation2 = $("<img>").attr("src",testDrinkImg2)
            //variables for random drink three
           let testDrink3 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg3 = testDrink3.strDrinkThumb;
           let imgLocation3 = $("<img>").attr("src",testDrinkImg3)
            //random drink one to DOM
            $("#drinkThreeRandOne").text(testDrink1.strDrink);
            $("#drinkThreeRandOne").append(imgLocation);
            //random drink two to DOM
            $("#drinkThreeRandTwo").text(testDrink2.strDrink);
            $("#drinkThreeRandTwo").append(imgLocation2);
            //random drink three to DOM
            $("#drinkThreeRandThree").text(testDrink3.strDrink);
            $("#drinkThreeRandThree").append(imgLocation3);

        });
        
    //reveals hidden cards with above information
    $(".d-none").removeClass("d-none");


//Javascript for smooth-scroll 
$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                    };
                });
            }
        }
    });

});







