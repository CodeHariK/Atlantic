import SpaceLayout from '../layouts/SpaceLayout';

export default function NotFound() {
   return (
      <SpaceLayout two title='Page Not Found'>
         <section class="text-gray-700 p-8">
            <h1 class="text-2xl font-bold">404: Not Found</h1>
            <p class="mt-4">It's gone 😞</p>

            <img title="Astro" src="./logos/astro.svg" />

            <h3>Path: {document.URL}</h3>
            <h2>
               <a title="Return to Home" href="."> Return
                  {/* <RainbowText>Return to Home</RainbowText> */}
               </a>
            </h2>
         </section>
      </SpaceLayout>
   );
}