// Callback by default is an empty function to execute nothing when no callback is passed
const loadReCaptcha = (siteKey, callback = () => {}) => {
  const script = document.createElement('script')

  if (!window.onLoadCaptchaV3Callback && callback) {
    window.onLoadCaptchaV3Callback = callback
  }

  script.src = `https://www.google.com/recaptcha/api.js?onload=onLoadCaptchaV3Callback&render=${siteKey}`

  document.body.appendChild(script)
}

export default loadReCaptcha
