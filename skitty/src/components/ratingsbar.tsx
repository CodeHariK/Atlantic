import { StarIcon } from "./svg";

export function RatingsBar(ratings: number, reviews: number) {
    return <div class="mt-2 flex items-center gap-2">
        <div class="flex items-center">
            {StarIcon()}
            {StarIcon()}
            {StarIcon()}
            {StarIcon()}
            {StarIcon()}
        </div>

        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{ratings}</span>
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">({reviews})</p>
    </div>;
}
