<script setup>
  import iconClose from "@/assets/navbar/icon_close.svg"
  import editIcon from "@/assets/navbar/edit_icon.svg"

  import { ref } from 'vue'
  import { Modal } from 'usemodal-vue3'

  import { useFormEditStore } from '@/stores/edit-modal.js'
  let formEditState = useFormEditStore()

  let isVisible = ref(false)
  let type = ''
  let modalPaddingHeight = 50

  const props = defineProps({
    identity: Array
  })

  const currentRoleName = ref('')

  const submitEdit = () => {
    formEditState.role.roleName = currentRoleName.value
  }

  // let role = ref(props.identity[1])
  // let description = ref(props.identity[2])

</script>

<template class="font-JakartaSans">
      
  <button @click="isVisible = !isVisible">
    <img :src=editIcon alt="">
  </button>

  <Modal v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

    <div class="px-5 py-5 flex flex-col h-[100%]">

      <div class="sticky top-0 z-50 bg-white">
            <button @click="isVisible = false" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </button>
            <p class="font-JakartaSans text-2xl font-semibold text-left">Edit Role</p>
            <div className="divider m-0"></div>
        </div>

      <div class="mb-3 content flex flex-col gap-5 justify-center">
        
        <div>
          <span class="block mb-2 font-JakartaSans font-medium text-sm text-left">
            Role <span class="text-red">*</span>
          </span>
          <input v-model="role" type="text" id="name" placeholder="Role" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
        </div>

      </div>

      <div class="sticky bottom-0 bg-white py-8">
          <div className="divider m-0 pb-4 w-full"></div>
          <div class="flex justify-end gap-4">
            <label
              @click="isVisible = !isVisible"
              for="add-user-modal"
              class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]">
              Cancel
            </label>
            <button @click="submitEdit">
              <button
              @click="$emit('changeRole')"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]">
                Save
              </button>
            </button>
          </div>
      </div>

    </div>

  </Modal>

</template>

<style scoped>

.content {
    flex: 1 1 auto !important;
}

</style>