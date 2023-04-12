<script setup>
import Layout from "@/components/layout/Layout.vue";
import iconUser from "@/assets/navbar/icon_user.svg";
</script>

<template>
  <Layout />
  <div class="card w-full p-10 bg-base-100">
    
    <div class="card-body">
      <p class="font-JakartaSans font-semibold text-2xl">John Mane</p>
      <form>
        <div class="mb-6">
          <label
            for="name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            id="name"
            placeholder="Employee Name"
            class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
            required
          />
        </div>
        <div class="mb-6">
        <label
            for="name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >User Role<span class="text-red">*</span></label
          >
          <div class="flex gap-2">
            <input type="checkbox" name="Administrator" id="">
            <label for="">Administrator</label>
            <input type="checkbox" name="Super Admin" id="">
            <label for="">Super Admin</label>
            <input type="checkbox" name="Admin" id="">
            <label for="">Admin</label>
            <input type="checkbox" name="Receptionist" id="">
            <label for="">Receptionist</label>
            <input type="checkbox" name="Employee" id="">
            <label for="">Employee</label>
          </div>
       </div>
       <div class="mb-6">
        <label
            for="name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Approval Authorities<span class="text-red">*</span></label
          >
          <div class="flex justify-between">
            <div class="flex items-center gap-2">
                <input type="checkbox" name="PM" id="">
                <label for="">PM</label>
            </div>
            <div class="flex items-center gap-2">
                <input type="checkbox" name="GA" id="">
                <label for="">GA</label>
            </div>
            <div class="flex items-center gap-2">
                <input type="checkbox" name="HR" id="">
                <label for="">HR</label>
            </div>
            <div class="flex items-center gap-2">                
                <input type="checkbox" name="Finance / Accounting" id="">
                <label class="" for="">Finance / Accounting</label>
            </div>
          </div>
       </div>
      </form>
    </div>
    
    <div class="flex justify-start pb-4 px-8 gap-4">
      <button
        class="btn text-white text-base font-JakartaSans font-bold capitalize w-[75px] h-[30px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
      >
        Cancel
      </button>
      <button
        class="btn text-white text-base font-JakartaSans font-bold capitalize w-[75px] h-[30px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
      >
        Save
      </button>
    </div>

  </div>
</template>
