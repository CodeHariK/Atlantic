import SpaceLayout from '../layouts/SpaceLayout';

import '../css/ghost.css';

export default function NotFound() {
   return (
      <SpaceLayout two title='Page Not Found'>
         <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
               <div class="mx-auto max-w-screen-sm text-center">
                  <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                  <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
                  <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                  <a href="." class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
               </div>
            </div>

            <GhostComponent />

         </section>
      </SpaceLayout>
   );
}

import { onCleanup, onMount } from "solid-js";

const GhostComponent = () => {
   let ghost: HTMLDivElement | undefined;

   let ghostX = 0;
   let ghostY = 0;

   const countShift = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
      ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

   const handleMouseMove = (event: MouseEvent) => {
      ghost!.classList.add("active");

      let pageX = event.pageX
      let pageY = event.pageY

      event = event || window.event;
      if (event.pageX == null && event.clientX != null) {
         const eventDoc = (event.target instanceof HTMLElement && event.target.ownerDocument) || document;
         const doc = eventDoc.documentElement;
         const body = eventDoc.body;

         pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
         pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
      }

      followCursor(pageX, pageY - 500)
   }

   const followCursor = (pageX: number, pageY: number) => {
      const diffX = pageX - ghostX;
      const diffY = pageY - ghostY;
      const skewX = diffX / 16;
      const scale = diffY / 16;

      ghostX += diffX / 8;
      ghostY += diffY / 8;

      const skewDegrees = countShift(skewX, 0, 50, 0, -25);
      const scaleYValue = countShift(scale, 0, 50, 1, 2.0);

      ghost!.style.transform = `translate(${ghostX}px, ${ghostY}px) skew(${skewDegrees}deg) rotate(${-skewDegrees}deg) scaleY(${scaleYValue})`;
   }

   onMount(() => {
      const handleMouseLeave = () => {
         ghost?.classList.remove('active');
         if (ghost) ghost.style.animation = "none";
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);

      // Clean up event listeners when the component is unmounted
      onCleanup(() => {
         document.removeEventListener("mousemove", handleMouseMove);
         document.removeEventListener("mouseleave", handleMouseLeave);
      });
   });

   return <div id="ghost" ref={ghost}>
      <div class="ghost">
         <div class="ghost__waves">
            <div class="ghost__wave"></div>
            <div class="ghost__wave"></div>
         </div>
         <div class="ghost__eyes">
            <div class="ghost__eyes_eye"></div>
            <div class="ghost__eyes_eye"></div>
         </div>
         <div class="ghost__mouth"></div>
      </div>
   </div>;
};
