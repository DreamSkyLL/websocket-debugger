<!--  -->
<template>
  <div class="top-left-wrapper" ref="listWrapper" @click="handleBlankClick">
    <div class="list" ref="topLeft">
      <transition name="fade" v-for="(item, index) in receiveList" :key="index">
        <div class="list-item" :class="{ 'selected-item': index == selectedIndex, 'hover-item': index == hoverIndex }"
          v-contextmenu:contextmenu @click.stop="handleClick($event, index)" @mouseover="handleCursorOver($event, index)" @mouseleave="handleCursorLeave($event, index)">
          <span class="time"> {{ item.time }}</span>
          <span class="content" v-if="!isJSON(item.content)" style="color: #333;"> {{ item.content }}</span>
          <span class="content" v-else v-html="hljs.highlight('json', item.content).value"> </span>
        </div>
      </transition>
    </div>
  </div>
  <v-contextmenu ref="contextmenu" @show="handleMenuShow" @hide="handleMenuHide">
    <v-contextmenu-item @click="handleCopy">Copy</v-contextmenu-item>
    <v-contextmenu-item @click="handleShowDetail">Show Detail</v-contextmenu-item>
    <VContextmenuDivider />
    <v-contextmenu-item @click="handleDelete">Delete</v-contextmenu-item>
    <VContextmenuDivider />
    <v-contextmenu-item @click="handleClearAll">Clear All</v-contextmenu-item>
  </v-contextmenu>
  <Dialog ref="detailDialog" title="Detail" />
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import { useSocketsStore } from '../../stores/modules/scokets';
import { copyToClipboard } from '../../utils/copy2clipboard';
import { isJSON } from '../../utils/json';
import Dialog from '../Dialog/index.vue'
import { ListEnum } from '../../types/enum';
import hljs from 'highlight.js/lib/core';

const socketsStore = useSocketsStore()

const props = defineProps<{
  receiveList: any[],
}>()

const listWrapper = ref()
const selectedIndex = ref()
const hoverIndex = ref()
const contextmenu = ref()

const handleClick = (e: Event, index: number) => {
  contextmenu.value.hide()
  selectedIndex.value = index
  copyToClipboard(props.receiveList[index].content)
}

const handleCursorOver = (e: Event, index: number) => {
  hoverIndex.value = index
}

const handleCursorLeave = (e: Event, index: number) => {
  if (hoverIndex.value == index) {
    hoverIndex.value = null
  }
}

const handleBlankClick = () => {
  selectedIndex.value = null
}

const show = ref(false)
const handleMenuShow = () => {
  show.value = true
  selectedIndex.value = hoverIndex.value
}
const handleMenuHide = () => {
  show.value = false
}
const handleCopy = () => {
  copyToClipboard(props.receiveList[selectedIndex.value])
}
const detailDialog = ref()
const handleShowDetail = () => {
  detailDialog.value.openDialog(props.receiveList[selectedIndex.value], selectedIndex.value, ListEnum.ReceiveList)
}

const handleDelete = () => {
  socketsStore.delListItem(ListEnum.ReceiveList, selectedIndex.value)
  selectedIndex.value = null
}

const handleClearAll = () => {
  socketsStore.clearList(ListEnum.ReceiveList)
}

watch(() => props.receiveList.length, () => {
  nextTick(() => {
    listWrapper.value.scrollTo({
      top: listWrapper.value.scrollHeight,
      behavior: 'smooth'
    })
  })
})
</script>

<style lang="scss" scope>
.top-left-wrapper {
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  background-color: #fff;

  border-radius: 5px;
  border: 1px solid #ccc;
  overflow-y: auto;

  .list {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    align-self: stretch;

    .list-item {
      display: flex;
      max-height: 60px;
      padding: 3px 5px;
      align-items: flex-start;
      gap: 10px;
      align-self: stretch;

      border-bottom: 1px solid #EEE;

      .time {
        width: 100px;
        overflow: hidden;
        color: #CCC;
        font-family: Fira Code;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        /* 160% */
      }

      .content {
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
  }


  .hover-item {
    background-color: #EEE;
  }

  .selected-item {
    background-color: #007AFF;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
