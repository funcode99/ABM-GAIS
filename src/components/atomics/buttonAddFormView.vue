<script setup>
    const props = defineProps({
        title: String
    })
</script>

<template>
    <button class="bg-green text-white rounded-lg text-base py-[5px] px-[18px] font-bold">
       {{ props.title }}
   </button>
</template>