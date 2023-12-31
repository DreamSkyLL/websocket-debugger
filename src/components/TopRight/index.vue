<!--  -->
<template>
  <div class="top-right-wrapper" ref="listWrapper">
    <div class="tabs">
      <Tabs :currentTab="currentTab" :tabsList="tabsList" @checkTab="handleCheckTab" />
    </div>

    <History v-if="currentTab == 'History'" :list="historyList" @detail="handleDetail" @save="handleSave" />
    <Saved v-else :list="savedList" @edit="handleEdit" />
  </div>
  <DetailDialog ref="detailDialog" title="Detail" />
  <SaveDialog ref="saveDialog" title="Save" />
</template>
  
<script lang="ts" setup>
import History from './history.vue'
import Saved from './saved.vue'
import { nextTick, ref, watch } from 'vue'
import DetailDialog from '../Dialog/index.vue'
import SaveDialog from '../SaveDialog/index.vue'
import { ListEnum } from '../../types/enum'
import Tabs from '@/components/Tabs/index.vue'

const props = defineProps<{
  historyList: any[],
  savedList: any[]
}>()

const listWrapper = ref()
const tabsList = ref(['History', 'Saved'])
const currentTab = ref('History')
const handleCheckTab = (tab: string) => {
  currentTab.value = tab
}

const detailDialog = ref()
const handleDetail = (index: number) => {
  detailDialog.value.openDialog(props.historyList[index], index, ListEnum.HistoryList)
}

const saveDialog = ref()
const handleSave = (index: number) => {
  saveDialog.value.openDialog(props.historyList[index], ListEnum.HistoryList)
}

const handleEdit = (index: number, name: string) => {
  saveDialog.value.openDialog(props.savedList[index], name, index)
}

watch(() => props.historyList.length, () => {
  nextTick(() => {
    listWrapper.value.scrollTo({
      top: listWrapper.value.scrollHeight,
      behavior: 'smooth'
    })
  })
})

</script>
  
<style lang="scss" scope>
.top-right-wrapper {
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  background-color: #fff;

  border-radius: 5px;
  border: 1px solid #ccc;
  overflow-y: auto;

  .tabs {
    position: absolute;
    display: flex;
    justify-content: center;
  }
}
</style>
  