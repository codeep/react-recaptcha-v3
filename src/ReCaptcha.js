import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    className: PropTypes.string,
    onloadCallbackName: PropTypes.string,
    elementID: PropTypes.string,
    onloadCallback: PropTypes.func,
    verifyCallback: PropTypes.func,
    expiredCallback: PropTypes.func,
    render: PropTypes.string,
    sitekey: PropTypes.string,
    theme: PropTypes.string,
    type: PropTypes.string,
    verifyCallbackName: PropTypes.string,
    expiredCallbackName: PropTypes.string,
    size: PropTypes.string,
    tabindex: PropTypes.string,
    hl: PropTypes.string,
    badge: PropTypes.string,
};

const defaultProps = {
    elementID: 'g-recaptcha',
    onloadCallback: undefined,
    onloadCallbackName: 'onloadCallback',
    verifyCallback: undefined,
    verifyCallbackName: 'verifyCallback',
    expiredCallback: undefined,
    expiredCallbackName: 'expiredCallback',
    render: 'onload',
    theme: 'light',
    type: 'image',
    size: 'normal',
    tabindex: '0',
    hl: 'en',
    badge: 'bottomright',
    render: 'explicit'
};

const isReady = () => typeof window !== 'undefined' && typeof window.grecaptcha !== 'undefined';

let readyCheck;

class ReCaptcha extends Component {

    constructor(props) {
        super(props);
        this.execute = this.execute.bind(this);
        this.state = {
            ready: isReady(),
            widget: null,
        };

        if (!this.state.ready) {
            readyCheck = setInterval(this._updateReadyState.bind(this), 1000);
        }
    }

    componentDidMount() {
        if (!!(this.state.ready)) {
            this.execute();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.ready && !prevState.ready) {
            this.execute();
        }
    }

    componentWillUnmount() {
        clearInterval(readyCheck);
    }

    execute() {
        const { ready, widget } = this.state;
        const { sitekey, verifyCallback, action, elementID } = this.props;
        var widgetId;
        // console.log('executing, ready:', ready);

        if (ready) {
          // widgetId = window.grecaptcha.render(elementID, {
          //   'sitekey': sitekey,
          //   'callback': verifyCallback
          // });
          window.grecaptcha.execute(sitekey, {action})
            .then(function(token) {
              verifyCallback(token);
              // console.log(window.grecaptcha.getResponse(widgetId))
            });
        }
    }

    _updateReadyState() {
        if (isReady()) {
          this.setState({ ready: true });
          clearInterval(readyCheck);
        }
    }

    render() {
      if (this.state.ready) {
        return (
            <div id={this.props.elementID}
                 data-verifycallbackname={this.props.verifyCallbackName}
            />
        );
      } else {
        return (
            <div id={this.props.elementID}
                 className="g-recaptcha"
            />
        );
      }
    }
}

ReCaptcha.propTypes = propTypes;
ReCaptcha.defaultProps = defaultProps;

export default ReCaptcha;
