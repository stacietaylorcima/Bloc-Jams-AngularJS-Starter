(function() {
  function SongPlayer() {
    var SongPlayer = {};

    var currentSong = null;
    var currentBuzzObject = null;

    SongPlayer.play = function(song) {

      if (currentSong !== song) {
           if (currentBuzzObject) {
               currentBuzzObject.stop();
           } else if (currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
         }
     }

     currentBuzzObject = new buzz.sound(song.audioUrl, {
<<<<<<< HEAD
       formats: ['mp3'],
       preload: true
   });
=======
        formats: ['mp3'],
        preload: true
      });
>>>>>>> 82514a40cff586867a241e34f32fa88de68c71d2

      currentSong = song;

      currentBuzzObject.play();
    };
<<<<<<< HEAD
}
=======

>>>>>>> 82514a40cff586867a241e34f32fa88de68c71d2
    return SongPlayer;
  }

  angular
  .module('blocJams')
  .factory('SongPlayer', SongPlayer);
<<<<<<< HEAD
})();
=======
}();
>>>>>>> 82514a40cff586867a241e34f32fa88de68c71d2
