<script setup>

  import { ref, watch } from 'vue'

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"

  import { Modal } from "usemodal-vue3"

  import { useFormAddStore } from '@/stores/sysconfig/add-modal.js'

  const formState = useFormAddStore()

  let isVisible = ref(false)
  let isAdding = ref(false)
  let modalPaddingHeight = "10vh"
  const emits = defineEmits('addRole')

  let newRole = ref('')
  let newRoleCode = ref('')

  const submitRole = () => {
    isAdding.value = true
    formState.role.roleName = newRole.value
    formState.role.roleCode = newRoleCode.value
    emits('addRole')
    isVisible.value = false
   
  }

  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base'

  const resetInput = () => {
    newRole.value = ''
    newRoleCode.value = ''
  }

  watch(isVisible, () => {
    if(isAdding.value == true) {
      isAdding.value = false
    } else {
      console.log(newRole.value)
      resetInput()
      console.log(newRole.value)
    }
  })

</script>

<template>

        <button 
          @click="isVisible = true" 
          class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
          + Add New
        </button>

        <!--  -->
        <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">

          <main>

            <modalHeader
              @closeVisibility="isVisible = false"
              title="New Role"
            />

            <form class="pt-4 px-1" @submit.prevent="submitRole">

              <div class="mb-3 px-3">
                <label for="role" class="block mb-2 font-JakartaSans font-medium text-sm">
                  Role<span class="text-red">*</span>
                </label>
                <input
                  id="role"
                  v-model="newRole"
                  type="text"
                  placeholder="Role"
                  :class="inputStylingClass"
                  required
                />
              </div>

              <div class="mb-3 px-3">
                <label for="role_code" class="block mb-2 font-JakartaSans font-medium text-sm">
                  Role Code<span class="text-red">*</span>
                </label>
                <input
                  id="role_code"
                  v-model="newRoleCode"
                  type="text"
                  placeholder="Role Code"
                  :class="inputStylingClass"
                  required
                />
              </div>

              <modalFooter
                class="mt-6 pt-5 pb-2"
                @closeEdit="isVisible = false"
              />

            </form>

          </main>

        </Modal>


</template>
