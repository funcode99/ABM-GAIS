<script setup>
        import { ref, computed, onMounted } from 'vue'
 
        const exampleRef = ref('')
        const changeColor = () => {
            // hanya bisa satu kelas
            exampleRef.value.classList.toggle('animate-[slide_1s_ease-in-out_5_forwards]')
        }

</script>

<template>
    <!-- <div class="animate-[slide_1s_ease-in-out_infinite] w-5 h-5 bg-blue-300">
    </div> -->

    <button @click="changeColor">
        ubah warna
    </button>

    <div ref="exampleRef" class="w-10 h-10 fixed bg-red-600">
    </div>

    <div>
        <h3>ini icon</h3>
        <FaBeer/>
    </div>    

</template>
