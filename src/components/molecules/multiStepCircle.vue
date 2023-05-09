<script setup>

    import arrow from '@/assets/arrow-multi-step-form.png'
    import check from '@/assets/step-done-check.png'

    const props = defineProps({
        title: Array,
        length: Number,
        step: Number
    })

    const circleStepBasicStylingClass = 'rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative'

</script>

<template>
    <div class="flex justify-center pt-3 gap-x-[19px] modal-inner">
        <div v-for="data in props.title" :key="data.id" :class="[props.step > data.id ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
            <h1 class="mt-11 w-11 font-medium text-[10px]">{{ data.title }}</h1>
            <div :class="data.id + 1 < props.length ? '': 'hidden'">
                <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
            </div>
            <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="props.step > data.id ? 'block' : 'hidden'">
        </div>
    </div>
</template>