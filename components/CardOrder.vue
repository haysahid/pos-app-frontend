<template>
  <div
    class="flex flex-row items-start gap-4 card flex-grow p-[16px] max-sm:flex-col relative"
  >
    <!-- Customer & Delivery -->
    <div
      class="flex flex-col justify-between gap-2 w-[50%] max-sm:flex-row max-sm:gap-4 max-sm:w-full"
    >
      <div class="flex flex-col gap-2">
        <div class="font-semibold text-dark text-[16px]">
          {{ customer.name }}
        </div>

        <!-- Address -->
        <div class="flex gap-1.5 justify-start">
          <div class="min-w-4 min-h-4 pt-[1px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-4 h-4 fill-grey-40"
            >
              <path
                fill-rule="evenodd"
                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <p class="text-grey-60 text-[12px] line-clamp-2">
            {{ address }}
          </p>
        </div>

        <!-- Order Created -->
        <div class="flex gap-1.5 justify-start">
          <div class="min-w-4 min-h-4 pt-[1px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-4 h-4 fill-grey-40"
            >
              <path
                d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"
              />
              <path
                fill-rule="evenodd"
                d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <p class="text-grey-60 text-[12px]">{{ created_at }}</p>
        </div>

        <div class="">
          <!-- If Success -->
          <span
            class="bg-green-600 px-3 py-1 rounded-full text-white text-[11px] whitespace-nowrap"
            v-if="status == 'Success'"
            >{{ status }}</span
          >
          <!-- Else -->
          <span
            class="bg-grey-60 px-3 py-1 rounded-full text-white text-[11px] whitespace-nowrap"
            v-else
            >{{ status }}</span
          >
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div
      class="inline-block w-[1.5px] self-stretch bg-gray-200 opacity-100 dark:opacity-50 max-sm:h-[1.5px] max-sm:w-full"
    ></div>

    <!-- Order Item -->
    <div class="flex flex-row gap-4 w-full">
      <div
        class="w-[100px] h-[100px] rounded-[6px] flex justify-center items-center bg-page"
        v-if="!order_items[0]?.product.image"
      >
        <EmptyImage />
      </div>
      <img
        :src="imgUrl + order_items[0]?.product.image"
        alt=""
        class="w-[100px] h-[100px] rounded-[6px] object-cover aspect-square"
        v-else
      />
      <div class="flex flex-col flex-grow justify-between">
        <div>
          <!-- Brand Name -->
          <div class="flex justify-between">
            <p class="text-grey-80 text-[14px] mb-1">
              {{ order_items[0].product.brand.name }}
            </p>
          </div>

          <!-- Product Name -->
          <div class="font-medium text-dark text-[16px] mb-1 line-clamp-1">
            {{ order_items[0].quantity + ' x ' + order_items[0].product.name }}
          </div>

          <!-- Color -->
          <div class="flex gap-2 items-center mb-2">
            <p class="text-grey-60 text-[12px]">
              {{ order_items[0].color }}
            </p>
          </div>
        </div>

        <!-- Order Type & Price -->
        <div
          class="flex gap-3 justify-between max-sm:flex-col items-center max-sm:items-start"
        >
          <!-- Order Type -->
          <div class="">
            <div
              class="text-green-600 border-green-600 border-[1.45px] py-0.5 px-2 rounded-[4px] text-[11px]"
              v-if="order_type == 'Ready Stock'"
            >
              {{ order_type }}
            </div>
            <div
              class="text-blue-600 border-blue-600 border-[1.45px] py-0.5 px-2 rounded-[4px] text-[11px]"
              v-if="order_type == 'Pre-Order'"
            >
              {{ order_type }}
            </div>
          </div>

          <!-- Price -->
          <p class="text-[16px] font-medium text-primary">
            {{ $toCurrencyString(totalPrice) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customer: [],
    order_items: [],
    payments: [],
    customer_type: null,
    phone: null,
    address: null,
    province: null,
    city: null,
    order_type: null,
    notes: null,
    availability: null,
    arrival: null,
    total_weight: null,
    shipping_costs: null,
    created_at: null,

    // Status
    status: null,
  },
  data() {
    return {
      imgUrl: process.env.imgUrl,
    }
  },
  computed: {
    totalPrice() {
      return parseInt(this.order_items[0].price * this.order_items[0].quantity)
    },
  },
}
</script>
