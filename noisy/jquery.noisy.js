(function($){
	// This function adds noise to the background-color attribute of an element
	$.fn.noisy = function(options) {
		return this.each(function() {
	 		var canvas = document.createElement('canvas'),
	 		    ctx = canvas.getContext("2d");
	 		
	 		options = $.extend({}, $.fn.noisy.defaults, options);
	 		
	 		// Use fallback image if canvas isn't supported
	 		if ((options.fallbackImage !== undefined) && !ctx) {
	 			$(this).css('background-image', options.fallbackImage);
	 			return;
	 		}
	 		
	 		canvas.width = canvas.height = options.tileSize;
	 		var imgData = ctx.createImageData(canvas.width, canvas.height);
	 		
	 		var rand = function(min, max) {
	 			return Math.floor(Math.random()*(max-min)+min);
	 		};
	 		
	 		// Add black and white pixels at random positions to the canvas
	 		for (var i = 0; i < options.noise * Math.pow(options.tileSize, 2); i++) {
	 			var x = rand(0, canvas.width),
	 			    y = rand(0, canvas.height),
	 			    index = (x + y * imgData.width) * 4;
	 			
	 			var randColorChannel = rand(0, 255);
	 			imgData.data[index  ] = randColorChannel;                                           // red
	 			imgData.data[index+1] = options.monochromatic ? randColorChannel : rand(0, 255);    // green
	 			imgData.data[index+2] = options.monochromatic ? randColorChannel : rand(0, 255);    // blue
	 			imgData.data[index+3] = rand(0, 255*options.maxNoiseOpacity);                       // alpha
	 		}
	 		
	 		ctx.putImageData(imgData, 0, 0);
	 		$(this).css('background', 'url(' + canvas.toDataURL('image/png') + ')' + options.backgroundColor);
		});
	};
	
	$.fn.noisy.defaults = {
		// How many percent of the image that is filled with noise, 
		//   represented by a number between 0 and 1 inclusive
		noise:              1,
		
		// The width and height of the background image in pixels
		tileSize:           200,
		
		// An empty string is transparent
		backgroundColor:    '',
		
		// The maximum noise particle opacity,
		//   represented by a number between 0 and 1 inclusive
		maxNoiseOpacity:    20/255,
		
		// A string linking to the image used if there's no canvas support
		fallbackImage:      undefined,
		
		// Specifies wheter the particles are grayscale or colorful
		monochromatic:      false
	};
})(jQuery);