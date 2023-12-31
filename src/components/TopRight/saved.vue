<!--  -->
<template>
    <div class="saved" ref="saved">
        <div class="list-item" :class="index == currentIndex ? 'hover-item' : ''" v-for="(item, index) in list" :key="index"
            v-contextmenu:contextmenu="{ trigger: ['contextmenu'] }" @mouseover="handleMouseover($event, index)"
            @click="handleCopy" @mouseleave="handleMouseLeave" @dblclick="handleSend">
            <span class="name">{{ item.name }}</span>
            <span class="content"> {{ isJSON(item.content) ? JSON.parse(item.content) : item.content }}</span>
        </div>
        <v-contextmenu ref="contextmenu" @show="handleMenuShow" @hide="handleMenuHide">
            <v-contextmenu-item @click="handleSend">Send</v-contextmenu-item>
            <v-contextmenu-item @click="handleCopy">Copy</v-contextmenu-item>
            <v-contextmenu-item @click="handleEdit">Edit</v-contextmenu-item>
            <VContextmenuDivider />
            <v-contextmenu-item @click="handleDetail">Delete</v-contextmenu-item>
        </v-contextmenu>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import { useSocketsStore } from '../../stores/modules/scokets';
import { send } from '../../utils/websocket';
import { ListEnum } from '../../types/enum';
import { copyToClipboard } from '../../utils/copy2clipboard';
import { isJSON } from '../../utils/json';


const socketsStore = useSocketsStore()

const props = withDefaults(defineProps<{
    list: any[]
}>(), {
    list: () => []
})

const saved = ref()

watch(() => props.list, (val) => {
    nextTick(() => {
        saved.value.scrollTop = saved.value.scrollHeight
    })
}, {
    deep: true,
    immediate: true,
})

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

const emits = defineEmits(['edit',])
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

const handleEdit = () => {
    emits('edit', currentIndex.value,)
}

const handleDetail = () => {
    props.list.splice(currentIndex.value, 1,)
}
</script>

<style lang="scss" scoped>
.saved {
    .list-item {
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        padding: 10px;

        .name {
            color: #333;
            margin-right: 10px;
        }

        .content {
            color: #ccc;
        }
    }

    .hover-item {
        background-color: #007AFF;
        color: #fff;

        .name {
            color: #fff;
            margin-right: 5px;
        }

        .content {
            color: #333;
        }
    }

}
</style>
