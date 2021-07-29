# Ani-video Javascript Plugin

Combine Animations and a Video together. Easy to integrate.

```html
<div id="ani-video-wrapper"></div>
```

```javascript
//// create new Plugin instance
    var aniVideoInstance = new AniVideo({
        // Settings
        selector: "#ani-video-wrapper",
        src: './Assets/ced.fund_video.mp4',
        startingGif: './Assets/animation_2.gif',
        endingGif: './Assets/animation_3.gif',

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
