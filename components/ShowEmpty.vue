<template>
  <div class="flex flex-col items-center h-full justify-center">
    <div class="flex flex-col items-center gap-4">
      <!-- Image -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-[80px] h-[80px] stroke-grey-20"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>

      <!-- Message -->
      <div class="text-grey-40 text-center">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: '',
  },
}
</script>
