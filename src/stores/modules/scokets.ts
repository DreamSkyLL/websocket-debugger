import dayjs from "dayjs";
import { defineStore } from "pinia";
import { ListEnum } from "../../types/enum";

export const useSocketsStore = defineStore("sockets", {
    state: () => ({
        isRec: 'Running', //是否接受数据
        historyList: [],
        savedList: [],
        receiveList: []
    }),
    getters: {
        getHistoryList(state): any[] {
            return state.historyList ?? [];
        },
        getSavedList(state): any[] {
            return state.savedList ?? [];
        },
        getReceiveList(state): any[] {
            return state.receiveList ?? [];
        },
    },
    actions: {
        setListItem(listName: ListEnum, data: any) {
            
            if (listName == ListEnum.SavedList) {
                this[listName].push(
                    { ...data }
                )
            } else {
                this[listName].push({
                    time: dayjs().format('MM-DD HH:mm:ss'),
                    content: data
                })
            }
        },
        editListItem(listName: ListEnum | undefined, data: any, index: number,) {
            if (listName == ListEnum.SavedList) {
                this[listName][index].content = data.content
                this[listName][index].name = data.name
            } else {
                this[listName][index].content = data
                // 时间是否修改
                // this[listName][index].time =  dayjs().format('YYYY-MM-DD HH:mm:ss')
            }

        },
        delListItem(listName: ListEnum, index: number) {
            this[listName].splice(index, 1)
        },
        clearList(listName: ListEnum) {
            this[listName] = []
        },
        runningReceive() {
            this.isRec = 'Running'
        },
        stopReceive() {
            this.isRec = 'Stop'
        }
    },
    persist: true,
});
