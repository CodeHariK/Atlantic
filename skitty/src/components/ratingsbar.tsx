import { StarIcon } from "./svg";

export function RatingsBar(props: { ratings?: number, reviews?: number }) {
    return <div class="flex items-center gap-2">
        <div class="flex items-center">
            {StarIcon()}
            {StarIcon()}
            {StarIcon()}
            {StarIcon()}
            {StarIcon()}
        </div>

        {
            props.ratings && <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{props.ratings}</span>
        }
        {
            props.reviews && <p class="text-sm font-medium text-gray-500 dark:text-gray-400">({props.reviews})</p>
        }
    </div>;
}
