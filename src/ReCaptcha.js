import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

let readyCheck

export default function ReCaptcha (props) {
  const isReady = () =>
    typeof window !== 'undefined' &&
    typeof window.grecaptcha !== 'undefined' &&
    typeof window.grecaptcha.execute !== 'undefined'
  
  const [isCaptchaReady, setIsCaptchaReady] = useState(() => isReady())
  useReadyChecker(isCaptchaReady, props)
  if (!isCaptchaReady) {
    readyCheck = setInterval(_updateReadyState, 1000)
  }
  function _updateReadyState () {
    if (isReady()) {
      setIsCaptchaReady(true)
      clearInterval(readyCheck)
    }
    return (
      isCaptchaReady ? (
        <div
          id={props.elementID}
          data-verifycallbackname={props.verifyCallbackName}
        />
      ) : (
        <div id={props.elementID} className='g-recaptcha' />
      )
    )
  }
}

function useReadyChecker (readyState) {
  function execute (props) {
    const {
      sitekey,
      verifyCallback,
      action,
    } = props
  
    if (readyState) {
      window.grecaptcha.execute(sitekey, { action })
        .then(token => {
          if (typeof verifyCallback !== 'undefined') {
            verifyCallback(token)
          }
        })
    }
  }
  useEffect(() => {
    if (readyState) {
      execute()
    }
    return () => {
      clearInterval(readyCheck)
    }
  }, [readyState])
}

ReCaptcha.propTypes = {
  elementID: PropTypes.string,
  verifyCallbackName: PropTypes.string,
  verifyCallback: PropTypes.func,
  sitekey: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired
}
ReCaptcha.defaultProps = {
  elementID: 'g-recaptcha',
  verifyCallbackName: 'verifyCallback'
}
