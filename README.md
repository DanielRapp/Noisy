Noisy is a jQuery plugin that adds random noise to a given element.

#### Here's an example:
````javascript
$('body').noisy({
    intensity: 0.9, 
    size: 200, 
    opacity: 0.08,
    fallback: 'fallback.png',
    monochrome: false
});
````


But since all parameters are optional you can just use it like this:

````javascript
$('body').noisy();
````

You can try the interactive demo [here](http://rappdaniel.com/other/noisy-sample/).

Installation
----
Just download the repository and link to the local minimized script

````html
<script src="noisy/jquery/jquery.noisy.min.js"></script>
````

Or link via [cdnjs.com](http://cdnjs.com)

````html
<script src="http://cdnjs.cloudflare.com/ajax/libs/noisy/1.1/jquery.noisy.min.js"></script>
````

What's wrong with using an image?
----
#### Bandwidth cost
Due to the random nature of background images with a noisy overlay, compression usually isn't very effective. With this 1 KB script you can generate images up to 300 KB without loading for even a second. Saving bandwidth costs and loading time.

#### Development speed
Trying out an image with a different noise opacity involves a much smaller amount of steps by just updating a parameter than changing and saving the image in Photoshop.

Contact
----
I'd be flattered if you'd flattr this :)

[![Flattr this](http://api.flattr.com/button/flattr-badge-large.png)](http://flattr.com/thing/143004/jQuery-noise-generator)


If you have any questions or suggestions that doesn't fit GitHub, send them to [@DanielRapp](http://twitter.com/DanielRapp)