<template>
  <li v-if="!item.children.length" :href="item.href">
    <a>{{ item.label }}</a>
  </li>
  <div v-else tabindex="0" class="collapse collapse-arrow">
    <div class="collapse-title">
      <a>{{ item.label }}</a>
    </div>
    <component class="collapse-content">
      <NavItems v-for="child in item.children" :item="child" />
    </component>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
