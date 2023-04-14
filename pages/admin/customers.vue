<template>
    <main class="ml-[250px] max-w-[100%] flex justify-start mt-[72px]">
      <section
        class="flex felx-row justify-between gap-6 px-[24px] pt-[24px] flex-grow max-w-[60%] items-start overflow-y-auto"
      >
        <div class="flex flex-col flex-grow">
          <div class="flex justify-between mb-4">
              <h1 class="text-[24px] font-bold text-dark self-center">Customer List</h1>
              <button class="btn btn-primary self-center">+ Add Customer</button>
          </div>
          <div class="flex flex-col flex-grow justify-between gap-4">
            <CustomerCard />
            <CustomerCard />
            <CustomerCard />
            <CustomerCard />
            <CustomerCard />
            <CustomerCard />
            <CustomerCard />
            <CustomerCard />
          </div>
        </div>
      </section>
      <CustomerForm class="" />
    </main>
  </template>
  
  <script>
  export default {
    layout: 'dashboard',
  }
  </script>
  