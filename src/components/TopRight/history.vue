<!--  -->
<template>
  <div class="history" ref="history">
    <div class="list-item" :class="{ 'hover-item': index == currentIndex }" v-for="(item, index) in list" :key="index"
      v-contextmenu:contextmenu="{ trigger: ['contextmenu'] }" @mouseover="handleMouseover($event, index)"
      @mouseleave="handleMouseLeave" @dblclick="handleSend" @click="handleCopy">
      <span class="time"> {{ item.time }}</span>
      <span class="content" v-if="!isJSON(item.content)" style="color: #333;"> {{ item.content }}</span>
      <span class="content" v-else v-html="hljs.highlight('json', item.content).value"> </span>
    </div>
  </div>
  <v-contextmenu ref="contextmenu" @show="handleMenuShow" @hide="handleMenuHide">
    <v-contextmenu-item @click="handleSend">Send Again</v-contextmenu-item>
    <v-contextmenu-item @click="handleCopy">Copy</v-contextmenu-item>
    <v-contextmenu-item @click="handleShowDetail">Show Detail</v-contextmenu-item>
    <VContextmenuDivider />
    <v-contextmenu-item @click="handleSave">Save</v-contextmenu-item>
    <v-contextmenu-item @click="handleDetail">Delete</v-contextmenu-item>
    <VContextmenuDivider />
    <v-contextmenu-item @click="handleClearAll">Clear All</v-contextmenu-item>
  </v-contextmenu>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch, computed } from 'vue';
import { send } from '../../utils/websocket';
import { useSocketsStore } from '../../stores/modules/scokets';
import { ListEnum } from '../../types/enum';
import { copyToClipboard } from '../../utils/copy2clipboard';
import { isJSON } from '../../utils/json';
import hljs from 'highlight.js/lib/core';

const socketsStore = useSocketsStore()
const props = defineProps<{
  list: any[]
}>()

const history = ref()
const currentIndex = ref()
const contextmenu = ref()
const handleMouseover = (e: Event, index: number) => {
  contextmenu.value.hide()
  currentIndex.value = index
}
const handleMouseLeave = () => {
  if (show.value) return
  currentIndex.value = null
}

const emits = defineEmits(['save', 'detail'])
const show = ref(false)


const incomeMessage = computed(() => {
  return props.list[currentIndex.value].content
})
const handleSend = () => {
  send(incomeMessage.value)
  socketsStore.setListItem(ListEnum.HistoryList, incomeMessage.value)
}

const handleMenuShow = () => {
  show.value = true
}
const handleMenuHide = () => {
  show.value = false
}
const handleCopy = () => {
  copyToClipboard(props.list[currentIndex.value].content)
}
const handleClearAll = () => {
  socketsStore.clearList(ListEnum.HistoryList)
}
const handleShowDetail = () => {
  emits('detail', currentIndex.value, ListEnum.HistoryList)

}
const handleSave = () => {
  emits('save', currentIndex.value)
}
const handleDetail = () => {
  props.list.splice(currentIndex.value, 1,)
}
</script>

<style lang="scss" scoped>
.history {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;

  .list-item {
    display: flex;
    padding: 3px 5px;
    gap: 10px;
    align-self: stretch;
    border-bottom: 1px solid #EEE;

    .time {
      width: 120px;
      color: #CCC;
      font-family: Fira Code;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }

    .content {
      word-break:break-all;
      overflow: hidden;
      color: #333;
      text-overflow: ellipsis;
      font-family: Fira Code;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      flex: 1 0 0;
    }
  }

  .hover-item {
    background-color: #007AFF;

    .content {
      color: #fff;
    }
  }

}
</style>
