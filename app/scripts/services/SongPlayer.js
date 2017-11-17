(function() {
	function SongPlayer(Fixtures) {
		var SongPlayer = {};

		/**
		* @desc variable that uses the getAlbum() method of the Fixtures service to store the album information
		* @type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();


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
				SongPlayer.currentSong.playing = null;
			}
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			SongPlayer.currentSong = song;
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
		* @desc function that gets the index of the song
		* @type {Object}
		*/
		var getSongIndex = function(song) {
		return currentAlbum.songs.indexOf(song);
		};

		/**
	  * @desc Active song object from list of songs is public so that we can access the currentSong from the PlayerBarCtrl
	  * @type {Object}
	  */
		SongPlayer.currentSong = null;

	/**
	 * @function SongPlayer.play
	 * @desc Public method.
	 * If the currentSong is not the same as the song parameter that is passed through, the newly selected song will play.
	 * If the currentSong is the same song parameter that is passed through AND that song is paused, play that song.
	 * @param {Object} song
	*/
  SongPlayer.play = function(song) {
		song = song || SongPlayer.currentSong;
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
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
      SongPlayer.currentSong.playing = false;
    };

  	return SongPlayer;
	}

	/**
	 * @function SongPlayer.previous
	 * @desc Public method. Gets index of the current playing song and subtracts 1 to find the index of the previous song
	 * @param {Object} song
	*/
	SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

		if (currentSongIndex < 0) {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
		} else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
      }
	};

  angular
		.module('blocJams')
			.factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
