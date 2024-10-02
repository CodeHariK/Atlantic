import { useParams, useSearchParams } from "@solidjs/router";
import { Breadcrumbs } from "../components/breadcrumb";
import { MaterialButton, OutlinedButton } from "../components/button";
import { H2, H6, P } from "../components/heading";
import { RatingsBar } from "../components/ratingsbar";
import SpaceLayout from "../layouts/SpaceLayout";
import { useConnect } from "../connect/connect";
import { createEffect, createSignal } from "solid-js";
import { GetProductRequest, Product } from "../../api/cosmog/v1/cosmog_pb";
import { Modal } from "../components/modal";
import { Reviews } from "./reviews";
import { CartItem } from "../../api/cart/v1/cart_pb";

export function ProductPage() {

   const params = useParams();
   const [searchParams] = useSearchParams();

   const connect = useConnect();

   const [product, setProduct] = createSignal<Product | undefined>(undefined);
   const [imgmov, setImvMov] = createSignal<number>(0);

   let total = 0

   createEffect(async () => {

      try {
         // Create the request
         let request = new GetProductRequest({
            id: params.productId, // Assuming params.id is available in your context
         });

         // Fetch the product using the client
         let response = await connect.cosmogclient.getProduct(request);

         total = (response?.img.length ?? 0) + (response?.mov.length ?? 0)
         setProduct(response);


      } catch (error) {
         console.error("Error fetching product:", error);
         setProduct(undefined); // Reset product in case of error
      }
   });

   function imgNext() {
      let id = "box" + product()?.id
      if (imgmov() >= (product()?.img.length ?? 0)) {
         document.getElementById(
            id
         )!.innerHTML =
            `<video class="h-full w-full object-cover" controls="" autoplay="" name="media"><source type="video/mp4" src="${product()?.mov[imgmov() - (product()?.img.length ?? 0)]}"/></video>`;
      } else {
         document.getElementById(
            id
         )!.innerHTML =
            `<img class="h-full w-full object-cover" src="${product()?.img[imgmov()]}" />`;
      }
   }

   const addToCart = async () => {
      let cart = new CartItem({
         productId: product()?.id,
         quantity: 1,
      });
      await connect.cartclient.updateCartItem(cart);
      await connect.getCart()
   }

   return (
      <SpaceLayout title={"" + searchParams.title}>
         <section class="py-12 sm:py-16">
            <div class="container mx-auto px-4">

               {Breadcrumbs()}

               <div class="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">

                  <div class="lg:col-span-3 lg:row-end-1">
                     <div class="lg:flex items-center">
                        <div class="lg:order-2">
                           <div id={"box" + product()?.id} class="w-full overflow-hidden rounded-lg">
                              <img class="h-full w-full max-w-full object-cover" src={product()?.img[0]} alt="" />
                           </div>
                           <div class="flex gap-4 w-full justify-center">

                              <button
                                 onclick={() => {
                                    setImvMov((imgmov() - 1) % total);
                                    if (imgmov() < 0) {
                                       setImvMov(imgmov() + total);
                                    }
                                    imgNext();
                                 }}
                              >
                                 prev
                              </button>

                              <button
                                 onclick={() => {
                                    setImvMov((imgmov() + 1) % total);
                                    imgNext();
                                 }}
                              >
                                 next
                              </button>
                           </div>
                        </div>

                        <div class="overflow-scroll lg:h-128 mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                           <div class="flex flex-row items-center lg:flex-col">
                              {(() => {

                                 return product()?.img.map((m) => {

                                    return <Modal child={

                                       <button type="button" class="flex-0 aspect-square mb-3 h-16 overflow-hidden rounded-lg border-2 border-gray-900 text-center">
                                          <img class="h-full w-full object-cover" src={m} alt="" />
                                       </button>

                                    } size={{ x: 70 }} modal={() => {

                                       return <img class="h-full w-full object-cover" src={m} alt="" />

                                    }} />


                                 })

                              })()}
                              {(() => {
                                 return product()?.mov.map((m) => {

                                    return <Modal child={

                                       <button type="button" class="flex-0 aspect-square mb-3 h-16 overflow-hidden rounded-lg border-2 border-gray-900 text-center">
                                          <video class="h-full w-full object-cover" controls={false} autoplay={false}><source type="video/mp4" src={m} /></video>
                                       </button>

                                    } size={{ x: 70 }} modal={() => {

                                       return <video class="h-full w-full object-cover" controls autoplay={true}>
                                          <source type="video/mp4" src={m} />
                                       </video>

                                    }} />


                                 })
                              })()}
                           </div>
                        </div>
                     </div>

                  </div>

                  <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                     <H2>{product()?.title}</H2>

                     <RatingsBar ratings={5} reviews={120} />

                     <P class="mt-4">{product()?.info}</P>

                     <H6 class="mt-8">Choose subscription</H6>
                     <div class="mt-3 flex select-none flex-wrap items-center gap-1">
                        <MaterialButton onClick={addToCart}>4 Months / $80</MaterialButton>
                        <OutlinedButton onClick={addToCart}>8 Months / $60</OutlinedButton>
                     </div>

                     <div class="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                        <MaterialButton onClick={addToCart}>Add to cart</MaterialButton>
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

               <Reviews rating={product()?.rating ?? 0} />

            </div>

         </section>
      </SpaceLayout>
   );
}