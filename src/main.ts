import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import './samples/node-api'
import './utils/websocket'
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
import { store } from "./stores";

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('json', json);


const app = createApp(App);
app.use(store);
app.use(contextmenu)
app.mount('#app');