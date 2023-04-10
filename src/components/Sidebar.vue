<script setup>
        import { ref, computed, onMounted } from 'vue' 
        // const exampleRef = ref('')
        // const changeColor = () => {
        //     // hanya bisa satu kelas
        //     exampleRef.value.classList.toggle('animate-[slide_1s_ease-in-out_5_forwards]')
        // }

        import searchIcons from '@/assets/Icons.png'
        import homeIcons from '@/assets/HomeIcons.png'
        import inboxIcons from '@/assets/InboxIcons.png'
        import gearIcons from '@/assets/GearIcons.png'
        import expandArrow from '@/assets/ExpandArrow.png'

        const isOpen = ref(false)

</script>

<template>
    <!-- <div class="animate-[slide_1s_ease-in-out_infinite] w-5 h-5 bg-blue-300">
    </div> -->

    <!-- <button @click="changeColor">
        ubah warna
    </button>

    <div ref="exampleRef" class="w-10 h-10 fixed bg-red-600">
    </div>

    <div>
        <h3>ini icon</h3>
        <FaBeer/>
    </div> -->  

    <div class="lg:pl-4 pt-6 pb-8 pl-1 flex flex-col md:w-[250px] lg:w-[300px] gap-2 border-2 border-black h-screen overflow-y-auto bg-white">

        <!-- search bar -->
        <div class="flex items-center">
            <div class="flex items-center pl-4 rounded-l-2xl h-10 cursor-pointer bg-[#f5f5f5]"><img class="h-5 w-5" :src=searchIcons alt=""></div>
            <input class="px-2 lg:px-4 h-10 outline-none bg-[#f5f5f5] rounded-r-2xl text-[16px] leading-[22px]" type="text" placeholder="Search...">
        </div>

        <!-- navbar list -->
        <div class="flex flex-col gap-6 pt-2">
            <a href="" class="flex items-center gap-4 p-1 lg:p-4"><img class="h-6 w-6" :src=homeIcons alt=""> Home</a>
            <a href="" class="flex items-center gap-4 p-1 lg:p-4"><img class="h-6 w-6" :src=inboxIcons alt=""> Inbox/Notifications</a>
            <div class="text-[16px] leading-[22px]" @click="isOpen = !isOpen">
                <button class="flex items-center gap-4 p-1 lg:p-4">
                    <img class="h-6 w-6" :src=gearIcons alt=""> 
                    <div class="flex items-center gap-1">
                        System Configuration <img class="h-6 w-6" :src=expandArrow :class="[isOpen ? 'animate-[rotateUp_.5s_linear]' : 'rotate-180 animate-[rotateDown_.5s_linear]']" alt="">
                    </div>
                </button>
                <div v-if="isOpen" class="flex flex-col gap-y-6 pl-14 py-6 text-[16px] leading-[22px] animate-[slideDown_.5s_linear]">
                    <a href="">User</a>
                    <a href="">Role</a>
                    <a href="">Permission</a>
                    <a href="">Menu</a>
                    <a href="">Approval</a>
                </div>
                <!-- <div v-else class="animate-[slideUp_1s_linear]">
                </div> -->
            </div>
            <a href="" class="flex items-center gap-4 p-1 lg:p-4"><img class="h-6 w-6" :src=inboxIcons alt=""> Inbox/Notifications</a>
        </div>

    </div>

</template>
