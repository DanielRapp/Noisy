(function($){
	// This function adds noise to the background-image attribute of a given element
	$.fn.noisy = function(options) {
		options = $.extend({}, $.fn.noisy.defaults, options);
		
		var canvas = document.createElement('canvas');
		if (!!canvas.getContext) {
			canvas.width = canvas.height = options.size;
		
			var ctx = canvas.getContext('2d'),
			    imgData = ctx.createImageData(canvas.width, canvas.height),
			    numPixels = options.intensity * Math.pow(options.size, 2),
			    maxAlpha = 255 * options.opacity;
		}
		
		var rand = function(max) {
			return Math.floor(Math.random()*max);
		};
		
		return this.each(function() {
	 		// Use fallback image if canvas isn't supported
	 		if (!canvas.getContext) {
	 			if ((options.fallback !== undefined) && (options.fallback !== '')) {
	 				$(this).css('background-image', 
	 					'url(' + options.fallback + '),' + 
	 					$(this).css('background-image'));
	 			}
	 			return;
	 		}

	 		// Add pixels at random positions to the canvas
	 		while (numPixels--) {
	 			var x = rand(canvas.width),
	 			    y = rand(canvas.height),
	 			    index = (x + y * imgData.width) * 4;
	 			
	 			var randColorChannel = rand(255);
	 			imgData.data[index  ] = randColorChannel;                                        // red
	 			imgData.data[index+1] = options.monochrome ? randColorChannel : rand(255);       // green
	 			imgData.data[index+2] = options.monochrome ? randColorChannel : rand(255);       // blue
	 			imgData.data[index+3] = rand(maxAlpha);                                          // alpha
	 		}
	 		ctx.putImageData(imgData, 0, 0);
	 		
	 		if ($(this).data('original-css') == undefined) {
	 			$(this).data('original-css', $(this).css('background-image'));
	 		};
	 		$(this).css('background-image', 
	 			'url(' + canvas.toDataURL('image/png') + '),' + 
	 			$(this).data('original-css'));
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