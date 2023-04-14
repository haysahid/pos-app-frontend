<template>
  <!-- component -->
  <div class="w-full my-4 pt-4 pb-2">
    <div class="flex flex-col">
      <div class="flex flex-row justify-around pb-3 z-10">
        <div class="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
        <div class="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
        <div class="w-[20px] h-[20px] bg-grey-40 rounded-full"></div>
        <div class="w-[20px] h-[20px] bg-grey-40 rounded-full"></div>
      </div>
      <div class="block relative w-[75%] top-[-23px] self-center">
        <div class="h-0.5 bg-grey-40 z-8"></div>
        <div class="block relative top-[-2px] w-1/3 h-0.5 bg-green-500 z-9"></div>
      </div>
    </div>

    <div class="flex content-center text-center text-dark">
      <div class="w-1/4">Order</div>
      <div class="w-1/4">Importing</div>
      <div class="w-1/4">Repayment</div>
      <div class="w-1/4">Shipping</div>
    </div>
  </div>
</template>
