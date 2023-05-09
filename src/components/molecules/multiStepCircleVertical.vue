<script setup>
    import stepLine from '@/assets/step-line.png'

    const props = defineProps({
        number: Number,
        title: String,
        limit: Number
    })

</script>

<template>
    
    <div>

        <div class="flex items-center gap-x-4">
            <!-- relative -->
            <div class="bg-blue w-11 h-11 text-white rounded-full flex justify-center items-center">
                {{ props.number }}
                <!-- absolute top-[11px] left-[61px] -->
            </div>
            <h1 class="font-normal text-xl leading-[25px]  text-black">
                {{ props.title }}
            </h1>
        </div>

        <div v-if="props.number != props.limit" class="flex justify-center w-11 h-11">
                <img :src="stepLine" />
        </div>

    </div>

</template>