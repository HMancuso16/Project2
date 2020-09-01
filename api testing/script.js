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

function buildQueryURL() {
  var name = $("#name").val().trim();
  var gender = $("#gender").val().trim();

  var queryParams = $("#shoe-count").val().trim();

  var releaseDate = $("#release-year").val().trim();

  var brand = $("#brand").val().trim();

  // var colorway = $("#color").val().trim();

  if (parseInt(releaseDate)) {
    queryParams.releaseDate = releaseDate;
  }

  // var API = {"api-key":  "bcd3169b-4e47-4e30-af8c-602d1c987678"};
  var queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}`;

  switch (queryURL) {
    case "name":
      return (queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}&name=${name}`);
      break;

    case "releaseDate":
      return (queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}&releaseYear=${releaseDate}`);
      break;

    case "releaseDate" && "name":
      return (queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}&releaseYear=${releaseDate}&name=${name}`);
      break;
  }

  // logging our URL so we can troubleshoot with it
  console.log("---------------\nURL: " + queryURL + "\n---------------");
  console.log(queryURL);
  return queryURL;
}

// update our page with results
function updatePage(shoeData) {
  var numShoes = $("#shoe-count").val();

  console.log(shoeData);
  console.log("------------------------------------");

  for (var i = 0; i < numShoes; i++) {
    console.log(numShoes);
    // Get specific article info for current index
    var shoe = shoeData.results[i];

    // Increase the articleCount (track article # - starting at 1)
    var shoeCount = i + 1;

    // Create the  list group to contain the articles and add the article content for each
    var $shoeList = $("<ul>");
    $shoeList.addClass("list-group");

    // Add the newly created element to the DOM
    $("#shoeList").append($shoeList);

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
     
    var title = shoe.title;

    if (title) {
      console.log(title);
      $shoeListItem.append("<h5>" + title + "</h5>");
    }

    var name = shoe.name;

    if(name) {
        $shoeListItem.append("<h5>" + name + "</h5>")
    }

    var image = shoe.media;
    if(image) {
        $shoeListItem.append("<i>"+ image +"</i>")
    }
    var brand = shoe.brand;

    if (brand) {
      console.log(brand);
      $shoeListItem.append("<h5>" + brand + "</h5>");
    }

    // Log gender, and append to document if exists
    var gender = shoe.gender;
    // console.log(shoe.gender);
    if (gender) {
      $shoeListItem.append("<h5>" + gender + "</h5>");
    }

    var color = shoe.colorway;
    if(color) {
        $shoeListItem.append("<h5>" + color + "</h5>")
    }

    // Log release Year, and append to document if exists
    var releaseDate = shoe.releaseDate;
    //   console.log(shoe.releaseDate);
    if (releaseDate) {
      $shoeListItem.append("<h5> " + releaseDate + "</h5>");
    }


    // Append and log retailPrice
    var retailPrice = shoe.retailPrice;
    $shoeListItem.append("<h5>" + retailPrice + "</h5>");
    //   console.log(shoe.retailPrice);

    // Append the article
    $shoeList.append($shoeListItem);
  }
}

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}
// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
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
    method: "GET",
    //   data: {
    //     limit: queryParams,
    //     releaseYear: releaseDate,
    //     name: name,
    //     brand: brand,
    //     gender: gender,
    //     colorway: colorway,

    //   },
  }).then(updatePage);
});

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
