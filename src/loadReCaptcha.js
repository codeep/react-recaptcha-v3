// Callback by default is an empty function to execute nothing when no callback is passed
const loadReCaptcha = (siteKey, callback = () => {}, async = false, defer = false) => {
  const script = document.createElement('script')

  if (!window.onLoadCaptchaV3Callback && callback) {
    window.onLoadCaptchaV3Callback = callback
  }
  script.src = `https://www.recaptcha.net/recaptcha/api.js?onload=onLoadCaptchaV3Callback&render=${siteKey}`

  script.async = async
  script.defer = defer

  document.body.appendChild(script)
}

export default loadReCaptcha
