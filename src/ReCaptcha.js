import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  elementID: PropTypes.string,
  verifyCallbackName: PropTypes.string,
  verifyCallback: PropTypes.func,
  sitekey: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired
  //  expiredCallback: PropTypes.func,
  //  render: PropTypes.string,
  //  onloadCallback: PropTypes.func,
  //  className: PropTypes.string,
  //  onloadCallbackName: PropTypes.string,
  //  theme: PropTypes.string,
  //  type: PropTypes.string,

  //  expiredCallbackName: PropTypes.string,
  //  size: PropTypes.string,
  //  tabindex: PropTypes.string,
  //  hl: PropTypes.string,
  //  badge: PropTypes.string
}

const defaultProps = {
  elementID: 'g-recaptcha',
  verifyCallbackName: 'verifyCallback',
  //  onloadCallback: undefined,
  //  onloadCallbackName: 'onloadCallback',
  //   expiredCallback: undefined,
  //  expiredCallbackName: 'expiredCallback',
  //  render: 'onload',
  //   theme: 'light',
  //   type: 'image',
  //  size: 'normal',
  //  tabindex: '0',
  //   hl: 'en',
  //  badge: 'bottomright',
  //   render: 'explicit'
}

const isReady = () =>
  typeof window !== 'undefined' &&
  typeof window.grecaptcha !== 'undefined'

let readyCheck

class ReCaptcha extends Component {
  constructor (props) {
    super(props)

    this.execute = this.execute.bind(this)

    this.state = {
      ready: isReady()
    }

    if (!this.state.ready) {
      readyCheck = setInterval(this._updateReadyState.bind(this), 1000)
    }
  }

  componentDidMount () {
    if (this.state.ready) {
      this.execute()
    }
  }

  componentDidUpdate (_, prevState) {
    if (
      this.state.ready &&
      !prevState.ready
    ) {
      this.execute()
    }
  }

  componentWillUnmount () {
    clearInterval(readyCheck)
  }

  execute () {
    const {
      sitekey,
      verifyCallback,
      action,
    } = this.props

    if (this.state.ready) {
      window.grecaptcha.execute(sitekey, { action })
        .then(token => {

          if (typeof verifyCallback !== 'undefined') {
            verifyCallback(token)
          }
        })
    }
  }

  _updateReadyState () {
    if (isReady()) {
      this.setState(() => ({ ready: true }))

      clearInterval(readyCheck)
    }
  }

  render () {
    return this.state.ready
      ? (
        <div
          id={this.props.elementID}
          data-verifycallbackname={this.props.verifyCallbackName}
        />
      )
      : (
        <div id={this.props.elementID}
          className='g-recaptcha'
        />
      )
  }
}

ReCaptcha.propTypes = propTypes
ReCaptcha.defaultProps = defaultProps

export default ReCaptcha
