(function($){
	// This function adds noise to the background-image attribute of a given element
	$.fn.noisy = function(options) {
		return this.each(function() {
	 		var canvas = document.createElement('canvas'),
	 		    ctx = canvas.getContext("2d");
	 		
	 		// Use fallback image if canvas isn't supported
	 		if (!ctx && (options.fallback !== undefined) && (options.fallback !== '')) {
	 			$(this).css('background-image', 'url(' + options.fallback + ')');
	 			return;
	 		}
	 		
	 		options = $.extend({}, $.fn.noisy.defaults, options);
	 		
	 		canvas.width = canvas.height = options.size;
	 		var imgData = ctx.createImageData(canvas.width, canvas.height);
	 		
	 		var rand = function(min, max) {
	 			return Math.floor(Math.random()*(max-min)+min);
	 		};
	 		
	 		// Add pixels at random positions to the canvas
	 		for (var i = 0; i < options.intensity * Math.pow(options.size, 2); i++) {
	 			var x = rand(0, canvas.width),
	 			    y = rand(0, canvas.height),
	 			    index = (x + y * imgData.width) * 4;
	 			
	 			var randColorChannel = rand(0, 255);
	 			imgData.data[index  ] = randColorChannel;                                           // red
	 			imgData.data[index+1] = options.monochrome ? randColorChannel : rand(0, 255);       // green
	 			imgData.data[index+2] = options.monochrome ? randColorChannel : rand(0, 255);       // blue
	 			imgData.data[index+3] = rand(0, 255 * options.opacity);                             // alpha
	 		}
	 		ctx.putImageData(imgData, 0, 0);
	 		$(this).css('background-image', 'url(' + canvas.toDataURL('image/png') + ')');
		});
	};
	$.fn.noisy.defaults = {
		// How many percent of the image that is filled with noise, 
		//   represented by a number between 0 and 1 inclusive
		intensity:          0.9,
		
		// The width and height of the image in pixels
		size:               200,
		
		// The maximum noise particle opacity,
		//   represented by a number between 0 and 1 inclusive
		opacity:            0.08,
		
		// A string linking to the image used if there's no canvas support
		fallback:           '',
		
		// Specifies wheter the particles are grayscale or colorful
		monochrome:         false
	};
})(jQuery);