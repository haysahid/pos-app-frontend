<template>
  <main class="ml-[250px]">
    <section
      class="flex felx-row flex-wrap justify-between gap-6 px-[24px] pt-[24px]"
    >
      <div class="flex flex-col flex-grow">
        <h1 class="text-[24px] font-bold text-dark pt-2 pb-6">Overview</h1>
        <div class="flex flex-row flex-grow justify-between gap-4">
          <div class="card flex-grow">
            <p class="text-center text-grey-40">Card</p>
          </div>
          <div class="card flex-grow">
            <p class="text-center text-grey-40">Card</p>
          </div>
          <div class="card flex-grow">
            <p class="text-center text-grey-40">Card</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Dashboard from '~/layouts/dashboard.vue'

export default {
  layout: 'dashboard',
}
</script>
