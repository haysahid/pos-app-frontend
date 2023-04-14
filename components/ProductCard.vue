<template>
  <div class="flex flex-row items-start gap-4 card flex-grow p-[16px]">
    <!-- <img
      src="/assets/images/tas-branded.jpg"
      alt=""
      class="w-[100px] rounded-[6px]"
    /> -->
    <img
      :src="'http://localhost:8000/storage/'+ image"
      alt=""
      class="w-[100px] rounded-[6px]"
    />
    <div class="flex flex-col flex-grow">
      <p class="font-medium text-grey-80 text-[14px] mb-1">{{ brand.name }}</p>
      <div class="font-bold text-dark text-[16px] mb-1 line-clamp-1">
        {{ name }}
      </div>
      <p class="text-grey-60 text-[12px] mb-2.5 line-clamp-1">
        {{ description }}
      </p>
      <div class="flex gap-1 justify-between">
        <div class="">
          <span
            class="bg-secondary px-3 py-1 rounded-full text-grey-80 text-[11px]"
            >{{ category.name }}</span
          >
        </div>
        <span class="text-grey-40 text-[12px]"
          >Updated at: {{ updated_at }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    id: Number,
    name: String,
    brand: [],
    image: String,
    description: String,
    category: [],
    updated_at: String,
  },
}
</script>
