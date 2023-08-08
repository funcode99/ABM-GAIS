<script setup>
import Swal from "sweetalert2"

import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { Modal } from "usemodal-vue3"

import {
  fethDrivers,
  fetchCarMaster,
  changeCar,
} from "@/utils/Api/travel-management/poolCar.js"

import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"
import FieldTitle from "@/components/atomics/FieldTitle.vue"
import Multiselect from "@vueform/multiselect"

const emits = defineEmits(["update:modelValue", "success"])
const route = useRoute()

const props = defineProps({
  modelValue: false,
  data: Object,
  isEditable: Boolean,
})

const references = ref({
  car: [],
  driver: [],
})

const form = ref({
  id_car: null,
  id_drivers: null,
})

const updateChangeCar = async () => {
  try {
    const poolRequestId = route.params.id
    const res = await changeCar(poolRequestId, form.value)

    console.log(res)

    if (res.data.data.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success to Change Car",
        showConfirmButton: false,
        timer: 1500,
      })

      emits("update:modelValue", false)

      emits("success")
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  const driverList = await fethDrivers()
  const carList = await fetchCarMaster()

  references.value.driver = driverList || []
  references.value.car = carList.data || []
})
</script>

<template>
  <Modal
    width="500px"
    offsetTop="10vh"
    :visible="modelValue"
    @onUnVisible="emits('update:modelValue', $event)"
    @update:visible="emits('update:modelValue', $event)"
  >
    <modalHeader @closeVisibility="modelValue = false" title="Change Car" />
    <form @submit.prevent="updateChangeCar()">
      <main class="overflow-y-scroll gap-3 p-5 h-[250px]">
        <div class="grid grid-rows-2">
          <div class="flex align-center gap-3">
            <FieldTitle
              label="Select Car"
              class="flex align-center basis-4/12"
              mandatory
            />
            <Multiselect
              v-model="form.id_car"
              @select="
                (_, select$) => {
                  form.id_drivers = select$.id_driver
                }
              "
              mode="single"
              placeholder="Select Car"
              :options="references.car"
              track-by="id"
              label="car_name"
              valueProp="id"
              required
              clear
              searchable
            >
            </Multiselect>
          </div>
        </div>

        <div class="grid grid-rows-2">
          <div class="flex align-center gap-3">
            <FieldTitle
              label="Select Driver"
              class="flex align-center basis-4/12"
            />
            <Multiselect
              v-model="form.id_drivers"
              mode="single"
              placeholder="Select Driver"
              :options="references.driver"
              track-by="id"
              label="name"
              valueProp="id"
              required
              clear
              searchable
            >
            </Multiselect>
          </div>
        </div>
      </main>
      <modalFooter @closeEdit="dialog = false" class="py-3 b-white" />
    </form>
  </Modal>
</template>

<style scoped>
#multiselect-options {
  position: relative;
  z-index: 9899999;
}
</style>
