
import SpaceLayout from '../layouts/SpaceLayout';
import { Pagination } from "../components/pagination";
import { SuperTable } from '../components/table';
import { TableHeadingIcon } from '../components/svg';
import { H3, P, SmallBadgeText } from '../components/heading';
import { MaterialButton, OutlinedButton } from '../components/button';

export function MyOrders() {

   return (
      <SpaceLayout one title={'My Details'}>

         <SuperTable
            width={900}

            table={{
               heading: [
                  <>User Agent {TableHeadingIcon()}</>,
                  <>Started {TableHeadingIcon()}</>,
                  <>Active {TableHeadingIcon()}</>,
                  <>Valid {TableHeadingIcon()}</>,
                  <>Revoke</>,
               ],
               class: [
                  "max-w-64",
               ],
               rows: [
                  [
                     <P>{"s.agent"}</P>,
                     <P>{"s.iat.toString()"}</P>,
                     <SmallBadgeText>Active {"Current"}</SmallBadgeText>,
                     <P>{"s.exp.toString()"}</P>,
                  ]

               ],
            }}
            headerstart={<div>
               <H3>Login sessions</H3>
            </div>}
            headerend={
               <div class="flex flex-col gap-2 shrink-0 sm:flex-row">
                  {/* <MaterialButton onClick={handleRefresh} disabled={loading()} class='mt-1 mb-1 w-full justify-center' type='submit'>
                           <p class='text-sm'>{loading() ? "Loading..." : "Refresh"}</p>
                        </MaterialButton> */}
                  <OutlinedButton>
                     Revoke All
                  </OutlinedButton>
                  <MaterialButton>
                     Logout
                  </MaterialButton>
               </div>
            }
            footerstart={
               <P>Page 1 of 10</P>
            }
            footerend={
               <div class="flex gap-1">
                  <OutlinedButton>Previous</OutlinedButton>
                  <OutlinedButton>Next</OutlinedButton>
               </div>
            }
         ></SuperTable>

         <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
               <div class="mx-auto max-w-5xl">
                  <div class="gap-4 sm:flex sm:items-center sm:justify-between">
                     <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>

                     <div class="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                        <div>
                           <label for="order-type" class="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select order type</label>
                           <select id="order-type" class="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                              <option selected>All orders</option>
                              <option value="pre-order">Pre-order</option>
                              <option value="transit">In transit</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                           </select>
                        </div>

                        <span class="inline-block text-gray-500 dark:text-gray-400"> from </span>

                        <div>
                           <label for="duration" class="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select duration</label>
                           <select id="duration" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                              <option selected>this week</option>
                              <option value="this month">this month</option>
                              <option value="last 3 months">the last 3 months</option>
                              <option value="lats 6 months">the last 6 months</option>
                              <option value="this year">this year</option>
                           </select>
                        </div>
                     </div>
                  </div>

                  <div class="mt-6 flow-root sm:mt-8">
                     <div class="divide-y divide-gray-200 dark:divide-gray-700">

                        <div class="flex flex-wrap items-center gap-y-4 py-6">
                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                              <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                 <a href="#" class="hover:underline">#FWB127364372</a>
                              </dd>
                           </dl>

                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                              <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">20.12.2023</dd>
                           </dl>

                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                              <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">$4,756</dd>
                           </dl>

                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                              <dd class="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                 <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                                 </svg>
                                 Pre-order
                              </dd>
                           </dl>

                           <div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                              <button type="button" class="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Cancel order</button>
                              <a href="#" class="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</a>
                           </div>
                        </div>

                        <div class="flex flex-wrap items-center gap-y-4 py-6">
                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                              <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                 <a href="#" class="hover:underline">#FWB125467980</a>
                              </dd>
                           </dl>

                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                              <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">11.12.2023</dd>
                           </dl>

                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                              <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">$499</dd>
                           </dl>

                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                              <dd class="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                 <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                 </svg>
                                 In transit
                              </dd>
                           </dl>

                           <div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                              <button type="button" class="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Cancel order</button>
                              <a href="#" class="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</a>
                           </div>
                        </div>

                        <div class="flex flex-wrap items-center gap-y-4 py-6">
                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                              <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                 <a href="#" class="hover:underline">#FWB139485607</a>
                              </dd>
                           </dl>

                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                              <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">08.12.2023</dd>
                           </dl>

                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                              <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">$85</dd>
                           </dl>

                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                              <dd class="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                 <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                 </svg>
                                 Confirmed
                              </dd>
                           </dl>

                           <div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                              <button type="button" class="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto">Order again</button>
                              <a href="#" class="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</a>
                           </div>
                        </div>

                        <div class="flex flex-wrap items-center gap-y-4 py-6">
                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                              <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                 <a href="#" class="hover:underline">#FWB159873546</a>
                              </dd>
                           </dl>

                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                              <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">04.06.2023</dd>
                           </dl>

                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                              <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">$90</dd>
                           </dl>

                           <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                              <dd class="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                 <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                 </svg>
                                 Cancelled
                              </dd>
                           </dl>

                           <div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                              <button type="button" class="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto">Order again</button>
                              <a href="#" class="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</a>
                           </div>
                        </div>
                     </div>
                  </div>

                  {Pagination()}
               </div>
            </div>
         </section>

      </SpaceLayout>
   );
}

export function OrderModal() {
   return (
      <div id="billingInformationModal" tabindex="-1" aria-hidden="true" class="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-auto w-full max-h-full items-center justify-center overflow-y-auto overflow-x-hidden antialiased md:inset-0">
         <div class="relative max-h-auto w-full max-h-full max-w-lg p-4">
            <div class="relative rounded-lg bg-white shadow dark:bg-gray-800">
               <div class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Billing Information</h3>
                  <button type="button" class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="billingInformationModal">
                     <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                     </svg>
                     <span class="sr-only">Close modal</span>
                  </button>
               </div>
               <form class="p-4 md:p-5">
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-5">
                     <div class="flex items-center gap-4 sm:col-span-2">
                        <div class="flex items-center">
                           <input id="company_address_billing_modal" data-collapse-toggle="company-info-container-modal" aria-expanded="false" type="checkbox" value="" name="address-type-modal" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                           <label for="company_address_billing_modal" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Order as a company </label>
                        </div>
                     </div>

                     <div class="grid grid-cols-2 gap-4 sm:col-span-2" id="company-info-container-modal">
                        <div>
                           <label for="company_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Company name </label>
                           <input type="text" id="company_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Flowbite LLC" />
                        </div>

                        <div>
                           <label for="vat_number" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> VAT number </label>
                           <input type="text" id="vat_number" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="DE42313253" />
                        </div>
                     </div>

                     <div class="sm:col-span-2">
                        <div class="mb-2 flex items-center gap-1">
                           <label for="saved-address-modal" class="block text-sm font-medium text-gray-900 dark:text-white"> Saved Address </label>
                           <svg data-tooltip-target="saved-address-modal-desc-2" data-tooltip-trigger="hover" class="h-4 w-4 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                              <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                           </svg>
                        </div>
                        <select id="saved-address-modal" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                           <option selected>Choose one of your saved address</option>
                           <option value="address-1">San Francisco, California, United States, 3454, Scott Street</option>
                           <option value="address-2">New York, United States, Broadway 10012</option>
                        </select>
                        <div id="saved-address-modal-desc-2" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                           Choose one of your saved addresses
                           <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                     </div>

                     <div>
                        <label for="first_name_billing_modal" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> First Name* </label>
                        <input type="text" id="first_name_billing_modal" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter your first name" required />
                     </div>

                     <div>
                        <label for="last_name_billing_modal" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Last Name* </label>
                        <input type="text" id="last_name_billing_modal" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter your last name" required />
                     </div>

                     <div class="sm:col-span-2">
                        <label for="phone-input_billing_modal" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number* </label>
                        <div class="flex items-center">
                           <button id="dropdown_phone_input__button_billing_modal" data-dropdown-toggle="dropdown_phone_input_billing_modal" class="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700" type="button">
                              <svg fill="none" aria-hidden="true" class="me-2 h-4 w-4" viewBox="0 0 20 15">
                                 <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                 <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                 </mask>
                                 <g mask="url(#a)">
                                    <path fill="#D02F44" fill-rule="evenodd" d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z" clip-rule="evenodd" />
                                    <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                                    <g filter="url(#filter0_d_343_121520)">
                                       <path
                                          fill="url(#paint0_linear_343_121520)"
                                          fill-rule="evenodd"
                                          d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                          clip-rule="evenodd"
                                       />
                                    </g>
                                 </g>
                                 <defs>
                                    <linearGradient id="paint0_linear_343_121520" x1=".933" x2=".933" y1="1.433" y2="6.1" gradientUnits="userSpaceOnUse">
                                       <stop stop-color="#fff" />
                                       <stop offset="1" stop-color="#F0F0F0" />
                                    </linearGradient>
                                    <filter id="filter0_d_343_121520" width="6.533" height="5.667" x=".933" y="1.433" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                       <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                       <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                       <feOffset dy="1" />
                                       <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                       <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_343_121520" />
                                       <feBlend in="SourceGraphic" in2="effect1_dropShadow_343_121520" result="shape" />
                                    </filter>
                                 </defs>
                              </svg>
                              +1
                              <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                              </svg>
                           </button>
                           <div id="dropdown_phone_input_billing_modal" class="z-10 hidden w-56 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700">
                              <ul class="p-2 text-sm font-medium text-gray-700 dark:text-gray-200" aria-labelledby="dropdown_phone_input__button_billing_modal">
                                 <li>
                                    <button type="button" class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                       <span class="inline-flex items-center">
                                          <svg fill="none" aria-hidden="true" class="me-2 h-4 w-4" viewBox="0 0 20 15">
                                             <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             </mask>
                                             <g mask="url(#a)">
                                                <path fill="#D02F44" fill-rule="evenodd" d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z" clip-rule="evenodd" />
                                                <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                                                <g filter="url(#filter0_d_343_121520)">
                                                   <path
                                                      fill="url(#paint0_linear_343_121520)"
                                                      fill-rule="evenodd"
                                                      d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                                      clip-rule="evenodd"
                                                   />
                                                </g>
                                             </g>
                                             <defs>
                                                <linearGradient id="paint0_linear_343_121520" x1=".933" x2=".933" y1="1.433" y2="6.1" gradientUnits="userSpaceOnUse">
                                                   <stop stop-color="#fff" />
                                                   <stop offset="1" stop-color="#F0F0F0" />
                                                </linearGradient>
                                                <filter id="filter0_d_343_121520" width="6.533" height="5.667" x=".933" y="1.433" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                                   <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                   <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                   <feOffset dy="1" />
                                                   <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                   <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_343_121520" />
                                                   <feBlend in="SourceGraphic" in2="effect1_dropShadow_343_121520" result="shape" />
                                                </filter>
                                             </defs>
                                          </svg>
                                          United States (+1)
                                       </span>
                                    </button>
                                 </li>
                                 <li>
                                    <button type="button" class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                       <span class="inline-flex items-center">
                                          <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15">
                                             <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             </mask>
                                             <g mask="url(#a)">
                                                <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                                <path fill="#fff" fill-rule="evenodd" d="M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z" clip-rule="evenodd" />
                                                <path stroke="#DB1F35" stroke-linecap="round" stroke-width=".667" d="M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093" />
                                                <path fill="#E6273E" fill-rule="evenodd" d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z" clip-rule="evenodd" />
                                             </g>
                                          </svg>
                                          United Kingdom (+44)
                                       </span>
                                    </button>
                                 </li>
                                 <li>
                                    <button type="button" class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                       <span class="inline-flex items-center">
                                          <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
                                             <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             </mask>
                                             <g mask="url(#a)">
                                                <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                                <path fill="#fff" stroke="#fff" stroke-width=".667" d="M0 .167h-.901l.684.586 3.15 2.7v.609L-.194 6.295l-.14.1v1.24l.51-.319L3.83 5.033h.73L7.7 7.276a.488.488 0 00.601-.767L5.467 4.08v-.608l2.987-2.134a.667.667 0 00.28-.543V-.1l-.51.318L4.57 2.5h-.73L.66.229.572.167H0z" />
                                                <path fill="url(#paint0_linear_374_135177)" fill-rule="evenodd" d="M0 2.833V4.7h3.267v2.133c0 .369.298.667.666.667h.534a.667.667 0 00.666-.667V4.7H8.2a.667.667 0 00.667-.667V3.5a.667.667 0 00-.667-.667H5.133V.5H3.267v2.333H0z" clip-rule="evenodd" />
                                                <path fill="url(#paint1_linear_374_135177)" fill-rule="evenodd" d="M0 3.3h3.733V.5h.934v2.8H8.4v.933H4.667v2.8h-.934v-2.8H0V3.3z" clip-rule="evenodd" />
                                                <path
                                                   fill="#fff"
                                                   fill-rule="evenodd"
                                                   d="M4.2 11.933l-.823.433.157-.916-.666-.65.92-.133.412-.834.411.834.92.134-.665.649.157.916-.823-.433zm9.8.7l-.66.194.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.194zm0-8.866l-.66.193.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.193zm2.8 2.8l-.66.193.193-.66-.193-.66.66.193.66-.193-.193.66.193.66-.66-.193zm-5.6.933l-.66.193.193-.66-.193-.66.66.194.66-.194-.193.66.193.66-.66-.193zm4.2 1.167l-.33.096.096-.33-.096-.33.33.097.33-.097-.097.33.097.33-.33-.096z"
                                                   clip-rule="evenodd"
                                                />
                                             </g>
                                             <defs>
                                                <linearGradient id="paint0_linear_374_135177" x1="0" x2="0" y1=".5" y2="7.5" gradientUnits="userSpaceOnUse">
                                                   <stop stop-color="#fff" />
                                                   <stop offset="1" stop-color="#F0F0F0" />
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_374_135177" x1="0" x2="0" y1=".5" y2="7.033" gradientUnits="userSpaceOnUse">
                                                   <stop stop-color="#FF2E3B" />
                                                   <stop offset="1" stop-color="#FC0D1B" />
                                                </linearGradient>
                                             </defs>
                                          </svg>
                                          Australia (+61)
                                       </span>
                                    </button>
                                 </li>
                                 <li>
                                    <button type="button" class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                       <span class="inline-flex items-center">
                                          <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15">
                                             <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             </mask>
                                             <g mask="url(#a)">
                                                <path fill="#262626" fill-rule="evenodd" d="M0 5.167h19.6V.5H0v4.667z" clip-rule="evenodd" />
                                                <g filter="url(#filter0_d_374_135180)">
                                                   <path fill="#F01515" fill-rule="evenodd" d="M0 9.833h19.6V5.167H0v4.666z" clip-rule="evenodd" />
                                                </g>
                                                <g filter="url(#filter1_d_374_135180)">
                                                   <path fill="#FFD521" fill-rule="evenodd" d="M0 14.5h19.6V9.833H0V14.5z" clip-rule="evenodd" />
                                                </g>
                                             </g>
                                             <defs>
                                                <filter id="filter0_d_374_135180" width="19.6" height="4.667" x="0" y="5.167" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                                   <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                   <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                   <feOffset />
                                                   <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                   <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" />
                                                   <feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" />
                                                </filter>
                                                <filter id="filter1_d_374_135180" width="19.6" height="4.667" x="0" y="9.833" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                                   <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                   <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                   <feOffset />
                                                   <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                   <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" />
                                                   <feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" />
                                                </filter>
                                             </defs>
                                          </svg>
                                          Germany (+49)
                                       </span>
                                    </button>
                                 </li>
                                 <li>
                                    <button type="button" class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                       <span class="inline-flex items-center">
                                          <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15">
                                             <rect width="19.1" height="13.5" x=".25" y=".75" fill="#fff" stroke="#F5F5F5" stroke-width=".5" rx="1.75" />
                                             <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                <rect width="19.1" height="13.5" x=".25" y=".75" fill="#fff" stroke="#fff" stroke-width=".5" rx="1.75" />
                                             </mask>
                                             <g mask="url(#a)">
                                                <path fill="#F44653" d="M13.067.5H19.6v14h-6.533z" />
                                                <path fill="#1035BB" fill-rule="evenodd" d="M0 14.5h6.533V.5H0v14z" clip-rule="evenodd" />
                                             </g>
                                          </svg>
                                          France (+33)
                                       </span>
                                    </button>
                                 </li>
                                 <li>
                                    <button type="button" class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                       <span class="inline-flex items-center">
                                          <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15">
                                             <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             </mask>
                                             <g mask="url(#a)">
                                                <path fill="#262626" fill-rule="evenodd" d="M0 5.167h19.6V.5H0v4.667z" clip-rule="evenodd" />
                                                <g filter="url(#filter0_d_374_135180)">
                                                   <path fill="#F01515" fill-rule="evenodd" d="M0 9.833h19.6V5.167H0v4.666z" clip-rule="evenodd" />
                                                </g>
                                                <g filter="url(#filter1_d_374_135180)">
                                                   <path fill="#FFD521" fill-rule="evenodd" d="M0 14.5h19.6V9.833H0V14.5z" clip-rule="evenodd" />
                                                </g>
                                             </g>
                                             <defs>
                                                <filter id="filter0_d_374_135180" width="19.6" height="4.667" x="0" y="5.167" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                                   <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                   <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                   <feOffset />
                                                   <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                   <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" />
                                                   <feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" />
                                                </filter>
                                                <filter id="filter1_d_374_135180" width="19.6" height="4.667" x="0" y="9.833" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                                   <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                   <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                   <feOffset />
                                                   <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                   <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" />
                                                   <feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" />
                                                </filter>
                                             </defs>
                                          </svg>
                                          Germany (+49)
                                       </span>
                                    </button>
                                 </li>
                              </ul>
                           </div>
                           <div class="relative w-full">
                              <input type="text" id="phone-input" class="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                           </div>
                        </div>
                     </div>

                     <div>
                        <div class="mb-2 flex items-center gap-2">
                           <label for="select_country_input_billing_modal" class="block text-sm font-medium text-gray-900 dark:text-white"> Country* </label>
                        </div>
                        <select id="select_country_input_billing_modal" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                           <option selected>United States</option>
                           <option value="AS">Australia</option>
                           <option value="FR">France</option>
                           <option value="ES">Spain</option>
                           <option value="UK">United Kingdom</option>
                        </select>
                     </div>

                     <div>
                        <div class="mb-2 flex items-center gap-2">
                           <label for="select_city_input_billing_modal" class="block text-sm font-medium text-gray-900 dark:text-white"> City* </label>
                        </div>
                        <select id="select_city_input_billing_modal" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                           <option selected>San Francisco</option>
                           <option value="NY">New York</option>
                           <option value="LA">Los Angeles</option>
                           <option value="CH">Chicago</option>
                           <option value="HU">Houston</option>
                        </select>
                     </div>

                     <div class="sm:col-span-2">
                        <label for="address_billing_modal" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Shipping Address* </label>
                        <textarea id="address_billing_modal" rows="4" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter here your address"></textarea>
                     </div>

                  </div>
                  <div class="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                     <button type="submit" class="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save information</button>
                     <button type="button" data-modal-toggle="billingInformationModal" class="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export function QuestionModal() {
   return (

      <div id="question-modal" tabindex="-1" aria-hidden="true" class="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden antialiased md:inset-0">
         <div class="relative max-h-full w-full max-w-xl p-4">
            <div class="relative rounded-lg bg-white shadow dark:bg-gray-800">
               <div class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Ask a question</h3>
                  <button type="button" class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="question-modal">
                     <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                     </svg>
                     <span class="sr-only">Close modal</span>
                  </button>
               </div>
               <form class="p-4 md:p-5">
                  <div class="mb-4 grid grid-cols-2 gap-4">
                     <div class="col-span-2">
                        <label for="question" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your question <span class="text-gray-500 dark:text-gray-400">(150-1000 characters)</span></label>
                        <textarea id="question" rows="6" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" required></textarea>
                     </div>
                     <div class="col-span-2 grid gap-4 md:grid-cols-2">
                        <div>
                           <label for="question-type" class="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white">
                              <span class="me-1">Question type</span>
                              <button type="button" data-tooltip-target="tooltip-dark" data-tooltip-style="dark" class="ml-1">
                                 <svg aria-hidden="true" class="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                 <span class="sr-only">Details</span>
                              </button>
                              <div id="tooltip-dark" role="tooltip" class="tooltip invisible absolute z-10 inline-block max-w-sm rounded-lg bg-gray-900 px-3 py-2 text-xs font-normal text-white opacity-0 shadow-sm dark:bg-gray-700">
                                 Choose your question type to get a faster answer.
                                 <div class="tooltip-arrow" data-popper-arrow></div>
                              </div>
                           </label>
                           <select id="question-type" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                              <option value="technical">Technical Question</option>
                              <option value="shipment">Shipment Question</option>
                              <option value="payment">Payment Issue</option>
                              <option value="other">Other</option>
                           </select>
                        </div>
                        <div>
                           <label for="priority-type" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Priority</label>
                           <select id="priority-type" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                              <option value="very-high">Very High</option>
                              <option value="high">High</option>
                              <option value="medium">Medium</option>
                              <option value="low">Low</option>
                           </select>
                        </div>
                     </div>
                     <div class="col-span-2">
                        <p class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Upload files <span class="text-gray-500 dark:text-gray-400">(Optional)</span></p>
                        <div class="flex w-full items-center justify-center">
                           <label for="dropzone-file" class="dark:hover:bg-bray-800 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                              <div class="flex flex-col items-center justify-center pb-6 pt-5">
                                 <svg class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                 </svg>
                                 <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                 <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                              </div>
                              <input id="dropzone-file" type="file" class="hidden" />
                           </label>
                        </div>
                     </div>

                     <div class="col-span-2">
                        <div class="flex items-center">
                           <input id="link-checkbox" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                           <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">I have read and agree with the <a href="#" class="text-primary-600 hover:underline dark:text-primary-500">terms and conditions</a>.</label>
                        </div>
                     </div>
                  </div>
                  <div class="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                     <button type="submit" class="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit question</button>
                     <button type="button" data-modal-toggle="question-modal" class="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}