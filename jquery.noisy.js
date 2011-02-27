(function($){
	// This function adds non-monochromatic noise to the background-color attribute of an element
	$.fn.noisy = function(options) {
		return this.each(function() {
	 		var canvas = document.createElement('canvas'),
	 		    ctx = canvas.getContext("2d");
	 		
	 		var defaults = {
	 			noiseParticles:		400000,
	 			tileSize:			200,
	 			backgroundColor:	'',
	 			maxNoiseOpacity:	20/255
	 		};
	 		options = $.extend(defaults, options);
	 		
	 		// Use fallback image if canvas isn't supported 
	 		if ((options.fallbackImage !== undefined) && !!ctx) {
	 			$(this).css('background-image', options.fallbackImage);
	 			return;
	 		}
	 		
	 		canvas.width = canvas.height = options.tileSize;
	 		
	 		var imgData = ctx.createImageData(canvas.width, canvas.height);
	 		
	 		var rand = function(min, max) {
	 			return Math.floor(Math.random()*(max-min)+min);
	 		};
	 		
	 		// Add black and white pixels at random positions to the canvas
	 		while (options.noiseParticles--) {
	 			var x = rand(1, canvas.width),
	 			    y = rand(1, canvas.height),
	 			    index = (x + y * imgData.width) * 4;
	 			
	 			imgData.data[index  ] = rand(0, 255);							// red
	 			imgData.data[index+1] = rand(0, 255);							// green
	 			imgData.data[index+2] = rand(0, 255);							// blue
	 			imgData.data[index+3] = rand(0, 255*options.maxNoiseOpacity);	// alpha
	 		}
	 		
	 		ctx.putImageData(imgData, 0, 0);
	 		$(this).css('background', 'url(' + canvas.toDataURL('image/png') + ')' + options.backgroundColor);
		});
	};
})(jQuery);