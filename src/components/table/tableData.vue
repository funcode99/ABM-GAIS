<template>
  <div
    class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden"
  >
    <div class="block overflow-x-auto">
      <table
        class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg"
      >
        <slot></slot>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-zebra tbody tr:hover td {
  background-color: rgb(193, 192, 192);
  cursor: pointer;
}
</style>
