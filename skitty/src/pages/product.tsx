import { useParams, useSearchParams } from "@solidjs/router";
import { Breadcrumbs } from "../components/breadcrumb";
import { MaterialButton, OutlinedButton } from "../components/button";
import { H2, H6, P } from "../components/heading";
import { RatingsBar } from "../components/ratingsbar";
import SpaceLayout from "../layouts/SpaceLayout";

export function Product() {

   const params = useParams();
   const [searchParams] = useSearchParams();

   return (
      <SpaceLayout title={'Product ' + searchParams.name}>
         <section class="py-12 sm:py-16">
            <div class="container mx-auto px-4">

               {Breadcrumbs()}

               Product Id : {params.productId}
               Name : {searchParams.name}

               <div class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">

                  <div class="lg:col-span-3 lg:row-end-1">
                     <div class="lg:flex lg:items-start">
                        <div class="lg:order-2 lg:ml-5">
                           <div class="max-w-xl overflow-hidden rounded-lg">
                              <img class="h-full w-full max-w-full object-cover" src="https://componentland.com/images/JHxMnVrtPMdcNU1s_7g7f.png" alt="" />
                           </div>
                        </div>

                        <div class="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                           <div class="flex flex-row items-start lg:flex-col">
                              <button type="button" class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center">
                                 <img class="h-full w-full object-cover" src="https://componentland.com/images/JHxMnVrtPMdcNU1s_7g7f.png" alt="" />
                              </button>
                              <button type="button" class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center">
                                 <img class="h-full w-full object-cover" src="https://componentland.com/images/JHxMnVrtPMdcNU1s_7g7f.png" alt="" />
                              </button>
                              <button type="button" class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center">
                                 <img class="h-full w-full object-cover" src="https://componentland.com/images/JHxMnVrtPMdcNU1s_7g7f.png" alt="" />
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                     <H2>Coffee</H2>

                     {RatingsBar(5, 120)}

                     <P class="mt-8">Coffee Type</P>

                     <div class="mt-3 flex select-none flex-wrap items-center gap-1">
                        <MaterialButton>Powder</MaterialButton>
                        <OutlinedButton>Whole Bean</OutlinedButton>
                     </div>

                     <H6 class="mt-8">Choose subscription</H6>
                     <div class="mt-3 flex select-none flex-wrap items-center gap-1">
                        <MaterialButton>4 Months / $80</MaterialButton>
                        <OutlinedButton>8 Months / $60</OutlinedButton>
                     </div>

                     <div class="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                        <MaterialButton>Add to cart</MaterialButton>
                     </div>

                     <ul class="mt-8 space-y-2">
                        <li class="flex items-center text-left text-sm font-medium text-gray-600">
                           <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" class=""></path>
                           </svg>
                           Free shipping worldwide
                        </li>

                        <li class="flex items-center text-left text-sm font-medium text-gray-600">
                           <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" class=""></path>
                           </svg>
                           Cancel Anytime
                        </li>
                     </ul>
                  </div>

               </div>
            </div>
         </section>
      </SpaceLayout>
   );
}