# Bloc Jams Music Player

![Bloc Jams Album View](https://i.imgur.com/LTHGkSm.png)

## What is it?

Bloc Jams is a streaming music player with media queries to determine the viewer's display dimensions and a responsive, grid-based user interface to provide an optimized look for various viewing device display sizes.

**Home Page:**
* The home page features text shadowing and CSS transition animations for a (literally) moving user experience.
* Graphics from the Ionicons font library are also used here for the musical notes, radio wave, and mobile device images.

**Collection Page:**
* Accessed via the link in the upper right corner of the home page, the collection presents a set of albums.
* Each album reference includes artist, album title, song count, and album art. Selecting an album loads the album page.
* _(At this time all entries are duplicates of a single album.)_

**Album Page:**
* The Album Page includes album data from the Collection page, plus a track list with track number, title, and duration.
* A player control with play/pause, track back, track forward, and sliders for controlling the position of the currently playing track and the volume level appears at the bottom in a semi-transparent overlay.
* Hovering over a track number causes a play icon to appear in the track number's place and a pause button appears in the same position for the currently playing track.
* The Buzz audio library is used to load, play, and present representations of meta data for audio files.

## What I Learned

**Languages/Frameworks/Libraries/Tools:**
* HTML
* CSS
* Javascript
* AngularJS
* jQuery
* NodeJS
* Buzz Audio Library (buzz.jaysalvat.com)

**Other resources:**
* Google Fonts 'Open Sans'
* Icons from Ionic (ionicframework.com)

**Learned:**
* Bootstrap Angular to an application and create an Angular module.
* Configure routing and states for an application.
* Implement controllers for an application's views.
* Create a service that controls song playback.
* Write a custom directive that controls song and volume sliders.
* Create a custom timecode filter.
