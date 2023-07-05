<script setup>
import { useCurrencyInput } from "vue-currency-input"

const props = defineProps({
  modelValue: Number, // Vue 2: value
  options: {
    type: Object,
    default: () => {
      return {
        currency: undefined,
        locale: undefined,
        hidden: false,
        symbol: null,
        narrowSymbol: true,
        currency: "EUR",
        hideGroupingSeparatorOnFocus: false,
        hideCurrencySymbolOnFocus: false,
        hideNegligibleDecimalDigitsOnFocus: false,
        currencyDisplay: "hidden",
      }
    },
  },
})

const { inputRef } = useCurrencyInput(props.options)
</script>

<template>
  <input ref="inputRef" type="text" />
</template>
