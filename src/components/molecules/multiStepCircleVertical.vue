<script setup>
    import stepLine from '@/assets/step-line.png'
    import profileImage from '@/assets/profile.png'

    const props = defineProps({
        number: Number,
        title: String,
        limit: Number,
        image: String,
        stop: Boolean
    })

</script>

<template>
    
    <div>

        <div :class="props.title == null ?  'flex gap-5' : ''">

            <!-- circle -->
            <div class="flex items-center relative" :class="props.title != null ? 'gap-3' : ''">
               
                <!-- tunjukin angka kalo angka nya ada for details -->
                <button v-if="props.number != null" 
                class="bg-blue opacity-30 click w-11 h-11 text-white rounded-full flex justify-center items-center"
                @click="$emit('changeHeader')"
                >
                    {{ props.number }}
                </button>

                <!-- tunjukin gambar kalo judulnya gak ada for approval -->
                <button v-if="props.title == null" class="bg-blue w-11 h-11 text-white rounded-full flex justify-center items-center">
                    <img :src="props.image" class="w-6 h-6" />
                </button>
    
                <h1 class="font-normal text-xl leading-[25px] text-black">
                    {{ props.title }}
                </h1>

                <!-- stepline for approval -->
                <div v-if="props.stop == false && props.number == null" class="absolute flex justify-center w-11 h-[100px] bottom-[-50px] z-50">
                    <img :src="stepLine" />
                </div>
    
            </div>

            <!-- notification box -->
            <div v-if="props.title == null" class="w-[385px] h-[128px] bg-[#EFF4FF] rounded-2xl my-3 flex items-center">
                <div class="flex px-6 py-4 gap-x-3">
                    <div class="bg-[#c3c3c3] rounded-full w-6 h-6 flex items-center justify-center">
                        <img :src="profileImage" class="w-3 h-3" />
                    </div>
                    <div>
                        <h1 class="text-sm">Rayhan (Atasan) was approved your document</h1>
                        <h1 class="text-[#8c8c8c] text-xs">Selasa, 12 April 2023</h1>
                        <h1 class="text-[#8c8c8c] text-xs">08:30:25 AM</h1>
                    </div>
                </div>
            </div>

            <!-- stepline for details -->
            <div v-if="props.number != props.limit" class="flex justify-center w-11 h-11 z-50">
                    <img :src="stepLine" />
            </div>

        </div>

    </div>

</template>

<style scoped>
    .click:focus {
        opacity: 1;
    }
</style>