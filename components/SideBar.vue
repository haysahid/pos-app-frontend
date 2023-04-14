<template>
  <div
    class="block fixed max-w-[250px] w-full overflow-y-auto h-full bg-white z-[999] top-0"
    id="sidebarHRIS"
  >
    <div class="px-6 py-[20px] gap-y-8 flex flex-col">
      <div class="flex items-center justify-between">
        <a href="#" class="flex justify-center">
          <img src="/assets/svgs/logo-type.svg" alt="" class="max-w-[180px]" />
        </a>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-sm text-grey-80">Daily Use</div>
        <NuxtLink :to="{ name: 'admin-overview' }" class="nav-link">
          <img src="/assets/svgs/ic-grid.svg" alt="" />
          Overview
        </NuxtLink>
        <NuxtLink :to="{ name: 'admin-products' }" class="nav-link">
          <img src="/assets/svgs/ic-users.svg" alt="" />
          Products
        </NuxtLink>
        <NuxtLink :to="{ name: 'admin-customers' }" class="nav-link">
          <img src="/assets/svgs/ic-briefcase.svg" alt="" />
          Customers
        </NuxtLink>
        <NuxtLink :to="{ name: 'admin-createorder' }" class="nav-link">
          <img src="/assets/svgs/ic-flag.svg" alt="" />
          Create Order
        </NuxtLink>
        <NuxtLink :to="{ name: 'admin-orders' }" class="nav-link">
          <img src="/assets/svgs/ic-briefcase.svg" alt="" />
          Orders
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
