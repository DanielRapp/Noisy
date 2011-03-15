(function($){
	// This function adds noise to the background-image attribute of a given element
	$.fn.noisy = function(options) {
		options = $.extend({}, $.fn.noisy.defaults, options);
		
		var url, canvas = document.createElement('canvas');
		
		if (!canvas.getContext) { // Use fallback image if canvas isn't supported
			url = options.fallback;
		} else {
			canvas.width = canvas.height = options.size;
		
			var ctx = canvas.getContext('2d'),
			    imgData = ctx.createImageData(canvas.width, canvas.height),
			    numPixels = options.intensity * Math.pow(options.size, 2),
			    maxAlpha = 255 * options.opacity;
			    
			// Add color to random pixels in the canvas
			while (numPixels--) { // Read about the double bitwise NOT trick here: goo.gl/6DPpt
				var x = ~~(Math.random()*canvas.width),
				    y = ~~(Math.random()*canvas.height),
				    index = (x + y * imgData.width) * 4;
				
				var colorChannel = numPixels % 255; // This will look random enough
				imgData.data[index  ] = colorChannel;                                               // red
				imgData.data[index+1] = options.monochrome ? colorChannel : ~~(Math.random()*255);  // green
				imgData.data[index+2] = options.monochrome ? colorChannel : ~~(Math.random()*255);  // blue
				imgData.data[index+3] = ~~(Math.random()*maxAlpha);                                 // alpha
			}
			
			ctx.putImageData(imgData, 0, 0);
			url = canvas.toDataURL('image/png');
		}
		
		return this.each(function() {
	 		if ($(this).data('original-css') == undefined) {
	 			$(this).data('original-css', $(this).css('background-image'));
	 		};
	 		$(this).css('background-image', 
	 			'url(' + url + '),' + $(this).data('original-css'));
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