# ReactLazyHtmlView

Lazy image load support for raw html display

## Demo

[![Edit mQ6QG8WDO](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mQ6QG8WDO)
[![Edit React image lazy load by certain container scroll](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pOQpM8Dy)

## Install

`yarn add react-lazy-html-view`
 or
`npm install react-lazy-html-view`

## Usage

### lazy load by window scroll

[![Edit mQ6QG8WDO](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mQ6QG8WDO)


```js
import {ReactLazyHtmlView} from 'react-lazy-html-view';


const MyComponent = () => {
    const html = `
       <img src="http://cms-bucket.nosdn.127.net/2bce39f20a424da98c6d1fb02b319a5920170621212056.jpeg" />
       <img src="http://img4.cache.netease.com/photo/0008/2017-06-21/300x225_CNFGM81M52H60008.png" />
       <img src="http://cms-bucket.nosdn.127.net/c8df03c1d2a2446492f067be3f53c40420170621212057.jpeg" />
    `;
    return (
        <div>
            <h1>Title</h1>
            <ReactLazyHtmlView html={html} scrollDom={window} />
        </div>
    );
};
```

### lazy load by some container inner scroll

[![Edit React image lazy load by certain container scroll](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pOQpM8Dy)

```js
import {ReactLazyHtmlView} from 'react-lazy-html-view';


const MyComponent = () => {
    const html = `
       <img src="http://cms-bucket.nosdn.127.net/2bce39f20a424da98c6d1fb02b319a5920170621212056.jpeg" />
       <img src="http://img4.cache.netease.com/photo/0008/2017-06-21/300x225_CNFGM81M52H60008.png" />
       <img src="http://cms-bucket.nosdn.127.net/c8df03c1d2a2446492f067be3f53c40420170621212057.jpeg" />
    `;
    return (
        <div className="scroll-container" style={{height: '300px', overflowY: 'auto'}} >
            <h1>Title</h1>
            <ReactLazyHtmlView html={html} scrollDom=".scroll-container" />
        </div>
    );
};
```

## All Props

check file [src/ReactLazyHtmlView.js](src/ReactLazyHtmlView.js)
