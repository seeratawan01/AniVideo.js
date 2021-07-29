# AniVideo.Js
#### Javascript Plugin

AniVideo.js is a simple, light-weighted and easy to use JavaScript library to combine animations (gifs) and a video together to create beautiful websites.

---
## Get Started

All you will need to include:
-   The JavaScript file `ani-video.js`
-   The css file `ani-video.css`

### Including files:
```html
<link rel="stylesheet" type="text/css" href="./dist/ani-video.css" />

<!-- Javascript Files -->
<script type="text/javascript" src="./dist/ani-video.js"></script>
```

## Usage
### HTML Structure
Start your HTML document with the compulsory [HTML DOCTYPE declaration](http://www.corelangs.com/html/introduction/doctype.html),  must start with a **<! DOCTYPE>** declaration.
Than add a html tag and set it's 'id'.

```html
<div id="ani-video-wrapper"></div>
```

### Initialization
To activate the plugin all you have to set some options based on your requirements
```javascript
//// create new Plugin instance
    var aniVideoInstance = new AniVideo({
        // Settings
        selector: "#ani-video-wrapper",
        src: './images/ced.fund_video.mp4',
        startingGif: './images/animation_2.gif',
        endingGif: './images/animation_3.gif',

        // Video
        loop: false,
        muted: true,

        // Appearance
        title: 'We Are Developing A Blockchain Network To Finance Your Student Loan Debt',
        buttonText:'Click play to learn',
        showOverlayAtEnd: true,
        showProgress: true,
        
    })
```
