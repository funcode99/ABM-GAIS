<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, onMounted } from "vue";

const emits = defineEmits(["unlockScrollbar", "zona-saved"]);
const tags = ref([]);

let selectedCity = ref("City");
let zonaName = ref("");
let City = ref("");
let isOpenModal = ref(false);

//for get city in input
const fetchCity = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/city/");
  City.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

onMounted(() => {
  fetchCity();
});

function addTag(event) {
  if (event.code === "Comma" || event.code === "Enter") {
    event.preventDefault();
    var val = event.target.value.trim();

    if (val.length > 0) {
      tags.value.push(val);
      event.target.value = "";
    }
  }
}

function removeTag(index) {
  tags.value.splice(index, 1);
}

function removeLastTag(event) {
  if (event.target.value.length === 0) {
    removeTag(tags.value.length - 1);
  }
}

const saveZona = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    const payload = {
      zona_name: zonaName.value,
      id_city: selectedCity.value,
    };

    await Api.post(`/zona/store`, payload);

    // Reset nilai input
    zonaName.value = "";
    selectedCity.value = "";

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    emits("zona-saved");
    isOpenModal.value = !isOpenModal.value;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="my-modal-3"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >

  <input
    type="checkbox"
    id="my-modal-3"
    class="modal-toggle"
    v-model="isOpenModal"
  />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="my-modal-3"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          New Zona
        </p>
      </nav>

      <main class="modal-box-inner-zona">
        <form class="pt-4" @submit.prevent="saveZona">
          <div class="mb-6 w-full px-4">
            <label
              for="zona"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Zona<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="tlk"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Zona"
              required
              v-model="zonaName"
            />
          </div>

          <div class="mb-6 w-full px-4">
            <label
              for="city"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >City<span class="text-red">*</span></label
            >
            <div
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md text-sm font-medium sm:text-sm"
            >
              <div
                v-for="(tag, index) in tags"
                :key="tag"
                class="tag-input__tag"
              >
                {{ tag }}
                <span
                  @click="removeTag(index)"
                  class="text-xs items-center cursor-pointer"
                  >x</span
                >
              </div>
              <input
                v-model="selectedCity"
                type="text"
                placeholder="Enter a city"
                class="tag-input__text px-4 text-sm font-medium w-full font-JakartaSans focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                @keydown="addTag"
                @keydown.delete="removeLastTag"
              />
            </div>
          </div>

          <div class="sticky bottom-0 bg-white">
            <div class="flex justify-end gap-4 mr-6">
              <label
                @click="this.$emit('unlockScrollbar')"
                for="my-modal-3"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                >Cancel</label
              >
              <button
                type="submit"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner-zona {
  --tw-scale-x: 1;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #e4e4e4;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>
