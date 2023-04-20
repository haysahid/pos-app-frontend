<template>
  <header
    class="bg-white pl-[250px] pr-[24px] max-md:pl-[24px] max-md:pr-[21px] top-0 fixed w-full z-[900] flex flex-row justify-between h-[60px] md:justify-end"
  >
    <div class="flex items-center justify-between md:hidden">
      <a href="#" class="flex justify-center items-center gap-2 px-[2.5px]">
        <div class="p-2 bg-primary rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clip-rule="evenodd"
            />
            <path
              d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z"
            />
          </svg>
        </div>
        <p class="text-xl font-bold text-dark md:hidden line-clamp-1">
          Inventory App
        </p>
      </a>
    </div>
    <nav class="flex items-center justify-between" aria-label="Global">
      <div class="flex flex-1 justify-end">
        <a
          href="#"
          class="flex items-center gap-x-1 text-sm leading-6 text-grey-60"
        >
          <img src="/assets/images/user.png" alt="" class="w-[32px] mr-1" />
          {{ this.$auth.user.name }}
          <svg
            class="h-5 w-5 flex-none text-grey-40"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </nav>
  </header>
</template>
