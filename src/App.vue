
<template>
  <!-- <HelloWorld msg="Electron + Vite + Vue" /> -->
  <div class="content-area">
    <div class="side">
      <TopLeft :receiveList="getReceiveList" />
      <BottomLeft />
    </div>
    <div class="line"></div>
    <div class="side">
      <TopRight :historyList="getHistoryList" :savedList="getSavedList" />
      <BottomRight />
    </div>

  </div>
</template>
<script setup lang="ts">
import TopLeft from './components/TopLeft/index.vue'
import TopRight from './components/TopRight/index.vue'
import BottomRight from './components/BottomRight/index.vue'
import BottomLeft from './components/BottomLeft/index.vue'
import { updateHandler } from './utils/websocket';
import { useSocketsStore } from './stores/modules/scokets'
import { storeToRefs } from 'pinia';
import { ListEnum } from './types/enum';

const socketsStore = useSocketsStore()
const { getReceiveList, getHistoryList, getSavedList, isRec } = storeToRefs(socketsStore)

const onMessage = (message: string) => {
  console.log(message);
  if (isRec.value == 'Running') {
    console.log(1)
    socketsStore.setListItem(ListEnum.ReceiveList, message)
  }
}

setTimeout(() => {
  updateHandler(onMessage)
}, 3000);
</script>

<style>
body {
  background-color: #EEE;
  height: 100%;
  box-sizing: border-box;
}
#app {
  padding: 0;
}

.content-area {
  padding: 10px 0;
  height: calc(100vh - 20px);
  display: flex;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
}

.line {
  width: 1px;
  height: 100%;
  background-color: #ccc;
}

.side {
  display: flex;
  padding: 0px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
}
</style>
