<script setup>
  import { ref } from 'vue'
  import Modal from '@/components/Modal.vue'
  let currentStep = ref(0)
  const showModal = ref(false)
  const location = ref('')
</script>

<template>
  <div>

      <div class="flex justify-between p-2">
          <h1>Request Trip</h1>
          <h1>X</h1>
      </div>

      <div class="flex flex-col gap-x-8 gap-y-10">

        <div class="progressBar flex justify-center gap-[20px]">

            <div class="w-12 h-12 rounded-full relative" :class="currentStep > 0 ? 'bg-green-600' : 'bg-slate-500'">
              <div class="w-6 h-2 absolute right-[-22px] top-5"
              :class="currentStep > 0 ? 'bg-green-800' : 'hidden'"
              ></div>
              <h1 class="absolute bottom-[-17px] text-bold text-[8px] w-screen">Requestor Info</h1>
            </div>

            <div class="w-12 h-12 rounded-full relative" :class="currentStep == 1 ? 'bg-slate-500' : currentStep > 1 ? 'bg-green-600' : 'hidden'">
              <div 
              class="w-6 h-2 absolute right-[-22px] top-5"
              :class="currentStep > 1 ? 'bg-green-800' : 'hidden'"
              ></div>
              <h1 class="absolute bottom-[-17px] text-bold text-[8px] w-screen">Purpose of Trip</h1>
            </div>

            <div class="w-12 h-12 rounded-full relative" :class="currentStep == 2 ? 'bg-slate-500' : currentStep > 2 ? 'bg-green-600' : 'hidden'">
              <div 
              class="w-6 h-2 absolute right-[-22px] top-5"
              :class="currentStep > 2 ? 'bg-green-800' : 'hidden'"
              ></div>
                <h1 class="absolute left-[7px] bottom-[-17px] text-bold text-[8px] ">Travellers</h1>
            </div>

            <div class="w-12 h-12 rounded-full relative" :class="currentStep == 3 ? 'bg-slate-500' : currentStep > 3 ? 'bg-green-600' : 'hidden'">
              <!-- <div class="w-6 h-2 bg-black absolute right-[-22px] top-5"></div> -->
                <h1 class="absolute left-[7px] bottom-[-17px] text-bold text-[8px] ">Airlines</h1>
            </div>

            <!-- <div class="w-12 h-12 rounded-full relative bg-slate-500">
              <div class="w-6 h-2 bg-black absolute right-[-22px] top-5"></div>
            </div>
            <div class="w-12 h-12 rounded-full relative bg-slate-500">
            </div> -->

        </div>

        <div class="flex justify-center">
          <div class="formContainer w-6/12 h-64 border-2 border-black rounded-md relative">

            <div class="formContent p-2">
                <form>
                    <div v-if="currentStep == 0">
                      <div class="grid grid-cols-2 px-[5%] pt-5 gap-x-10">
                          <div>
                            <h1>Requestor</h1>
                            <select class="w-32 border-2 border-black">
                              <option value="">
                                User
                              </option>
                            </select>
                          </div>
                          <div class="flex flex-col">
                            <label for="">SN</label>
                            <input class="w-32 border-2 border-black" type="text">
                          </div>
                      </div>
                      <div class="grid grid-cols-2 px-[5%] pt-5 gap-x-10">
                          <div class="flex flex-col">
                            <label for="">Location</label>
                            <input class="w-32 border-2 border-black" type="text" v-model="location">
                            <h1>{{ location }}</h1>
                          </div>                          
                          <div class="flex flex-col">
                            <label for="">Phone</label>
                            <input class="w-32 border-2 border-black" type="text">
                          </div>
                      </div>
                    </div>
                    <div v-if="currentStep == 1">
                      <div class="grid grid-cols-2 px-[5%] pt-5 gap-x-10">
                          <div class="flex flex-col">
                            <label class="text-[10px]">Purpose of Trip</label>
                            <select class="w-32 border-2 text-[12px] border-black">
                              <option class="" value="">
                                <h3>Company Business</h3>
                              </option>
                            </select>
                          </div>
                          <div class="flex flex-col">
                            <label class="text-[10px]">Notes To Purpose Of Trip</label>
                            <input class="w-32 border-2 border-black" type="text">
                          </div>
                      </div>
                    </div>
                    <div v-if="currentStep == 2" class="pt-3">

                        <div class="space-x-5">
                          <button type="button" class="px-3 py-1 bg-yellow-300 rounded-md" @click="showModal = true">
                            + Add Guest
                          </button>
                        </div>

                        <div class="pt-2">
                          <table class="w-full">
                            <tr class="border-2 border-black">
                              <th>Company</th>
                              <th>Contact</th>
                              <th>Country</th>
                            </tr>
                            <tr class="border-2 border-black">
                              <td>1</td>
                              <td>2</td>
                              <td>3</td>
                            </tr>
                            <tr class="border-2 border-black">
                              <td>1</td>
                              <td>2</td>
                              <td>3</td>
                            </tr>
                            <tr class="border-2 border-black">
                              <td>1</td>
                              <td>2</td>
                              <td>3</td>
                            </tr>
                            <tr class="border-2 border-black">
                              <td>1</td>
                              <td>2</td>
                              <td>3</td>
                            </tr>
                          </table>
                        </div>

                    </div>
                    <div v-if="currentStep == 3 || currentStep == 4" class="pt-3">
                      <div class="space-x-5">
                        <button type="button" class="px-3 py-1 bg-yellow-300 rounded-md" @click="showModal = true">
                          + Add Airlines
                        </button>
                      </div>
                      <div class="pt-2">
                        <table class="w-full">
                          <tr class="border-2 border-black">
                            <th>Company</th>
                            <th>Contact</th>
                            <th>Country</th>
                          </tr>
                          <tr class="border-2 border-black">
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                          </tr>
                          <tr class="border-2 border-black">
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                          </tr>
                          <tr class="border-2 border-black">
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                          </tr>
                          <tr class="border-2 border-black">
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                </form>
            </div>
            <div class="progressButton pt-7 px-2 absolute bottom-2 left-0 right-0">
              <div class="flex justify-between">
                <button @click="currentStep--" :disabled="currentStep == 0" 
                class="px-4 py-2 rounded-md"
                :class="[currentStep == 0 ? 'bg-slate-700' : 'bg-blue-500']">
                 Previous 
                </button>
                <button @click="currentStep < 4 ? currentStep++: currentStep"
                class="px-4 py-2 rounded-md"
                :class="[currentStep == 5 ? 'bg-slate-700' : 'bg-blue-500']">
                  Next 
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
  </div>

        <Teleport to="body">
          <!-- use the modal component, pass in the prop -->
          <!-- <modal :show="showModal" @close="showModal = false">
                  <template #header>
                    <h3>custom header</h3>
                  </template>
              </modal> -->
          <Transition name="modal">
            <div v-if="showModal" class="modal-mask">
              <div class="modal-container">

                <div class="modal-body">
                  
                  <div class="p-2">
                    <h1>Airlines</h1>
                  </div>

                  <div class="px-5 py-2 grid grid-cols-2 gap-6">
                    
                    <div class="flex flex-col">
                      <label for="">Traveller</label>
                      <select name="" id="" class="border-black border-2 outline-none p-1">
                        <option value=""></option>
                      </select>
                    </div>

                    <div class="flex flex-col">
                      <label for="">Flight Class</label>
                      <select name="" id="" class="border-black border-2 outline-none p-1">
                        <option value=""></option>
                      </select>
                    </div>

                    <div class="flex flex-col">
                      <label for="">Departure date</label>
                      <input type="date" class="border-black border-2 outline-none p-1">
                    </div>  

                    <div class="flex flex-col">
                      <label for="">Departure</label>
                      <select name="" id="" class="border-black border-2 outline-none p-1">
                      <option value=""></option>
                      </select>
                    </div>

                    <div class="flex flex-col">                      
                      <label for="">Arrival</label>
                      <select name="" id="" class="border-black border-2 outline-none p-1">
                        <option value=""></option>
                      </select>
                    </div>

                  </div>
                </div>

                <!-- <div class="modal-header">
                  <slot name="header">default header</slot>
                </div> -->

                <!-- <div class="modal-body">
                  <slot name="body">default body</slot>
                </div> -->

                <div class="modal-footer">
                  <slot name="footer">
                    <button @click="showModal = false"
                      class="modal-default-button">
                      OK
                    </button>
                  </slot>
                </div>

              </div>

            </div>
          </Transition>
        </Teleport>

</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 500px;
  margin: auto;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>