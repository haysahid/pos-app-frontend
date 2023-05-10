<template>
  <div
    class="flex flex-col card gap-1 flex-grow p-[16px] justify-between"
  >
    <p class="text-grey-80">{{ payment_account.method }}</p>
    <div class="font-bold text-dark text-[16px] mb-2 line-clamp-1">
      {{ payment_account.account_name }}
    </div>
    <p class="text-grey-60 line-clamp-1">
      {{ payment_account.number }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    payment_account: null,
  },
}
</script>
