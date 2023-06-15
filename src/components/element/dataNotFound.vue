<script setup>
import { ref, onBeforeMount, computed, reactive } from "vue";

const props = defineProps({
  cntCol: Number,
});

const col = ref(props.cntCol)
</script>

<template>
  <td :colspan="col" class="text-center py-4"><span>Data Not Found</span></td>
</template>
