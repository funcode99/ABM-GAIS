<script setup>
import iconClose from "@/assets/navbar/icon_close.svg"

const props = defineProps({
    title: String
})

</script>

<template>
    <nav class="z-50 bg-white py-4 px-2 flex justify-between scale">
        <p class="font-JakartaSans text-2xl font-semibold">{{ props.title }}</p>
        <button @click="$emit('closeClick')" class="cursor-pointer">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </button>
    </nav>
</template>