<script setup>

    import miniABM from '@/assets/mini-abm.png'
    import formView from '@/assets/form-view.png'
    import tableView from '@/assets/table-view.png'

    // salah nya disini ternyata
    import buttonEditFormView from '@/components/atomics/buttonEditFormView.vue'
    import buttonAddFormView from '@/components/atomics/buttonAddFormView.vue'

    const props = defineProps({
        title: String
    })

</script>

<template>

    <div class="flex items-center justify-between">

        <img class="h-[60px] w-60" :src="miniABM" />
        
        <div class="mr-3 flex gap-4">   
            <button>
                <img class="w-[30px] h-[30px]" :src="formView" />
            </button>
            <button>
                <img class="w-[30px] h-[30px]" :src="tableView" />
            </button>
        </div>
        
    </div>
    
    <div class="flex items-center gap-7 ml-8">
        <h1 class="text-2xl font-medium">{{ props.title }}</h1>
        <div class="flex gap-4">
            <buttonEditFormView />
            <buttonAddFormView />
        </div>
    </div>

</template>