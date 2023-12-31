<!--  -->
<template>
  <div class="bottom-right">
    <textarea v-model="incomeMessage"></textarea>
    <div class="send" @click="onSend">
      <span>Send</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { send } from '../../utils/websocket'
import { useSocketsStore } from '../../stores/modules/scokets';
import { ListEnum } from '../../types/enum';

const socketsStore = useSocketsStore()

const incomeMessage = ref('')

const onSend = () => {
  send(incomeMessage.value)
  socketsStore.setListItem(ListEnum.HistoryList, incomeMessage.value)
  incomeMessage.value = ''
}

console.log("运行了",);

</script>

<style lang="scss" scoped>
.bottom-right {
  width: 100%;
  height: 200px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  textarea {
    width: 100%;
    width: 100%;
    max-height: 100%;
    min-height: 100%;
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;
    border: none;
    font-size: 16px;
  }

  .send {
    position: absolute;
    bottom: 5px;
    right: 5px;
    border-radius: 5px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.00) 100%), #007AFF;
    box-shadow: 0px 0px 0px 0.5px rgba(0, 122, 255, 0.12), 0px 1px 2.5px 0px rgba(0, 122, 255, 0.24);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 3px 10px;

    span {
      color: #fff;
      font-size: 16px;
    }
  }


}
</style>
