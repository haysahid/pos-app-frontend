<template>
  <div class="flex flex-col flex-grow">
    <div class="flex justify-between mb-4">
      <h1 class="text-[24px] font-bold text-dark py-4">Customer List</h1>
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
</template>
