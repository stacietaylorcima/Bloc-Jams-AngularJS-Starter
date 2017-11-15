(function() {
	function SongPlayer() {
		var SongPlayer = {};
		var currentSong = null;

		/**
	  * @desc Buzz object audio file
	  * @type {Object}
	  */
    var currentBuzzObject = null;

		/**
		 * @function setSong
		 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
		 * @param {Object} song
		*/
    var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				currentSong.playing = null;
			}
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			currentSong = song;
		};

		/**
		 * @function playSong
		 * @desc Plays the currentBuzzObject and sets the value of the song's playing property to true
		 * @param {Object} song
		 */
		var playSong = function(song){
			currentBuzzObject.play();
			song.playing = true;
		};

	/**
	 * @function SongPlayer.play
	 * @desc Public method.
	 * If the currentSong is not the same as the song parameter that is passed through, the newly selected song will play.
	 * If the currentSong is the same song parameter that is passed through AND that song is paused, play that song.
	 * @param {Object} song
	*/
  SongPlayer.play = function(song) {
		if (SongPlayer.currentSong !== song) {
			setSong(song);
			playSong(song);
  		} else if (SongPlayer.currentSong === song) {
  			if (currentBuzzObject.isPaused()) {
  				currentBuzzObject.play();
  			}
  		}
  	};

		/**
		 * @function SongPlayer.pause
		 * @desc Pauses the currentBuzzObject and sets the value of the song's playing property to false
		 * @param {Object} song
		*/
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

  	return SongPlayer;
	}



  angular.module('blocJams').factory('SongPlayer', SongPlayer);
})();
