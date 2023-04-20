import HeaderBar from '~/components/HeaderBar.vue'; import Sidebar from
'~/components/sidebar.vue';

<template>
  <body>
    <SideBar />
    <HeaderBar />
    <svg
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      class="fixed left-[220px] top-[60px] w-3 h-3 max-md:hidden max-lg:left-[88px]"
    >
      <path d="M24 0H0V24C0 10.7451 10.7452 0 24 0Z" />
    </svg>
    <Nuxt />
  </body>
</template>
