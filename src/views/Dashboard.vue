<script setup>

    import { ref } from 'vue'

     import Multiselect from '@vueform/multiselect'

    let emptyArray = [
        { value: 'abc', name: 'Judy', image: 'https://randomuser.me/api/portraits/med/women/1.jpg' },
        { value: 'def', name: 'Jane', image: 'https://randomuser.me/api/portraits/med/women/2.jpg' },
        { value: 'ghi', name: 'John', image: 'https://randomuser.me/api/portraits/med/men/1.jpg' },
        { value: 'jkl', name: 'Joe', image: 'https://randomuser.me/api/portraits/med/men/2.jpg' }
      ]

      let value = ref(null)

</script>

<template>
    <Multiselect
      v-model="value"
      mode="tags"
      placeholder="Select employees"
      track-by="name"
      label="name"
      :close-on-select="false"
      :searchable="true"
      :options="emptyArray"
    >
        <template v-slot:tag="{ option, handleTagRemove, disabled }">
         
            <div
            class="multiselect-tag is-user"
            :class="{
              'is-disabled': disabled
            }"
          >
            <!-- <img :src="option.image"> -->
            {{ option.name }}
            <span
              v-if="!disabled"
              class="multiselect-tag-remove"
              @click="handleTagRemove(option, $event)"
            >
              <span class="multiselect-tag-remove-icon"></span>
            </span>
          </div>
          
        </template>
    </Multiselect>


    {{ value }}
  </template>
  
  <style scoped>
    .multiselect-tag.is-user {
      padding: 5px 8px;
      border-radius: 22px;
      background: #35495e;
      margin: 3px 3px 8px;
    }
  
    .multiselect-tag.is-user img {
      width: 18px;
      border-radius: 50%;
      height: 18px;
      margin-right: 8px;
      border: 2px solid #ffffffbf;
    }
  
    .multiselect-tag.is-user i:before {
      color: #ffffff;
      border-radius: 50%;;
    }
  
    .user-image {
      margin: 0 6px 0 0;
      border-radius: 50%;
      height: 22px;
    }

  </style>

<style src="@vueform/multiselect/themes/default.css"></style>