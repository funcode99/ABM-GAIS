<script setup>
import icon_doublearrow_left from "../../assets/icon_doublearrow_left.svg";
import icon_doublearrow_right from "../../assets/icon_doublearrow_right.svg";
</script>

<template>
  <div class="flex items-center space-x-1">
    <a href="#" class="flex items-center text-[#015289]">
      <img :src="icon_doublearrow_left" />
    </a>

    <a href="#" class="flex items-center px-3 py-1 text-[#015289]">
      <svg
        aria-hidden="true"
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </a>

    <a
      href="#"
      class="px-3 py-1 text-[#015289] bg-white border border-[#015289] rounded hover:text-white hover:bg-[#015289] hover:border-[#015289] hover:border"
    >
      1
    </a>
    <a
      href="#"
      class="px-3 py-1 text-[#015289] bg-white border border-[#015289] rounded hover:text-white hover:bg-[#015289] hover:border-[#015289] hover:border"
    >
      2
    </a>
    <a
      href="#"
      class="px-3 py-1 text-[#015289] bg-white border border-[#015289] rounded hover:text-white hover:bg-[#015289] hover:border-[#015289] hover:border"
    >
      ...
    </a>
    <a
      href="#"
      class="px-3 py-1 text-[#015289] bg-white border border-[#015289] rounded hover:text-white hover:bg-[#015289] hover:border-[#015289] hover:border"
    >
      4
    </a>
    <a
      href="#"
      class="px-3 py-1 text-[#015289] bg-white border border-[#015289] rounded hover:text-white hover:bg-[#015289] hover:border-[#015289] hover:border"
    >
      5
    </a>
    <a href="#" class="px-3 py-1 text-[#015289]">
      <svg
        aria-hidden="true"
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </a>

    <a href="#" class="flex items-center text-[#015289]">
      <img :src="icon_doublearrow_right" />
    </a>
  </div>
</template>
