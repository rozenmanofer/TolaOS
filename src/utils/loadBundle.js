let bundlePath = './build/bundle.js'

if(typeof process !== 'undefined' && process.env.ENVIRONMENT === 'DEV') {
  bundlePath = 'http://localhost:8080/build/bundle.js'
}

const bundleScriptElement = document.createElement('script')
bundleScriptElement.src = bundlePath
document.currentScript.parentNode.insertBefore(bundleScriptElement, document.currentScript)