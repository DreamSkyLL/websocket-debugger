<!--  -->
<template>
  <teleport to='body'>
    <div class="detaildialog" v-if="show">
      <div class="title">{{ title }}</div>
      <div class="row">
        <span class="row-title">
          Arrived At:
        </span>
        <span>
          {{ form.time }}
        </span>
      </div>
      <div class="row">
        <span class="row-title">
          Size(byte):
        </span>
        <span>
          {{ form.size }}
        </span>
      </div>
      <div class="row">
        <span class="row-title">
          Content:
        </span>
        <textarea style="margin-left: 5%;" v-model="form.content" cols="80" rows="15"></textarea>
      </div>
      <div class="footer">
        <div class="cancel" @click="closeDialog">
          <span>Cancel</span>
        </div>
        <div class="save" @click="saveDialog">
          <span>Save</span>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { withDefaults, computed, ref, defineExpose, reactive } from 'vue'
import { ListEnum } from '../../types/enum';
import { useSocketsStore } from '../../stores/modules/scokets';
const props = withDefaults(defineProps<{
  title: string,
}>(), {
  title: 'Detail',
})

const socketsStore = useSocketsStore()

const show = ref(false)
const form = ref({
  content: '',
  time: "",
  size: ""
})
const currentIndex = ref(0)
const listName = ref<ListEnum>()
const openDialog = (row: any, index: number, name: ListEnum) => {
  console.log(name);
  if (name == ListEnum.ReceiveList) {
    form.value = reactive<any>({ ...row })
  } else {
    form.value.content = JSON.parse(row.content)
    form.value.time = row.time
  }
  currentIndex.value = index
  listName.value = name
  show.value = true
}

const closeDialog = () => {
  show.value = false
}
const saveDialog = () => {
  socketsStore.editListItem(listName.value, JSON.stringify(form.value.content), currentIndex.value)
  closeDialog()
}

defineExpose({ openDialog })
</script>

<style lang="scss" scope>
.detaildialog {
  z-index: 9999;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  background: #fff;
  padding: 3%;
  border-radius: 10px;
  border: 1px solid #ccc;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
  }

  .row {

    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;

    .row-title {
      color: #888;
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .cancel {
      padding: 1% 2%;
      border-radius: 5px;
      background: #fff;
      color: #000;
      border: 1px solid #ccc;
      margin-right: 10px;
      cursor: pointer;
    }

    .save {
      padding: 1% 3%;
      border-radius: 5px;
      background: #007AFF;
      color: #FFF;
      cursor: pointer;
    }
  }
}
</style>
