<script setup>

</script>

<template>
    <main class="modal-box-inner-inner">
        <form>
            <slot></slot>
        </form>
    </main>
</template>

<style scoped>

    .modal-box-inner-inner {
  --tw-scale-x: 1;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
    }

</style>