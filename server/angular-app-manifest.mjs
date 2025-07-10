
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/git@github.com:pedrotomaz-dev/Easyschedule-Frontend.git/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-6OUE2ZPZ.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 66520, hash: '043889fdfdfae5ff45d786f3dfdb7fcb905759cfa332384cc221d8e9d37c8d8c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17774, hash: '0677304151524ac868a33f9bdd44df94cc0195062c9bcfcd678c4176741aab53', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-ILZWMUKZ.css': {size: 50070, hash: 'K8q0FsGOIxc', text: () => import('./assets-chunks/styles-ILZWMUKZ_css.mjs').then(m => m.default)}
  },
};
