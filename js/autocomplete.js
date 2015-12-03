$(function() {
    var availableTags = [
      "Cars",
      "Football",
      "Video Games",
      "Travelling",
      "Cooking",
      "Programming"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  });