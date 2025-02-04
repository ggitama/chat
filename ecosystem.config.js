
const appConfig = {
  exec_mode: "fork",
  instances : "1",
  max_memory_restart: "6G",
  env_local:{
    ENVIRONMENT:"local",
    NEXT_PUBLIC_ENVIRONMENT:"local",
    NEXT_PUBLIC_NODE_ENV:"local"
  },
  env_dev:{
    ENVIRONMENT:"development",
    NEXT_PUBLIC_ENVIRONMENT:"development",
    NEXT_PUBLIC_NODE_ENV:"development"
  },
  env_prod:{
    ENVIRONMENT:"production",
    NEXT_PUBLIC_ENVIRONMENT:"production",
    NEXT_PUBLIC_NODE_ENV:"production"
  },
  watch: true,
  ignore_watch: [
    "node_modules", 
    "test", "dist", 
    "**/*spec.ts",
    "logs",
  ]
}

// run using ecosystem config only
module.exports = {
  apps : [
    {
      // app name
      name: "cms-antavaya",
      // working directory aka path to apps
      // cwd:"/var/www/antavaya-cms",
      // path to yarn bin
      script: "yarn",
      args:"start", // for the optional change if you want to change number of PORT (current port is 3000) you just add optional param -p number of port. Example you want to change current port to 3100 then you just add -p 3000 (then become args: "start -p 3100")
      // attributes for yarn
      // https://github.com/yarnpkg/yarn/issues/6124
      interpreter:"/bin/bash",
      ...appConfig
    },
    {
      // equal to pm2 start npm -- run start
      name: "cms-antavaya-win",
      cwd:"C:\\path-to-project-folder\\wknd-antavaya-wieldly",
      // https://stackoverflow.com/questions/59634041/how-can-i-fix-issues-launching-an-app-in-pm2-on-windows
      script:"C:\\path-to-yarn-bin-on-npm-installation-path\\v14.17.0\\node_modules\\yarn\\bin\\yarn.js",
      args:"start",
      ...appConfig
    }
  ],
};  