
export default {
  basePath: '/git@github.com:pedrotomaz-dev/Easyschedule-Frontend.git',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
