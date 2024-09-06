import { Service } from '../data/Constants';
import SpaceLayout from '../layouts/SpaceLayout';

export default function NotFound() {
    return (
        <SpaceLayout two title='Docs'>
            <div class="flex h-full">
                <div class="w-64 p-4">
                    <a href="#link1" class="block mb-2 text-blue-600">Link 1</a>
                    <a href="#link2" class="block mb-2 text-blue-600">Link 2</a>
                    <a href="#link3" class="block mb-2 text-blue-600">Link 3</a>
                </div>
                <div class="flex-1 dark:invert">
                    {/* <iframe
                        src={Service.Auth + "/docs"}
                        class="w-full h-full border-0"></iframe> */}
                    <iframe
                        src={Service.Cosmog + "/docs"}
                        class="w-full h-full border-0"></iframe>
                </div>
            </div>
        </SpaceLayout>
    );
}