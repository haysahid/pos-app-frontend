<template>
  <main class="ml-[250px] max-w-[100%] mt-[72px]">
    <form action="" class="w-full flex justify-start">
      <section
        class="flex felx-row justify-between gap-6 px-[24px] pt-[24px] flex-grow max-w-[60%] items-start overflow-y-auto"
      >
        <OrderForm />
      </section>
      <CustomerForm class="hidden" />
      <CreateOrderDetails class="" />
    </form>
  </main>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>
