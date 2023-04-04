<template>
  <div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-start justify-start"></div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 h-full bg-base-100 text-base-content border">
        <!-- Sidebar content here -->
        <li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
        <li><RouterLink to="/inbox">Inbox / Notifications</RouterLink></li>
        <div class="dropdown dropdown-bottom">
          <li tabindex="0">
            <a class="justify-between">
              Travel Management System
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                />
              </svg>
            </a>
            <ul class="p-2 bg-base-100">
              <li><a>Request Trip</a></li>
              <li><a>Settlement</a></li>
              <li><a>Claim Reimbusement</a></li>
              <li tabindex="0">
                <a class="justify-between">
                  Cash Advance
                  <svg
                    class="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                    />
                  </svg>
                </a>
                <ul class="p-2 bg-base-100">
                  <li><a>Cash Advance Travel</a></li>
                  <li><a>Cash Advance Non Travel</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </div>
        <div class="dropdown dropdown-bottom">
          <li tabindex="0">
            <a class="justify-between">
              Facility Service System
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                />
              </svg>
            </a>
            <ul class="p-2 bg-base-100">
              <li><a>Meeting Room</a></li>
              <li><a>Black Out</a></li>
              <li><a>Document Delivery</a></li>
            </ul>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
