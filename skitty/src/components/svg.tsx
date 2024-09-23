export function PhoneIcon() {
    return (
        <svg class="AppIcon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
            <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
        </svg>
    );
}

export function KeyIcon() {
    return (
        <svg
            class="AppIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path
                d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"
            ></path>
            <circle cx="16.5" cy="7.5" r=".5"></circle>
        </svg>
    );
}

export function AddUserIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="AppIcon" fill="currentColor" aria-hidden="true" stroke-width="2">
        <path
            d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
        </path>
    </svg>;
}

export function GoIcon() {
    return <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180 AppIcon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
    </svg>;
}

export function TableHeadingIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="AppIcon" stroke-width="2"
        stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
    </svg>;
}

export function PenIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="AppIcon" fill="currentColor" aria-hidden="true">
        <path
            d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
        </path>
    </svg>;
}

export function GoogleIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48" class="AppIcon">
        <g fill="none" fill-rule="evenodd">
            <path fill="#FBBC05" d="M9.8 24c0-1.5.3-3 .7-4.4l-7.9-6a23.5 23.5 0 0 0 0 20.8l8-6c-.5-1.4-.8-2.9-.8-4.4" />
            <path fill="#EB4335" d="M23.7 10.1c3.3 0 6.3 1.2 8.7 3.1l6.8-6.8a23.4 23.4 0 0 0-36.6 7.2l8 6c1.8-5.5 7-9.5 13.1-9.5" />
            <path fill="#34A853" d="M23.7 37.9c-6.2 0-11.3-4-13.2-9.5l-7.9 6A23.4 23.4 0 0 0 39 41.6l-7.5-5.8c-2.1 1.3-4.8 2-7.8 2" />
            <path fill="#4285F4" d="M46.1 24c0-1.4-.2-2.9-.5-4.3H23.7v9.1h12.6c-.6 3-2.3 5.5-4.8 7l7.5 5.8c4.3-4 7.1-10 7.1-17.6" />
        </g>
    </svg>;
}

export function CrossIcon() {
    return <svg
        aria-hidden="true" class="w-5 h-5 AppIcon" fill="none" stroke="currentColor" viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        ></path>
    </svg>;
}

export function UnlockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" class="AppIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="1.5" d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z" />
            <circle cx="12" cy="16" r="2" stroke-width="1.5" />
            <path stroke-linecap="round" stroke-width="1.5" d="M6 10V8a6 6 0 0 1 11.811-1.5" />
        </svg>
    );
}

export function LockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" class="AppIcon" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M5.25 10.055V8a6.75 6.75 0 0 1 13.5 0v2.055c1.115.083 1.84.293 2.371.824C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16c0-2.828 0-4.243.879-5.121.53-.531 1.256-.741 2.371-.824ZM6.75 8a5.25 5.25 0 0 1 10.5 0v2.004C16.867 10 16.451 10 16 10H8c-.452 0-.867 0-1.25.004V8ZM14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" clip-rule="evenodd" />
        </svg>
    );
}

export function EmailIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" class="AppIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm0 0v1.5a2.5 2.5 0 0 0 2.5 2.5v0a2.5 2.5 0 0 0 2.5-2.5V12a9 9 0 1 0-9 9h4" />
        </svg>);
}

export function StarIcon() {
    return (
        <svg class="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
        </svg>
    );
}
export function HeartIcon() {
    return (
        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
        </svg>
    );
}

export function CartIcon() {
    return (
        <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
        </svg>
    );
}