( function() {
	function seekBar( $document ) {
		/**
		 * @function calculatePercent
		 * @desc Calculates the horizontal percent along the seek bar where the event (passed in from the view as $event) occurred.
		 * @param {Object} seekBar & {Event} on click
		 */
		var calculatePercent = function( seekBar, event ) {
			var offsetX = event.pageX - seekBar.offset().left;
			var seekBarWidth = seekBar.width();
			var offsetXPercent = offsetX / seekBarWidth;
			offsetXPercent = Math.max( 0, offsetXPercent );
			offsetXPercent = Math.min( 1, offsetXPercent );
			return offsetXPercent;
		};
		return {
			templateUrl: '/templates/directives/seek_bar.html',
			/** @desc replace: true, instructs Angular to completely replace the <seek-bar> element with the directive's HTML template rather than insert the HTML between the  <seek-bar></seek-bar> tags*/
			replace: true,
			/** @desc restrict 'E', instructs Angular to treat this directive as an element. For example, Angular will run the code if it finds <seek-bar> in the HTML, but not if it finds <div seek-bar>*/
			restrict: 'E',
			/** @desc scope {}, specifies that a new scope will be creaated for this specific directive. An isolate-scope allows us to bind functions from the directive's VIEW to it's SCOPE.*/
			scope: {
				onChange: '&'
			},
			/**
			 * @function link
			 * @desc Responsible for registering DOM listeners and updating the DOM. This is where most of the directives logic will live.
			 * @param The link function's arguments are strictly ordered - do not change order.
			 *    The link method's first argument is its scope object. Attributes and methods on the scope object are accessible within the directive's view.
			 *    The second argument is the jqLite-wrapped element that the directive matches.
			 *    The third argument is a hash of attributes with which the directive was declared. If we declare <seek-bar> with no attributes in the HTML, then this hash will be empty.
			 */
			link: function( scope, element, attributes ) {
				/** @desc Holds the value of the seek bar, such as the currently playing song time or the current volume. Default value is 0.*/
				scope.value = 0;
				/** @desc Holds the maximum value of the song and volume seek bars. Default value is 100.*/
				scope.max = 100;
				/** @desc Holds the element that matches the directive (<seek-bar>) as a jQuery object so we can call jQuery methods on it.*/
				var seekBar = $( element );
				/** @desc This code observes the value of the 'scope.value' that has been declared in player_bar.html by specifying the attribute name (value) in the 1st argument. When the observed attribute is set or changed, we execute a callback function (2nd argument) that sets a new value (newValue) for the scope.value attribute.*/
				attributes.$observe('value', function(newValue) {
			    scope.value = newValue;
			  });
				/** @desc This code observes the value of the 'scope.max' that has been declared in player_bar.html by specifying the attribute name (max) in the 1st argument. When the observed attribute is set or changed, we execute a callback function (2nd argument) that sets a new value (newValue) for the scope.max attribute.*/
			  attributes.$observe('max', function(newValue) {
			    scope.max = newValue;
			  });

				/** @desc A function that calculates a percent based on the value and maximum value of a seek bar.*/
				var percentString = function() {
					var value = scope.value;
					var max = scope.max;
					var percent = value / max * 100;
					return percent + "%";
				};
				/**
				 * @function scope.fillStyle
				 * @desc Returns the width of the seek bar fill element based on the calculated percent.
				 * */
				scope.fillStyle = function() {
					return {
						width: percentString()
					};
				};
				/**
				 * @function scope.thumbStyle
				 * @desc Returns the postiion of the thumb element on the seek bar based on the calculated percent.
				 * */
				scope.thumbStyle = function() {
					return {
						left: percentString()
					};
				};
				/**
				 * @function scope.onClickSeekBar
				 * @desc Updates the seek bar value based on the seek bar's width and the location of the user's click on the seek bar.
				 * */
				scope.onClickSeekBar = function( event ) {
					var percent = calculatePercent( seekBar, event );
					scope.value = percent * scope.max;
					notifyOnChange(scope.value);
				};
				/**
				 * @function scope.trackThumb
				 * @desc Updates the seek bar value based on the location of the user's click on the seek bar. Then uses $apply to constantly apply the change in value of scope.value as the user drags the seek bar thumb.
				 * */
				scope.trackThumb = function() {
					$document.bind( 'mousemove.thumb', function( event ) {
						var percent = calculatePercent( seekBar, event );
						scope.$apply( function() {
							scope.value = percent * scope.max;
							notifyOnChange(scope.value);
						} );
					} );

					$document.bind( 'mouseup.thumb', function() {
						$document.unbind( 'mousemove.thumb' );
						$document.unbind( 'mouseup.thumb' );
					} );
				};

				var notifyOnChange = function(newValue) {
     			if (typeof scope.onChange === 'function') {
         	scope.onChange({value: newValue});
     			}
 				};
			}
		};
	}
	angular.module( 'blocJams' ).directive( 'seekBar', [ '$document', seekBar ] );
} )();
