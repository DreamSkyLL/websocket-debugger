# websocket-debugger

WebSocket debug tool for WEB developer, Play a role of WebSocket server.

## Features

- Cross platform
- Easy to use


## Quick Setup

```sh
# install dependency
yarn

# develop
yarn dev
```

## Directory

```diff
+ ├─┬ electron
+ │ ├─┬ main
+ │ │ └── index.ts    entry of Electron-Main
+ │ └─┬ preload
+ │   └── index.ts    entry of Preload-Scripts
  ├─┬ src
  │ └── main.ts       entry of Electron-Renderer
  ├── index.html
  ├── package.json
  └── vite.config.ts
```
# websocket-debugger
