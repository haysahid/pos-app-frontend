<template>
  <div class="flex flex-row gap-4 card flex-grow p-[16px]">
    <div
      class="w-[100px] h-[100px] min-w-[100px] rounded-[6px] flex justify-center items-center bg-grey-5"
      v-if="!image"
    >
      <EmptyImage />
    </div>

    <img
      :src="imgUrl + image"
      :alt="name"
      class="w-[100px] h-[100px] rounded-[6px] object-cover aspect-square"
      v-else
    />

    <div class="flex flex-col flex-grow">
      <p class="text-grey-80 text-[14px] mb-1">{{ brand.name }}</p>
      <div class="font-medium text-dark text-[16px] mb-1 line-clamp-1">
        {{ name }}
      </div>
      <p class="text-grey-60 text-[12px] mb-4 line-clamp-1">
        {{ description }}
      </p>
      <div
        class="flex items-center gap-2 justify-between max-sm:flex-col max-sm:items-start"
      >
        <div
          class="bg-secondary px-3 py-1 rounded-full text-grey-80 text-[11px]"
        >
          {{ category.name }}
        </div>

        <div class="text-grey-40 text-[12px] line-clamp-1" v-show="date">
          {{ created_at }}
        </div>
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
    created_at: String,
    updated_at: String,
    date: true,
    sold: null,
  },
  data() {
    return {
      imgUrl: process.env.imgUrl,
    }
  },
}
</script>
