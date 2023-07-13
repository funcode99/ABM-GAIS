<script setup>
    import { ref } from 'vue'
    import miniABM from '@/assets/mini-abm.png'
    import formView from '@/assets/form-view.png'
    import formViewUnselected from '@/assets/document-view-unselected.png'
    import tableView from '@/assets/table-view.png'
    import tableViewSelected from '@/assets/table-view-selected.png'

    const props = defineProps({
        title: String
    })

    const emits = defineEmits(['changeView'])

    let currentLayout = ref('document')

    const changeViewLayout = (newLayout) => {
        emits('changeView', newLayout)
        currentLayout.value = newLayout
    }

</script>

<template>

    <div class="flex items-center justify-between">

        <img class="h-[60px] w-60" :src="miniABM" />
        
        <div class="mr-3 flex gap-4">   
            <button @click="changeViewLayout('document')">
                <img v-if="currentLayout === 'document'" class="w-[30px] h-[30px]" :src="formView" />
                <img v-if="currentLayout === 'table'" class="w-[30px] h-[30px]" :src="formViewUnselected" />
            </button>
            <button @click="changeViewLayout('table')">
                <img v-if="currentLayout === 'document'" class="w-[30px] h-[30px]" :src="tableView" />
                <img v-if="currentLayout === 'table'" class="w-[30px] h-[30px]" :src="tableViewSelected" />
            </button>
        </div>
        
    </div>
    
    <div class="flex items-center ml-8">
        <h1 class="text-2xl font-medium">{{ props.title }}</h1>
        <slot></slot>
    </div>

</template>