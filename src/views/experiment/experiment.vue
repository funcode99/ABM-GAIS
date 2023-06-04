<script setup>
    import { ref } from 'vue'
    // kalo kaya gini cara nya dapet error
    // import { childrenComponent as child } from './children.vue'
    import childrenComponent from './children.vue'

    // nilai 'isi' tidak akan dibaca di abg, justru yang dibaca adalah expose dalam component children
    // variabel abg digunakan sebagai wadah yang diisi defineexpose dalam child component
    const abg = ref('isi dari defineExpose children component')
</script>

<template>
    <childrenComponent ref="abg" />
    <!-- <child ref="abg" /> -->
    {{ abg }}
</template>