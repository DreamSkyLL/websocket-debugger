<!--  -->
<template>
  <div class="bottom-left">
    <div class="port">Port:{{ PORT }}</div>
    <div>
      <Tabs :currentTab="currentTab" :tabsList="tabsList" @checkTab="handleCheckTab" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { PORT } from "../../config";
import Tabs from '@/components/Tabs/index.vue'
import { useSocketsStore } from "../../stores/modules/scokets";
import { storeToRefs } from 'pinia';

const socketsStore = useSocketsStore()
const { isRec } = storeToRefs(socketsStore)
const currentTab = ref(isRec.value);
console.log(currentTab.value, '123412341234');
const tabsList = ref(['Running', 'Stop'])
const handleCheckTab = (tab: string) => {
  currentTab.value = tab
  if (currentTab.value == 'Stop') {
    socketsStore.stopReceive()
  } else {
    socketsStore.runningReceive()
  }
}
</script>

<style lang="scss" scoped>
.bottom-left {
  display: flex;
  height: 200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  .port {
    color: #000;
  }
}
</style>
