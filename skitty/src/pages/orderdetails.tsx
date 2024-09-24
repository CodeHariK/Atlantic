import { useParams } from "@solidjs/router";

import SpaceLayout from '../layouts/SpaceLayout';

export function OrderDetails() {
   const params = useParams();

   return (
      <SpaceLayout one title={'Order Details ' + params.orderId}>

         <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
               <nav class="mb-4 flex" aria-label="Breadcrumb">
                  <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                     <li class="inline-flex items-center">
                        <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-700 dark:text-gray-400 dark:hover:text-white">
                           <svg class="me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                           </svg>
                           Home
                        </a>
                     </li>
                     <li>
                        <div class="flex items-center">
                           <svg class="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                           </svg>
                           <a href="#" class="ms-1 text-sm font-medium text-gray-700 hover:text-primary-700 dark:text-gray-400 dark:hover:text-white md:ms-2">My account</a>
                        </div>
                     </li>
                     <li aria-current="page">
                        <div class="flex items-center">
                           <svg class="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                           </svg>
                           <span class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">Service</span>
                        </div>
                     </li>
                  </ol>
               </nav>
               <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6">Service reparation form</h2>
               <div class="gap-8 lg:flex">
                  <aside id="sidebar" class="hidden h-full w-80 shrink-0 overflow-y-auto border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:block lg:rounded-lg">
                     <button id="dropdownUserNameButton" data-dropdown-toggle="dropdownUserName1" type="button" class="dark:hover-bg-gray-700 mb-3 flex w-full items-center justify-between rounded-lg bg-white p-2 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        <span class="sr-only">Open user menu</span>
                        <div class="flex w-full items-center justify-between">
                           <div class="flex items-center">
                              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" class="mr-3 h-8 w-8 rounded-md" alt="Bonnie avatar" />
                              <div class="text-left">
                                 <div class="mb-0.5 font-semibold leading-none text-gray-900 dark:text-white">Jese Leos (Personal)</div>
                                 <div class="text-sm text-gray-500 dark:text-gray-400">jese@flowbite.com</div>
                              </div>
                           </div>
                           <svg class="h-5 w-5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                           </svg>
                        </div>
                     </button>
                     <div id="dropdownUserName1" class="z-10 hidden w-[294px] divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700" data-popper-placement="bottom">
                        <a href="#" class="flex items-center rounded px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600">
                           <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-8 w-8 rounded" alt="Michael avatar" />
                           <div class="text-left">
                              <div class="mb-0.5 font-semibold leading-none text-gray-900 dark:text-white">Flowbite LLC (Company)</div>
                              <div class="text-sm text-gray-500 dark:text-gray-400">company@flowbite.com</div>
                           </div>
                        </a>
                     </div>
                     <div class="mb-4 w-full border-y border-gray-100 py-4 dark:border-gray-700">
                        <ul class="grid grid-cols-3 gap-2">
                           <li>
                              <a href="#" class="group flex flex-col items-center justify-center rounded-xl bg-primary-50 p-2.5 hover:bg-primary-100 dark:bg-primary-900 dark:hover:bg-primary-800">
                                 <span class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary-200 dark:bg-primary-800  dark:group-hover:bg-primary-700">
                                    <svg class="h-5 w-5 text-primary-700 dark:text-primary-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                       <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                 </span>
                                 <span class="text-sm font-medium text-primary-700 dark:text-primary-300">Profile</span>
                              </a>
                           </li>
                           <li>
                              <a href="#" class="group flex flex-col items-center justify-center rounded-xl bg-purple-50 p-2.5 hover:bg-purple-100 dark:bg-purple-900 dark:hover:bg-purple-800">
                                 <span class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-200 dark:bg-purple-800  dark:group-hover:bg-purple-700">
                                    <svg class="h-5 w-5 text-purple-600 dark:text-purple-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.875 1.25 3.875 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.155-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z" />
                                    </svg>
                                 </span>
                                 <span class="text-sm font-medium text-purple-600 dark:text-purple-300">Gifts</span>
                              </a>
                           </li>
                           <li>
                              <a href="#" class="group flex flex-col items-center justify-center rounded-xl bg-teal-50 p-2.5 hover:bg-teal-100 dark:bg-teal-900 dark:hover:bg-teal-800">
                                 <span class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 group-hover:bg-teal-200 dark:bg-teal-800  dark:group-hover:bg-teal-700">
                                    <svg class="h-5 w-5 text-teal-600 dark:text-teal-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" />
                                    </svg>
                                 </span>
                                 <span class="text-sm font-medium text-teal-600 dark:text-teal-300">Wallet</span>
                              </a>
                           </li>
                        </ul>
                     </div>

                     <ul class="space-y-2">
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                              </svg>
                              <span class="ml-3">My orders</span>
                           </a>
                        </li>
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                              </svg>
                              <span class="ml-3 flex-1 whitespace-nowrap">Reviews</span>
                           </a>
                        </li>
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                              </svg>
                              <span class="ml-3 flex-1 whitespace-nowrap">Delivery addresses</span>
                           </a>
                        </li>
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                 <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                              <span class="ml-3 flex-1 whitespace-nowrap">Recently viewed</span>
                           </a>
                        </li>
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                              </svg>
                              <span class="ml-3 flex-1 whitespace-nowrap">Favourite items</span>
                           </a>
                        </li>
                     </ul>
                     <ul class="mt-5 space-y-2 border-t border-gray-100 pt-5 dark:border-gray-700">
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
                                 />
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                              </svg>
                              <span class="ml-3 flex-1 whitespace-nowrap">Settings</span>
                           </a>
                        </li>
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-red-600 hover:bg-red-100 dark:text-red-500 dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 flex-shrink-0 text-red-600 transition duration-75 dark:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                              </svg>
                              <span class="ml-3 flex-1 whitespace-nowrap">Log out</span>
                           </a>
                        </li>
                     </ul>
                  </aside>
                  <form action="#" class="w-full space-y-6 lg:space-y-8">
                     <div class="space-y-6 sm:space-y-8">
                        <ol class="flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 sm:justify-center md:flex-row md:items-center lg:gap-6">
                           <li class="flex items-center gap-2 md:flex-1 md:flex-col md:gap-1.5 lg:flex-none">
                              <svg class="h-5 w-5 text-primary-700 dark:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                              <p class="text-sm font-medium leading-tight text-primary-700 dark:text-primary-500">My products</p>
                           </li>

                           <div class="hidden h-px w-8 shrink-0 bg-gray-200 dark:bg-gray-700 md:block xl:w-16"></div>

                           <li class="flex items-center gap-2 md:flex-1 md:flex-col md:gap-1.5 lg:flex-none">
                              <svg class="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                              <p class="text-sm font-medium leading-tight text-gray-500 dark:text-gray-400">Defect reason</p>
                           </li>

                           <div class="hidden h-px w-8 shrink-0 bg-gray-200 dark:bg-gray-700 md:block xl:w-16"></div>

                           <li class="flex items-center gap-2 md:flex-1 md:flex-col md:gap-1.5 lg:flex-none">
                              <svg class="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                              <p class="text-sm font-medium leading-tight text-gray-500 dark:text-gray-400">Select date</p>
                           </li>

                           <div class="hidden h-px w-8 shrink-0 bg-gray-200 dark:bg-gray-700 md:block xl:w-16"></div>

                           <li class="flex items-center gap-2 md:flex-1 md:flex-col md:gap-1.5 lg:flex-none">
                              <svg class="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                              <p class="text-sm font-medium leading-tight text-gray-500 dark:text-gray-400">Confirmation</p>
                           </li>
                        </ol>
                     </div>

                     <div class="space-y-6">
                        <div class="mb-4 rounded-lg bg-primary-50 p-4 text-sm text-primary-800 dark:bg-gray-800 dark:text-primary-400 sm:text-base" role="alert">
                           <p class="mb-3 font-medium">What you need to know so that the process of sending the product for service goes smoothly:</p>
                           <ol class="mb-3 list-outside list-decimal space-y-2 ps-4">
                              <li>You can send the products sold by eMAG for service by completing the product repair form. To service the products sold by eMAG Marketplace partners, follow the steps shown in the pages dedicated to them.</li>
                              <li>Make sure that the product you want to send for service has an electronic warranty certificate (provided by Depanero), which you can find in the My Warranties section of your customer account and in the email you received when completing the order. Then complete the product repair form below.</li>
                              <li>If in the My Warranties section the product appears with a printed warranty certificate (which came in the box, together with the product), provided by the manufacturer, contact one of the authorized services specified in it to benefit from the repair of the product.</li>
                           </ol>
                           <p>You are already logged in as <span class="font-medium">Bonnie Green</span>. Click <a class="font-medium underline hover:no-underline" href="#">here</a> to use another account.</p>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">1. Select the product you want to repair:</h3>

                        <div class="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
                           <div class="flex items-center gap-8 p-6 sm:items-start lg:items-center">
                              <div>
                                 <input id="product1" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-700 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                 <label for="product1" class="sr-only"> Product 1 </label>
                              </div>

                              <div class="min-w-0 flex-1 gap-14 xl:flex xl:items-center">
                                 <div class="min-w-0 max-w-xl flex-1 gap-6 sm:flex sm:items-center">
                                    <a href="#" class="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                                       <img class="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                       <img class="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                    </a>
                                    <a href="#" class="mt-4 font-medium text-gray-900 hover:underline dark:text-white sm:mt-0"> PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU</a>
                                 </div>

                                 <div class="mt-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-between md:items-center xl:mt-0 xl:flex-col xl:items-start">
                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-base font-normal text-gray-500 dark:text-gray-400 xl:w-36">Order Number:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">
                                          <a href="#" class="hover:underline">#73742364</a>
                                       </dd>
                                    </dl>

                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-base font-normal text-gray-500 dark:text-gray-400 xl:w-36">Return Term:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">21.07.2023</dd>
                                    </dl>
                                 </div>
                              </div>
                           </div>

                           <div class="flex items-center gap-8 p-6 sm:items-start lg:items-center">
                              <div>
                                 <input id="product2" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-700 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                 <label for="product2" class="sr-only"> Product 2 </label>
                              </div>

                              <div class="min-w-0 flex-1 gap-14 xl:flex xl:items-center">
                                 <div class="min-w-0 max-w-xl flex-1 gap-6 sm:flex sm:items-center">
                                    <a href="#" class="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                                       <img class="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="imac image" />
                                       <img class="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="imac image" />
                                    </a>
                                    <a href="#" class="mt-4 font-medium text-gray-900 hover:underline dark:text-white sm:mt-0"> Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum Case with Midnight Sport Band </a>
                                 </div>

                                 <div class="mt-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-between md:items-center xl:mt-0 xl:flex-col xl:items-start">
                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Order Number:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">
                                          <a href="#" class="hover:underline">#45632736</a>
                                       </dd>
                                    </dl>

                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Return Term:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">26.07.2023</dd>
                                    </dl>
                                 </div>
                              </div>
                           </div>

                           <div class="flex items-center gap-8 p-6 sm:items-start lg:items-center">
                              <div>
                                 <input checked id="product3" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-700 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                 <label for="product3" class="sr-only"> Product 3 </label>
                              </div>

                              <div class="min-w-0 flex-1 gap-14 xl:flex xl:items-center">
                                 <div class="min-w-0 max-w-xl flex-1 gap-6 sm:flex sm:items-center">
                                    <a href="#" class="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                                       <img class="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg" alt="imac image" />
                                       <img class="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg" alt="imac image" />
                                    </a>
                                    <a href="#" class="mt-4 font-medium text-gray-900 hover:underline dark:text-white sm:mt-0"> Sony Playstation 5 Digital Edition Console with Extra Blue Controller, and White PULSE 3D Headset </a>
                                 </div>

                                 <div class="mt-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-between md:items-center xl:mt-0 xl:flex-col xl:items-start">
                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Order Number:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">
                                          <a href="#" class="hover:underline">#54628495</a>
                                       </dd>
                                    </dl>

                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Return Term:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">24.07.2023</dd>
                                    </dl>
                                 </div>
                              </div>
                           </div>

                           <div class="flex items-center gap-8 p-6 sm:items-start lg:items-center">
                              <div>
                                 <input id="product4" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-700 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                 <label for="product4" class="sr-only"> Product 4 </label>
                              </div>

                              <div class="min-w-0 flex-1 gap-14 xl:flex xl:items-center">
                                 <div class="min-w-0 max-w-xl flex-1 gap-6 sm:flex sm:items-center">
                                    <a href="#" class="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                                       <img class="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg" alt="imac image" />
                                       <img class="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg" alt="imac image" />
                                    </a>
                                    <a href="#" class="mt-4 font-medium text-gray-900 hover:underline dark:text-white sm:mt-0"> APPLE iPhone 15 5G phone, 256GB, Gold </a>
                                 </div>

                                 <div class="mt-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-between md:items-center xl:mt-0 xl:flex-col xl:items-start">
                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Order Number:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">
                                          <a href="#" class="hover:underline">#64534294</a>
                                       </dd>
                                    </dl>

                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Return Term:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">26.07.2023</dd>
                                    </dl>
                                 </div>
                              </div>
                           </div>

                           <div class="flex items-center gap-8 p-6 sm:items-start lg:items-center">
                              <div>
                                 <input id="product5" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-700 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                 <label for="product5" class="sr-only"> Product 5 </label>
                              </div>

                              <div class="min-w-0 flex-1 gap-14 xl:flex xl:items-center">
                                 <div class="min-w-0 max-w-xl flex-1 gap-6 sm:flex sm:items-center">
                                    <a href="#" class="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                                       <img class="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-light.svg" alt="imac image" />
                                       <img class="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-dark.svg" alt="imac image" />
                                    </a>
                                    <a href="#" class="mt-4 font-medium text-gray-900 hover:underline dark:text-white sm:mt-0"> Xbox Series X Diablo IV Bundle + Xbox Wireless Controller Carbon Black + Dual Controller Charge Docker </a>
                                 </div>

                                 <div class="mt-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-between md:items-center xl:mt-0 xl:flex-col xl:items-start">
                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Order Number:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">
                                          <a href="#" class="hover:underline">#98475625</a>
                                       </dd>
                                    </dl>

                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Return Term:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">21.07.2023</dd>
                                    </dl>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div class="gap-4 sm:flex sm:items-center sm:justify-between">
                           <button type="button" class="w-full rounded-lg  border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">Cancel</button>
                           <button type="submit" class="mt-4 flex w-full items-center justify-center rounded-lg border border-primary-700 bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:border-primary-800 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-primary-700 dark:bg-primary-600 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800  sm:mt-0 sm:w-auto">Next: Return reason</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </section>

         <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
               <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the delivery of order #957684673</h2>

               <div class="mt-6 sm:mt-8 lg:flex lg:gap-8">
                  <div class="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
                     <div class="space-y-4 p-6">
                        <div class="flex items-center gap-6">
                           <a href="#" class="h-14 w-14 shrink-0">
                              <img class="h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                              <img class="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                           </a>

                           <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, macOS Sonoma, Blue, Keyboard layout INT </a>
                        </div>

                        <div class="flex items-center justify-between gap-4">
                           <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> BJ8364850</p>

                           <div class="flex items-center justify-end gap-4">
                              <p class="text-base font-normal text-gray-900 dark:text-white">x1</p>

                              <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">$1,499</p>
                           </div>
                        </div>
                     </div>

                     <div class="space-y-4 p-6">
                        <div class="flex items-center gap-6">
                           <a href="#" class="h-14 w-14 shrink-0">
                              <img class="h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="phone image" />
                              <img class="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="phone image" />
                           </a>

                           <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum Case with Midnight Sport Band </a>
                        </div>

                        <div class="flex items-center justify-between gap-4">
                           <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> BJ8364850</p>

                           <div class="flex items-center justify-end gap-4">
                              <p class="text-base font-normal text-gray-900 dark:text-white">x2</p>

                              <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">$598</p>
                           </div>
                        </div>
                     </div>

                     <div class="space-y-4 p-6">
                        <div class="flex items-center gap-6">
                           <a href="#" class="h-14 w-14 shrink-0">
                              <img class="h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg" alt="console image" />
                              <img class="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg" alt="console image" />
                           </a>

                           <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> Sony Playstation 5 Digital Edition Console with Extra Blue Controller, White PULSE 3D Headset and Surge Dual Controller </a>
                        </div>

                        <div class="flex items-center justify-between gap-4">
                           <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> BJ8364850</p>

                           <div class="flex items-center justify-end gap-4">
                              <p class="text-base font-normal text-gray-900 dark:text-white">x1</p>

                              <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">$799</p>
                           </div>
                        </div>
                     </div>

                     <div class="space-y-4 p-6">
                        <div class="flex items-center gap-6">
                           <a href="#" class="h-14 w-14 shrink-0">
                              <img class="h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-light.svg" alt="xbox image" />
                              <img class="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-dark.svg" alt="xbox image" />
                           </a>

                           <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> Xbox Series X Diablo IV Bundle + 2 Xbox Wireless Controller Carbon Black + Controller Charger </a>
                        </div>

                        <div class="flex items-center justify-between gap-4">
                           <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> BJ8364850</p>

                           <div class="flex items-center justify-end gap-4">
                              <p class="text-base font-normal text-gray-900 dark:text-white">x1</p>

                              <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">$699</p>
                           </div>
                        </div>
                     </div>

                     <div class="space-y-4 p-6">
                        <div class="flex items-center gap-6">
                           <a href="#" class="h-14 w-14 shrink-0">
                              <img class="h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg" alt="phone image" />
                              <img class="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg" alt="phone image" />
                           </a>

                           <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> APPLE iPhone 15 5G phone, 256GB, Gold </a>
                        </div>

                        <div class="flex items-center justify-between gap-4">
                           <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> BJ8364850</p>

                           <div class="flex items-center justify-end gap-4">
                              <p class="text-base font-normal text-gray-900 dark:text-white">x3</p>

                              <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">$2,997</p>
                           </div>
                        </div>
                     </div>

                     <div class="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                        <div class="space-y-2">
                           <dl class="flex items-center justify-between gap-4">
                              <dt class="font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                              <dd class="font-medium text-gray-900 dark:text-white">$6,592.00</dd>
                           </dl>

                           <dl class="flex items-center justify-between gap-4">
                              <dt class="font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                              <dd class="text-base font-medium text-green-500">-$299.00</dd>
                           </dl>

                           <dl class="flex items-center justify-between gap-4">
                              <dt class="font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                              <dd class="font-medium text-gray-900 dark:text-white">$99</dd>
                           </dl>

                           <dl class="flex items-center justify-between gap-4">
                              <dt class="font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                              <dd class="font-medium text-gray-900 dark:text-white">$799</dd>
                           </dl>
                        </div>

                        <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                           <dt class="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                           <dd class="text-lg font-bold text-gray-900 dark:text-white">$7,191.00</dd>
                        </dl>
                     </div>
                  </div>

                  <div class="mt-6 grow sm:mt-8 lg:mt-0">
                     <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Order history</h3>

                        <ol class="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                           <li class="mb-10 ms-6">
                              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                 <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                                 </svg>
                              </span>
                              <h4 class="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Estimated delivery in 24 Nov 2023</h4>
                              <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Products delivered</p>
                           </li>

                           <li class="mb-10 ms-6">
                              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                 <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                 </svg>
                              </span>
                              <h4 class="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Today</h4>
                              <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Products being delivered</p>
                           </li>

                           <li class="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                 <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                 </svg>
                              </span>
                              <h4 class="mb-0.5 font-semibold">23 Nov 2023, 15:15</h4>
                              <p class="text-sm">Products in the courier's warehouse</p>
                           </li>

                           <li class="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                 <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                 </svg>
                              </span>
                              <h4 class="mb-0.5 text-base font-semibold">22 Nov 2023, 12:27</h4>
                              <p class="text-sm">Products delivered to the courier - DHL Express</p>
                           </li>

                           <li class="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                 <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                 </svg>
                              </span>
                              <h4 class="mb-0.5 font-semibold">19 Nov 2023, 10:47</h4>
                              <p class="text-sm">Payment accepted - VISA Credit Card</p>
                           </li>

                           <li class="ms-6 text-primary-700 dark:text-primary-500">
                              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                 <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                 </svg>
                              </span>
                              <div>
                                 <h4 class="mb-0.5 font-semibold">19 Nov 2023, 10:45</h4>
                                 <a href="#" class="text-sm font-medium hover:underline">Order placed - Receipt #647563</a>
                              </div>
                           </li>
                        </ol>

                        <div class="gap-4 sm:flex sm:items-center">
                           <button type="button" class="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel the order</button>

                           <a href="#" class="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Order details</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

      </SpaceLayout>
   );
}
