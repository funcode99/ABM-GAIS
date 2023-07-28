<script setup>
import { watch } from "vue"
import { useCurrencyInput } from "vue-currency-input"

const props = defineProps({
  modelValue: Number, // Vue 2: value
  options: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const defaultOptions = {
  currency: undefined,
  locale: undefined,
  hidden: false,
  symbol: null,
  narrowSymbol: true,
  currency: "EUR",
  hideGroupingSeparatorOnFocus: false,
  hideCurrencySymbolOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: true,
  currencyDisplay: "hidden",
  hideGroupingSeparatorOnFocus: false,
}

const { inputRef, setValue } = useCurrencyInput({
  ...props.options,
  ...defaultOptions,
})

watch(
  () => props.modelValue, // Vue 2: props.value
  (value) => {
    setValue(value)
  }
)
</script>

<template>
  <input ref="inputRef" type="text" />
</template>
