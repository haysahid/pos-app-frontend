<template>
  <div class="flex flex-row items-start gap-4 card flex-grow p-[16px]">
    <div class="flex flex-col flex-grow">
      <div class="font-bold text-dark text-[16px] mb-1">{{ name }}</div>
      <p class="text-grey-60 text-[12px] mb-2.5">{{ phone }}</p>
      <div class="flex gap-1 justify-between">
        <p class="text-grey-60 text-[12px]">
          {{ address }}
        </p>
        <span class="text-grey-40 text-[12px]"
          >{{ created_at }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    name: String,
    address: String,
    phone: String,
    created_at: String,
  },
}
</script>
