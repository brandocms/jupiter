// Motion's DOM declarations include Electron's optional <webview> element.
// Browser consumers only need its HTMLElement surface.
declare global {
  interface HTMLWebViewElement extends HTMLElement {}
}
export * from './index'
