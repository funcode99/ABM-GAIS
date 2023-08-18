<script setup>
    
    import { onBeforeMount, ref } from 'vue'
    import { Modal } from "usemodal-vue3"
    import walletImg from '@/assets/wallet.png'
    import Api from '@/utils/Api'

    import modalHeader from "@/components/modal/modalHeader.vue"
    import modalFooter from "@/components/modal/modalFooter.vue"

    let isVisible = ref(false)

</script>

<template>
    <div class="absolute right-5">
        <button
            @click="isVisible = true" 
            class="flex gap-3 items-center bg-blue text-white rounded-lg font-bold py-[14px] px-[10px]">
            <img :src="walletImg" />
            Actualization
        </button>
    </div>

    <Modal v-model:visible="isVisible">
        <main class="pb-5">
            <modalHeader @closeVisibility="isVisible = false" title="Actualization Trip" />
            
            <div class="flex gap-5 my-2 px-5">

                <div class="w-full">
                    <label 
                        :class="$labelStyling" 
                        for="departure"
                    >
                        Created Date<span class="text-red">*</span>
                    </label>
                    <input
                        v-model="createdDate"
                        id="departure" 
                        :class="$inputStyling" 
                        type="date" 
                        placeholder="Created Date"
                    />
                </div>

                <div class="w-full">   
                    <label 
                        :class="$labelStyling" 
                        for="departure"
                    >
                        Created By<span class="text-red">*</span>
                    </label>
                    <input
                        v-model="createdBy"
                        id="departure" 
                        :class="$inputStyling" 
                        type="date" 
                        placeholder="Created By"
                    />
                </div>

            </div>

        </main>
    </Modal>

</template>