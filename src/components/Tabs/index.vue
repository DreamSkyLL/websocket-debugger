<!--  -->
<template>
  <div class="tab">
    <div v-for="(tab, index) in tabsList" :key="index" @click="handleTab(tab)" :class="{
      'active': currentTab == tab,
      'tab-item': true,
      'left-radius': index == 0,
      'right-radius': index == 1,
    }">
      {{ tab }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  tabsList: string[],
  currentTab: string
}>(), {
  tabsList: () => []
})

const emits = defineEmits(['checkTab'])
const handleTab = (tab: string) => {
  console.log(tab,);
  emits('checkTab', tab)
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;

  .tab-item {
    display: flex;
    height: 20px;
    padding: 2px 15px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    cursor: pointer;
    border: 1px solid #ccc;

  }

  .left-radius {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: none;
  }

  .right-radius {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: none;
  }

  .active {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.00) 100%), #007AFF;
    color: #FFF;
  }
}
</style>
