<script setup>
import { ref, watch, onMounted } from "vue"
import { getPReviewSequenceCode } from "@/utils/Api/system-configuration/sequence.service"

const inputStylingClass =
  "py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base"

const props = defineProps({
  formData: {
    type: Object,
    default: () => {},
  },
})

const code = ref("")

const getSequenceCode = async () => {
  try {
    const params = {
      prefix: props.formData.prefix,
      sufix: props.formData.suffix,
      code_company: props.formData.company,
      sequence_size: props.formData.sequenceSize,
      sequence_code: props.formData.sequenceCode,
    }

    console.log(params)
    if (
      !params.prefix ||
      !params.sufix ||
      !params.code_company ||
      !params.sequence_size ||
      !params.sequence_code
    ) {
      return
    }
    const res = await getPReviewSequenceCode({ params })

    code.value = res
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getSequenceCode()
})
</script>

<template>
  <div class="basis-full justify-center py-5 text-center flex flex-wrap">
    <div class="basis-full">
      <button
        class="btn btn-sm bg-primary text-white hover:text-primary hover:bg-white"
        type="button"
        @click="getSequenceCode"
      >
        Preview
      </button>
    </div>
    <div class="basis-8/12 mt-3">
      <div class="text-sm">Preview</div>
      <input :value="code" :class="inputStylingClass" readonly />
    </div>
  </div>
</template>
