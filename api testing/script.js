

function searchForSneakers(shoe){

    var APIkey = "bcd3169b-4e47-4e30-af8c-602d1c987678"
    var queryUrl = "https://api.thesneakerdatabase.com/v1/sneakers?limit=10";
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function( response){
        console.log(response);

        var title = $("<h2>").text(response.title)
        var shoe = $("<h1>").text(response.shoe)
        var name = $("<h2>").text(response.name)
        var brand = $("<h2>").text(response.brand);
        var colorway = $("<h2>").text(response.colorway).append(artistName);
        var image = $("<img>").attr("src", response.media);
        var id = $("<h2>").text(response.id);
        var releaseDate = $("<h2>").text(response.releaseDate);
        var retail = $("<h2>").text(response.retailPrice);
        var styleId = $("<h2>").text(response.styleId)
        var year = $("<h2>").text(response.year);

        $("#shoe show-er").append(title, shoe, name, brand, colorway, id, image, releaseDate, retail, styleId, year )
    });
}


    $("#selectShoe").on("click", function(event){
        event.preventDefault();
        var inputShoe = $("#sneakerSeach").val().trim();
        console.log(response)
        searchForSneakers(inputShoe);
    });



// var queryUrl =  "api.thesneakerdatabase.com";
//     $.ajax({
//         url: queryUrl,
//         method: "GET",
//     }).then(function( response){
//         console.log(response);

//     })

//   var apiKey = "GJGTS1LAlgCHmfh3IpEHsaT0oIk7YvrA";
 
//     console.log(queryUrl);

//     $.ajax({
//       url: queryUrl,
//       method: "GET",
//     }).then(function(response) {
//       console.log(response);
//       //Grab each state area in index.html that we will be putting state data
//       var stateSelectedEl = $("#stateSelected");
//       var positiveIncreaseEl = $("#positiveIncrease");
//       var hospitalizeIncreaseEl = $("#hospitalizeIncrease");
//       var totalPosCasesEl = $("#totalPosCases");
//       var currentOnVentilatorEl = $("#currentOnVentilator");
//       var confirmedDeathsEl = $("#confirmedDeaths")
