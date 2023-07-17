<script setup>
    import { inject, ref } from 'vue'
    import stepLine from '@/assets/step-line.png'
    import profileImage from '@/assets/profile.png'

    const props = defineProps({
        number: Number,
        limit: Number,
        title: String,
        selectedTitle: String,
        image: String,
        stop: Boolean,
        data: String,
        any: Array
    })

    const emits = defineEmits('changeHeader')
    const selected = () => {
        emits('changeHeader')
    }

    let date = ref('-')
    let hour = ref('-')

    try {
        date.value = props.any.date.substr(0,10)
        hour.value = props.any.date.substr(11,20)
    } catch (error) {
    }


</script>

<template>
    
    <div>

        <div :class="props.title == null ?  'flex gap-5' : ''">

            <!-- circle -->
            <div class="flex items-center relative" :class="props.title != null ? 'gap-3' : ''">
               
                <!-- tunjukin angka kalo angka nya ada for details -->
                <button v-if="props.number != null"
                :class="props.title == props.selectedTitle ? 'opacity-100' : 'opacity-30'"
                class="bg-blue w-11 h-11 text-white rounded-full flex justify-center items-center"
                @click="selected"
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

                        <h1 class="text-sm">{{ props.data }}</h1>
                        <h1 class="text-[#8c8c8c] text-xs">{{ date }}</h1>
                        <h1 class="text-[#8c8c8c] text-xs">{{ hour }}</h1>
                        <h1 v-if="props.any.notes">Notes: {{ props.any.notes }}</h1>

                    </div>

                </div>
            </div>

            <!-- stepline for details -->
            <div v-if="props.number !== props.limit" class="flex justify-center w-11 h-11 z-50">
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