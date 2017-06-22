import lodashRemove from 'lodash/remove';
import lodashThrottle from 'lodash/throttle';
import lodashDebounce from 'lodash/debounce';
import {
    LAZY_IMAGE_CLASS_NAME, LAZY_IMAGE_LOADED_CLASS_NAME,
    THROTTLE_WAIT_MS, DEFAULT_IN_VIEWPORT_OFFSET,
} from './consts';
import {isElementInViewport} from './utils';
// import lazyLoadClassNames from './styles.module.scss';


function createImageOnloadHandler(options = {}) {
    const _options = {...{loadedClassName: LAZY_IMAGE_LOADED_CLASS_NAME}, ...options};
    return function handleImageOnload() {
        this.classList.add(_options.loadedClassName);
        // this.classList.add(lazyLoadClassNames['reactLazyLoaded']);
        this.removeEventListener('load', handleImageOnload);
    };
}

const DEFAULT_WATCHER_OPTIONS = {
    inViewportOffset: DEFAULT_IN_VIEWPORT_OFFSET,
    throttleWait: THROTTLE_WAIT_MS,
    lazyClassName: LAZY_IMAGE_CLASS_NAME,
    loadedClassName: LAZY_IMAGE_LOADED_CLASS_NAME,
    scope: document, // 搜索懒加载图片的范围（父dom）
};
class LazyLoadWatcher {
    scrollDom = null;
    lazyElementListCache = [];
    isWatching = false;

    constructor(scrollDom, options = {}) {
        this.options = {...DEFAULT_WATCHER_OPTIONS, ...options};

        this.handleScroll = lodashThrottle(this.handleScroll.bind(this), this.options.throttleWait);
        this.setWatchImages
            = lodashDebounce(this.setWatchImages.bind(this), 300);
        this.handleElementLazyLoad = this.handleElementLazyLoad.bind(this);
        if (typeof scrollDom === 'string') {
            this.scrollDom = document.querySelector(scrollDom);
        } else {
            this.scrollDom = scrollDom;
        }
        if (!this.scrollDom) {
            throw new Error('LazyLoadWatcher initialize error: `scrollDom` does not exists.');
        }
    }

    setWatchImages(lazyImagesDomList) {
        if (lazyImagesDomList) {
            this.lazyElementListCache = [].concat(Array.from(lazyImagesDomList));
        } else {
            this.lazyElementListCache
                = Array.from(this.options.scope.querySelectorAll(`.${this.options.lazyClassName}`)) || [];
        }

        // 过滤出已经加载的图片
        this.lazyElementListCache = this.lazyElementListCache
            .filter(i => !i.classList.contains(this.options.loadedClassName));

        if (!this.isImageListEmpty()) {
            this.startWatch();
            this.triggerScrollManually();
        }
    }

    isImageListEmpty() {
        return !this.lazyElementListCache || this.lazyElementListCache.length <= 0;
    }

    triggerScrollManually() {
        // 主动触发一次scroll事件
        this.handleScroll();
        // 因为有throttle的存在，mount和update之间间隔会小于300，导致不触发，所以这里setTimeout再次执行一次
        setTimeout(this.handleScroll, this.options.throttleWait + 100);
    }

    handleElementLazyLoad(element) {
        if (isElementInViewport(element, this.scrollDom, this.options.inViewportOffset)) {
            // 先绑定事件，防止从cache中设置src时load事件比绑定先触发
            element.addEventListener('load', createImageOnloadHandler(this.options));

            // eslint-disable-next-line no-param-reassign
            element.src = element.dataset.src;

            this.removeElementFromCache(element);
        }
    }

    removeElementFromCache(element) {
        lodashRemove(this.lazyElementListCache, e => e === element);
    }

    handleScroll() {
        // 如果数组已经空了，那么停止scroll监视
        if (this.isImageListEmpty()) {
            return this.stopWatch();
        }
        this.lazyElementListCache.forEach(this.handleElementLazyLoad);
    }

    startWatch() {
        if (this.isWatching) {
            return;
        }
        this.isWatching = true;
        this.scrollDom.addEventListener('scroll', this.handleScroll);
    }

    stopWatch() {
        this.isWatching = false;
        this.scrollDom.removeEventListener('scroll', this.handleScroll);
    }
}

export {
    LazyLoadWatcher,
};

