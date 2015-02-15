$(function(){

  var getData = function(keywords, callback) {
    var params = {
      api_key: "niqoyrl7dver15xzb6mp2c7e",
      includes: "Images,Shop"
    };

    if (!callback && typeof keywords === "function") {
      callback = keywords;
      keywords = null;
    }

    if (keywords && keywords.length) {
      params.keywords = keywords;
    }

    $.ajax("https://openapi.etsy.com/v2/listings/active.js", {
      data: params,
      dataType: "jsonp",
      success: callback
    });
  }; // Info from Assignment


  getData(function(data){
    var items = data.results;
    items.forEach(function(item){
      $(".products").append(productTemp(item));
    });
  });


  $(".search-form").on("submit", function(event) {
    event.preventDefault();
    
    var keywords = $(".search-field").val();  

    getData(keywords, function(data){
      var items = data.results;
      console.log(items);
        $(".products").empty();
      items.forEach(function(item){
        $(".products").append(productTemp(item));
      });
    });
  });

  var productTemp = _.template(
    "<div class='product rounded'>" +
      "<div class='image'>" +
        "<img src='<%= Images[0].url_570xN %>' alt='<%= title %>'>" +
      "</div>" +
      "<div class='title'><%= title %></div>" +
      "<div class='vendor'><%= Shop.shop_name %></div>" +
      "<div class='price'>$<%= price %> <%= currency_code %></div>" +
    "</div>"
  );

}); // end of function scope




