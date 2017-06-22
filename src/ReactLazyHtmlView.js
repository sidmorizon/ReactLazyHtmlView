import React from 'react';
import PropTypes from 'prop-types';
import {LazyLoadWatcher} from './LazyLoadWatcher';
import {
    BLANK_IMAGE_DATA_URI, LAZY_IMAGE_CLASS_NAME,
    LAZY_IMAGE_LOADED_CLASS_NAME, DEFAULT_IN_VIEWPORT_OFFSET,
    THROTTLE_WAIT_MS,
} from './consts';
import {convertToLazyHtml} from './utils';


class ReactLazyHtmlView extends React.Component {
    static propTypes = {
        html: PropTypes.string.isRequired,
        scrollDom: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        defaultSrc: PropTypes.string,
        lazyClassName: PropTypes.string,
        loadedClassName: PropTypes.string,
        inViewportOffset: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }),
        throttleWait: PropTypes.number,
    };
    static defaultProps = {
        html: '',
        defaultSrc: BLANK_IMAGE_DATA_URI,
        lazyClassName: LAZY_IMAGE_CLASS_NAME,
        loadedClassName: LAZY_IMAGE_LOADED_CLASS_NAME,
        inViewportOffset: DEFAULT_IN_VIEWPORT_OFFSET,
        throttleWait: THROTTLE_WAIT_MS,
    };

    componentDidMount() {
        const {lazyClassName, loadedClassName, inViewportOffset, throttleWait} = this.props;
        this.lazyLoaderWatcher = new LazyLoadWatcher(this.props.scrollDom, {
            scope: this.refContainer,
            lazyClassName,
            loadedClassName,
            inViewportOffset,
            throttleWait,
        });
        this.lazyLoaderWatcher.setWatchImages();
        this.lazyLoaderWatcher.startWatch();
    }

    componentDidUpdate() {
        this.lazyLoaderWatcher.setWatchImages();
    }

    componentWillUnmount() {
        this.lazyLoaderWatcher.stopWatch();
    }

    render() {
        const {
            html, scrollDom, defaultSrc,
            lazyClassName, loadedClassName, inViewportOffset, throttleWait,
            ...otherProps
        } = this.props;
        return (
            <div
                ref={(c) => {
                    this.refContainer = c;
                }}
                {...otherProps}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: convertToLazyHtml(
                        this.props.html,
                        {defaultSrc, lazyClassName},
                    ),
                }}
            />
        );
    }
}

export {
    ReactLazyHtmlView,
};

