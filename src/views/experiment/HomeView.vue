<script setup>
  import Sidebar from '@/components/Sidebar.vue'
  import Table from '../../components/Table.vue';
  import Footer from '@/components/Footer.vue'
  const empty = ''
</script>

<template>
  <main class="bg-[#e4e4e6]">
    <div class='flex'>
      <Sidebar class="hidden md:block md:flex-none" />
      <Table class="flex-none" />
    </div>
      <Footer/>
  </main>
</template>
