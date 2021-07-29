( function( root, factory ) {

    var pluginName = 'AniVideo';

    if ( typeof define === 'function' && define.amd ) {
        define( [], factory( pluginName ) );
    } else if ( typeof exports === 'object' ) {
        module.exports = factory( pluginName );
    } else {
        root[ pluginName ] = factory( pluginName );
    }
}( this, function( pluginName ) {

    'use strict';

    var defaults = {
        selector: "#ani-video-wrapper",
        src: '',
        startingGif: '',
        endingGif: '',
        // Video
        loop: false,
        muted: true,
        controls: false,

        // Appearance
        buttonText:'Play',
        buttonClass: 'ani-video-overlay-btn',
        title: '',
        showOverlayAtEnd: 'true',
        showProgress: false,

        // Events
        onplay: () => {},
        onended: () => {},
        ontimeupdate: () => {},
    };
    /**
     * Merge defaults with user options
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     */
    var extend = function( target, options ) {
        var prop, extended = {};
        for ( prop in defaults ) {
            if ( Object.prototype.hasOwnProperty.call( defaults, prop ) ) {
                extended[ prop ] = defaults[ prop ];
            }
        }
        for ( prop in options ) {
            if ( Object.prototype.hasOwnProperty.call( options, prop ) ) {
                extended[ prop ] = options[ prop ];
            }
        }
        return extended;
    };

    /**
     * Helper Functions
     @private
     */

    var createOverlay = function () {
        console.log('createOverlay')
        var h1 = createElement('h1', {}, this.options.title)

        var button = createElement('button', {
            class: this.options.buttonClass,
            onclick: () => playVideo(this.videoElement)
        }, this.options.buttonText)

        var container = createElement('div', {
            class: 'ani-video-overlay'
        }, h1, button)

        this.selector.appendChild(container);
    }

    var createVideoElement = function () {
        console.log('createVideoElement')

        var source = createElement('source', {
            src: this.options.src,
            type: "video/mp4"
        })

        var video = createElement('video', {
                class: 'ani-video',
                controls: false,
                loop: this.options.loop,
                onplay: (event) => {
                    this.options.onplay(event)
                    event.target.style.opacity = '1.0'
                    this.selector.querySelector('.ani-video-overlay').style.opacity = '0'
                    this.selector.querySelector('.ani-video-overlay').style.zIndex = '0'
                },
                onended: (event) => {
                    this.options.onended(event)
                    event.target.style.opacity = '0'
                    if(this.options.showOverlayAtEnd) {
                        this.selector.querySelector('.ani-video-overlay').style.opacity = '1.0'
                    }
                    if(this.options.showProgress) {
                        this.selector.querySelector('.ani-video-track > div').style.width = 0
                    }
                    this.selector.querySelector('.ani-video-overlay').style.zIndex = '2'
                    this.selector.style.backgroundImage = 'url(\''+this.options.endingGif+'\')';
                }
            },
            source,
            'Your browser does not support the video tag.'
        )

        video.addEventListener('timeupdate', (event) => {

            var currentTime = video.currentTime;
            var watchPoint = Math.floor((currentTime/video.duration) * 100);

            this.options.ontimeupdate(event, watchPoint)

            if(this.options.showProgress) {
                this.selector.querySelector('.ani-video-track > div').style.width = watchPoint + '%'
            }

        });

        video.muted =  this.options.muted
        video.loop =  this.options.loop
        video.controls =  this.options.controls

        this.selector.appendChild(video);

        return video;
    }

    var createProgressTrack = function () {
        console.log('createProgressTrack')

        var div = createElement('div', {
                class: 'ani-video-track'
            },
            createElement('div')
        )

        this.selector.appendChild(div);
    }

    var createElement = function (tag, props, ...children) {
        const element = document.createElement(tag);

        if (props) {
            Object.entries(props).forEach(([key, value]) => {
                if (key.startsWith('on') && typeof value === 'function') {
                    element.addEventListener(key.substring(2), value);
                } else if (key.startsWith('data-') || key.startsWith('class')) {
                    element.setAttribute(key, value);
                } else {
                    // element.setAttribute(key, value);
                    element[key] = value;
                }
            });
        }

        children.forEach(child => {
            if (Array.isArray(child)) {
                return element.append(...child);
            }

            if (typeof child === 'string' || typeof child === 'number') {
                child = document.createTextNode(child);
            }

            if (child instanceof Node) {
                element.appendChild(child);
            }
        });

        return element;
    }

    var playVideo = function(selector) {
        selector.play();
    }


    /**
     * Plugin Object
     * @param {Object} options User options
     * @constructor
     */
    function Plugin( options ) {
        this.options = extend( defaults, options );
        this.init(); // Initialization Code Here
    }

    /**
     * Plugin prototype
     * @public
     * @constructor
     */
    Plugin.prototype = {
        init: function() {
            // find matching DOM elements
            // makes `.selectors` object available to instance.
            this.selector = document.querySelector( this.options.selector )

            this.selector.classList.add('ani-video-wrapper');
            this.selector.style.backgroundImage = 'url(\''+this.options.startingGif+'\')';

            this.videoElement = createVideoElement.bind(this)();
            createOverlay.bind(this)();

            if(this.options.showProgress) {
                createProgressTrack.bind(this)();
            }


        }, // #! init
        destroy: function() {
            // Remove any event listeners and undo any "init" actions here...
        },
        play: function() {

            this.selector.getElementsByTagName('video')[0].play();


        } // #! doSomething
    };
    return Plugin;
} ) );
