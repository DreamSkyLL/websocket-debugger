<!--  -->
<template>
  <teleport to='body'>
    <div class="dialog" v-if="show">
      <div class="title">{{ title }}</div>
      <div class="row">
        <span class="row-title">
          Name:
        </span>
        <input style="margin-left: 5%;" v-model="form.name" />
      </div>
      <div class="row">
        <span class="row-title">
          Content:
        </span>
        <textarea style="margin-left: 5%;" v-model="form.content" rows="15"></textarea>
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
import { useSocketsStore } from '../../stores/modules/scokets';
import { ListEnum } from '../../types/enum';

const socketsStore = useSocketsStore()

const props = withDefaults(defineProps<{
  title: string,
}>(), {
  title: 'Save',
})

const show = ref(false)
const form = ref({
  content: '',
  name: ""
})

const listName = ref<ListEnum>()
const currentIndex = ref()
const openDialog = (row: any, name: ListEnum,) => {
  form.value = reactive<any>({ ...row })
  form.value.content = form.value.content
  listName.value = name
  show.value = true
}

const closeDialog = () => {
  show.value = false
}
const saveDialog = () => {
  if (listName.value == ListEnum.HistoryList) {
    socketsStore.setListItem(ListEnum.SavedList, { content: JSON.stringify(form.value.content), name: form.value.name })
  } else {
    socketsStore.editListItem(ListEnum.SavedList, { content: JSON.stringify(form.value.content), name: form.value.name }, currentIndex.value)
  }

  closeDialog()
}

defineExpose({ openDialog })
</script>

<style lang="scss" scope>
.dialog {
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
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;


    .row-title {
      color: #888;
      width: 5em;
    }

    input {
      width: 100%;
      height: 2em;
      font-size: 16px;
    }

    textarea {
      width: 100%;
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
