

// function searchForSneakers(shoe){

//     var APIkey = "bcd3169b-4e47-4e30-af8c-602d1c987678"
//     var queryUrl = "https://api.thesneakerdatabase.com/v1/sneakers?limit=10";
//     $.ajax({
//         url: queryUrl,
//         method: "GET",
//     }).then(function( response){
//         console.log(response);

//         var title = $("<h2>").text(response.title)
//         var shoe = $("<h1>").text(response.shoe)
//         var name = $("<h2>").text(response.name)
//         var brand = $("<h2>").text(response.brand);
//         var colorway = $("<h2>").text(response.colorway);
//         var image = $("<img>").attr("src", response.media);
//         var id = $("<h2>").text(response.id);
//         var releaseDate = $("<h2>").text(response.releaseDate);
//         var retail = $("<h2>").text(response.retailPrice);
//         var styleId = $("<h2>").text(response.styleId)
//         var year = $("<h2>").text(response.year);

//         $("#shoe show-er").append(title, shoe, name, brand, colorway, id, image, releaseDate, retail, styleId, year )
//     });
// }
//     $("#selectShoe").on("click", function(event){
//         event.preventDefault();
//         var inputShoe = $("#sneakerSearch").val().trim();
        
//         searchForSneakers(inputShoe);
//     });


function buildQueryURL(){

    var select = $("#shoe-count").val().trim()

    var API = {"api-key":  "bcd3169b-4e47-4e30-af8c-602d1c987678"};
    var queryURL = "https://api.thesneakerdatabase.com/v1/sneakers?limt=10"  ;

    // Set the API key
    // var queryParams = 
    
  // Grab text the user typed into the search input, add to the queryParams object
    queryParams = $("#search-term").val().trim();

    
  // If the user provides a releaseDate, include it in the queryParams object
    var releaseDate = $("#release-year").val().trim();

    if (parseInt(releaseDate)) {
        queryParams.releaseDate = releaseDate
    }

  
     
    // logging our URL so we can troubleshoot with it 
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
}

// update our page with results
function updatePage(shoeData) {
    var numShoes = $("#shoe-count").val();

    console.log(shoeData);
    console.log("------------------------------------");


    for (var i = 0; i < numShoes; i++) {
        // Get specific article info for current index
        var shoe = shoeData.response.docs[i];
    
        // Increase the articleCount (track article # - starting at 1)
        var shoeCount = i + 1;
    
        // Create the  list group to contain the articles and add the article content for each
        var $shoeList = $("<ul>");
        $shoeList.addClass("list-group");
    
        // Add the newly created element to the DOM
        $("#shoe-section").append($shoeList);
    
        // If the article has a headline, log and append to $articleList
        var headline = shoe.title;
        var $shoeListItem = $("<li class='list-group-item shoeHeadline'>");
    
        if (headline && headline.main) {
          console.log(headline.main);
          $shoeListItem.append(
            "<span class='label label-primary'>" +
              shoeCount +
              "</span>" +
              "<strong> " +
              headline.main +
              "</strong>"
          );
        }
        
    // If the article has a brandline, log and append to $articleList
    var brandline = shoe.brand;

    if (brandline && brandline.original) {
      console.log(brandline.original);
      $shoeListItem.append("<h5>" + brandline.original + "</h5>");
    }

      // Log release Year, and append to document if exists
      var section = shoe.releaseDate;
      console.log(shoe.releaseDate);
      if (section) {
        $shoeListItem.append("<h5>Section: " + section + "</h5>");
      }

       // Log gender, and append to document if exists
    var gender = shoe.gender;
    console.log(shoe.gender);
    if (gender) {
      $shoeListItem.append("<h5>" + shoe.gender + "</h5>");
    }
  
      // Append and log retailPrice
      var retailPrice = shoe.retailPrice
      $shoeListItem.append("<h5>" + retailPrice + "</h5>");
      console.log(shoe.retailPrice);
  
      // Append the article
      $articleList.append($shoeListItem);
    }
}


// Function to empty out the articles
function clear() {
    $("#article-section").empty();
  }
      // CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
  
    // Empty the region associated with the articles
    clear();
  
    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL();
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);
  });
  
  //  .on("click") function associated with the clear button
  $("#clear-all").on("click", clear);
  




