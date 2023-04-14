<template>
  <main class="ml-[250px] max-w-[100%] flex justify-start mt-[72px]">
    <section
      class="flex felx-row justify-between gap-6 px-[24px] pt-[24px] flex-grow items-start overflow-y-auto max-w-full"
    >
      <div class="flex flex-col flex-grow">
        <div class="flex justify-between mb-4">
          <h1 class="text-[24px] font-bold text-dark self-center">
            Order List
          </h1>
          <button class="btn btn-primary self-center">+ Add Order</button>
        </div>
        <div class="flex flex-col flex-grow justify-between gap-4">
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
}
</script>
