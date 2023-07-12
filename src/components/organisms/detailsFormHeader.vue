<script setup>

    import miniABM from '@/assets/mini-abm.png'
    import formView from '@/assets/form-view.png'
    import tableView from '@/assets/table-view.png'

    const props = defineProps({
        title: String
    })

    const emits = defineEmits(['changeView'])

</script>

<template>

    <div class="flex items-center justify-between">

        <img class="h-[60px] w-60" :src="miniABM" />
        
        <div class="mr-3 flex gap-4">   
            <button @click="emits('changeView', 'document')">
                <img class="w-[30px] h-[30px]" :src="formView" />
            </button>
            <button @click="emits('changeView', 'table')">
                <img class="w-[30px] h-[30px]" :src="tableView" />
            </button>
        </div>
        
    </div>
    
    <div class="flex items-center ml-8">
        <h1 class="text-2xl font-medium">{{ props.title }}</h1>
        <slot></slot>
    </div>

</template>