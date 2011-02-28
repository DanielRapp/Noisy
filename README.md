Noisy is a jQuery plugin that adds random noise to a given element.

#### Here's an example:
    $('body').noisy({
        noise: 0.9, 
        tileSize: 200, 
        backgroundColor: '#EDEBDE', 
        maxNoiseOpacity: 0.078,
        fallbackImage: 'fallback.png',
        monochromatic: false
    });

But since all parameters are optional you can just use it like this:
    $('body').noisy();

You can try a interactive demo [here](http://rappdaniel.com/other/noisy-sample/).