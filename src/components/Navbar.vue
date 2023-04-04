<template>
  <nav class="fixed top-0 z-50 w-full bg-white border border-gray-200">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <a to="/" class="flex ml-2 md:mr-24">
            <label
              for="my-drawer-2"
              class="btn btn-ghost drawer-button capitalize lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-5 h-5 stroke-current lg:hidden"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>

            <!-- icon here -->
            <span
              class="capitalize self-center text-xl font-semibold sm:text-2xl whitespace-nowrap"
            >
              ABM
            </span>
          </a>
        </div>
        <div></div>
        <div class="dropdown dropdown-end">
          <div class="grid grid-flow-col auto-cols-max">
            <p class="grid items-center mx-4">Halo, User</p>
            <label tabIndex="{0}" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src="" alt="" />
              </div>
            </label>

            <ul
              tabIndex="{0}"
              class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a class="justify-between"> Profile </a>
              </li>
              <li>
                <a to="/" class="capitalize"> Logout </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup></script>
