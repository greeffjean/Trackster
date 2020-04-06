
/* Global Variables */
var Trackster = {};
const API_KEY = '336a3737af9be634072f5a4c03d2c607';

/* Defualt Data Home Page */
$(window).on("load", function(){
  Trackster.searchTracksByTitle("micheal jackson");
})

/*OnCLick Search Funtion*/
$(document).ready(function () {
  $('#search-button').click(function () {
    Trackster.searchTracksByTitle($('#search-input').val());
  });
});

/*Render Track Data Function*/
Trackster.renderTracks = function (tracks) {
  /* function variable  */
  var $trackList = $('#track-list');
  /* new track */
  $trackList.empty();

  /* html structure */
  for (var trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
    var track = tracks[trackIndex];
    var mediumAlbumArt = track.image[1]["#text"];
    var htmlTrackRow =
      '<div class="row track">' +
      '  <div class="col-xs-1 col-xs-offset-1 play-button">' +
      '    <a href="' + track.url + '" target="_blank">' +
      '      <i class="fa fa-play-circle-o fa-2x"></i>' +
      '    </a>' +
      '  </div>' +
      '  <div class="col-xs-4">' + track.name + '</div>' +
      '  <div class="col-xs-2">' + track.artist + '</div>' +
      '  <div class="col-xs-2"><img src="' + mediumAlbumArt + '"/></div>' +
      '  <div class="col-xs-2">' + track.listeners + '</div>' +
      '</div>';

    /* append html to DOM */
    $trackList.append(htmlTrackRow);
  }
};

/* Fetch Data */
Trackster.searchTracksByTitle = function (title) {
  $.ajax({
    url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
    success: function (response) {
      Trackster.renderTracks(response.results.trackmatches.track);
    }
  });
};
