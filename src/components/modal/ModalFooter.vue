<script setup>
 
 const props = defineProps({
    forLabel: String
 })

</script>

<template>

        <div class="sticky bottom-0 bg-white">

            <div class="flex justify-end gap-4 mr-6 pt-3">
                
                <label
                    :for="props.forLabel"
                    class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red">
                    Cancel
                </label>

                <button class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                    @click="$emit('doSomething')"
                >
                    <button @click="$emit('addSomething')">
                        Save
                    </button>
                </button>

            </div>

        </div>

</template>