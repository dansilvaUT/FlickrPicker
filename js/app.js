/*global $*/
$(document).ready(function() {


 $('form').submit(function (event) {
    // highlight the button
    // not AJAX, just cool looking
   event.preventDefault();
   let searchTag = $('#subject');
   const $submit = $('#submit');
   
   searchTag.prop("disabled", true);
   $submit.attr("disabled", true).val("Searching...");
    // the AJAX part
    let animal = searchTag.val();
    const flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    const flickrOptions = {
      tags: animal,
      format: "json"
    };
    function displayPhotos(data) {
      let photoHTML = '<ul>';
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="photo-element">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);
    searchTag.prop("disabled", false);
    $submit.attr("disabled", false).val("Search");

  }); // end click

}); // end ready