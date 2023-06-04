<script setup>
    import { ref } from 'vue'
    let foo = ref('foo')
    const bar = ref('bar')
    defineExpose({'pertama' : foo, 'kedua' : bar})
    const changeValue = () => {
        // jalan dong
        foo.value = 'fir'
    }
    setInterval(changeValue, 1000)
</script>

<template>

</template>