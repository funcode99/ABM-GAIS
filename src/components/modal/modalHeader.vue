<script setup>
    import iconClose from "@/assets/navbar/icon_close.svg"
    const props = defineProps({
        title: String
    })
</script>

<template>

    <div class="sticky top-0 z-50 bg-[#015289]">

        <button @click="$emit('closeVisibility')"
          class="cursor-pointer absolute right-3 top-0 lg:top-3">
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </button>

        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2 text-start">
          {{ props.title }}
        </p>

    </div>

</template>