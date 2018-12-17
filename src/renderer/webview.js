document.addEventListener("DOMContentLoaded", () => {
  const div = document.createElement('div')
  div.style.cssText = 'position:absolute;width:100%;height:100%;top:0px;bottom:0px;left:0px;right:0px;opacity:0.3;z-index:999;background-color:#000;'

  const h2 = document.createElement('h2')
  h2.style.cssText = 'display:block;text-align:center;color:#fff;font-weight:bold;font-family:arial,sans-serif;font-size:24px;line-height:24px;padding:10px 0;margin:0;height:44px;'
  h2.innerText = 'Electron Starter App'

  const body = document.body
  body.style.paddingTop = '44px'
  body.style.position   = 'relative'

  div.appendChild(h2)
  body.appendChild(div)
})
