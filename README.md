# ReactLazyHtmlView

Lazy image load support for raw html display


## Install
`yarn add react-lazy-html-view`
 or
`npm install react-lazy-html-view`

## Usage

lazy load by window scroll
```js
import {ReactLazyHtmlView} from 'react-lazy-html-view';


const MyComponent = () => {
    const html = `
       <img src="http://cms-bucket.nosdn.127.net/2bce39f20a424da98c6d1fb02b319a5920170621212056.jpeg" />
       <img src="http://img4.cache.netease.com/photo/0008/2017-06-21/300x225_CNFGM81M52H60008.png" />
       <img src="http://cms-bucket.nosdn.127.net/c8df03c1d2a2446492f067be3f53c40420170621212057.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/5ae56251eb7a4dbca6aeac41c2e9698720170621213137.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/ef2bf67226f84ad2b72021d958c7974020170621213136.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/7d9f945cb43a45ecb56e36ff707c782520170621213506.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/347a1bc62c8e44eca94f5e5784d8543320170621220025.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/968fe896901b4b0fabf855afbf16c62120170621213839.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/c49324bdb3414d1d8b0dc7cc252035fb20170621215417.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/60477b12fd7b4530944233860bd788e820170621215417.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/8efca5a93b9c427c8f8d5cf21cde884f20170621215750.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/7af28c6c1014460880780549095ffef420170621220903.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/af54fffda4d84d83a71e22e9502a546720170621221619.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/5e28ce0a2f194b93a786c3a5afa7f6df20170621221620.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/a9161d14f92441aabae5f08ac0e61b1820170621221619.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/88e04b18261449d09b04604659cdf75b20170621221942.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/83e172e439444884bf404d98c04cc56620170621222342.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/a68647deaedb479f9d650cd357b4e01320170621223418.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/08d9afeb983d463aa78a88f6cadf497620170621223418.jpeg" />
       <img src="http://img4.cache.netease.com/photo/0008/2017-06-21/300x225_CNFGM81M52H60008.png" />
    `;
    return (
        <div>
            <h1>Title</h1>
            <ReactLazyHtmlView html={html} scrollDom={window} />
        </div>
    );
};
```



lazy load by some container inner scroll
```js
import {ReactLazyHtmlView} from 'react-lazy-html-view';


const MyComponent = () => {
    const html = `
       <img src="http://cms-bucket.nosdn.127.net/2bce39f20a424da98c6d1fb02b319a5920170621212056.jpeg" />
       <img src="http://img4.cache.netease.com/photo/0008/2017-06-21/300x225_CNFGM81M52H60008.png" />
       <img src="http://cms-bucket.nosdn.127.net/c8df03c1d2a2446492f067be3f53c40420170621212057.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/5ae56251eb7a4dbca6aeac41c2e9698720170621213137.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/ef2bf67226f84ad2b72021d958c7974020170621213136.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/7d9f945cb43a45ecb56e36ff707c782520170621213506.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/347a1bc62c8e44eca94f5e5784d8543320170621220025.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/968fe896901b4b0fabf855afbf16c62120170621213839.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/c49324bdb3414d1d8b0dc7cc252035fb20170621215417.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/60477b12fd7b4530944233860bd788e820170621215417.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/8efca5a93b9c427c8f8d5cf21cde884f20170621215750.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/7af28c6c1014460880780549095ffef420170621220903.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/af54fffda4d84d83a71e22e9502a546720170621221619.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/5e28ce0a2f194b93a786c3a5afa7f6df20170621221620.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/a9161d14f92441aabae5f08ac0e61b1820170621221619.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/88e04b18261449d09b04604659cdf75b20170621221942.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/83e172e439444884bf404d98c04cc56620170621222342.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/a68647deaedb479f9d650cd357b4e01320170621223418.jpeg" />
       <img src="http://cms-bucket.nosdn.127.net/08d9afeb983d463aa78a88f6cadf497620170621223418.jpeg" />
       <img src="http://img4.cache.netease.com/photo/0008/2017-06-21/300x225_CNFGM81M52H60008.png" />
    `;
    return (
        <div className="scroll-container" style={{height: '300px', overflowY: 'auto'}} >
            <h1>Title</h1>
            <ReactLazyHtmlView html={html} scrollDom=".scroll-container" />
        </div>
    );
};
```

