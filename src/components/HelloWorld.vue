<script setup lang="ts">
import { ref } from 'vue'
import { send, updateHandler } from '../utils/websocket'

defineProps<{ msg: string }>()

const wsMessage = ref('')
const incomeMessage = ref('')

const onMessage = (message: string) => {
  console.log('income message', message)
  incomeMessage.value += '\n' + message
}

const onSend = () => {
  send(wsMessage.value)
}

console.log("运行了",);
setTimeout(() => {
  updateHandler(onMessage)
}, 3000);
</script>

<template>
  <div>
    <textarea v-model="incomeMessage" />
  </div>
  <div>
    <textarea v-model="wsMessage" />
  </div>
  <div>
    <button @click="onSend">send</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
