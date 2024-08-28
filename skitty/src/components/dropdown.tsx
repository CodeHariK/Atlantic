import { createSignal, onMount, onCleanup, createEffect } from "solid-js";


export function ToggleOptions() {
    const [showOptions, setShowOptions] = createSignal(false);
    const [hover, setHover] = createSignal(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    let button, dropdown

    function c(e) {
        console.log(e)
    }

    // Function to handle clicks outside of the dropdown
    const handleClickOutside = (event) => {

        if ((dropdown && !dropdown.contains(event.target)) &&
            (button && !button.contains(event.target))
        ) {
            setShowOptions(false);
        }
    };

    // Add event listener for clicks outside when dropdown is open
    createEffect(() => {
        if (showOptions()) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        if (hover()) {
            setShowOptions(true);
        } else {
            setShowOptions(false);
        }
    });

    onCleanup(() => {
        document.removeEventListener("mousedown", handleClickOutside);
    });

    return (
        <div class="relative inline-flex group pb-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <button
                type="button"
                ref={button}
                class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white group-hover:opacity-100 group-hover:visible text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                aria-haspopup="menu"
                aria-expanded={showOptions()}
                aria-label="Dropdown"
            >
                Actions
            </button>

            {showOptions() && (
                <div
                    ref={dropdown}
                    class="absolute left-1/2 transform translate-y-11 -translate-x-1/2 mt-2 min-w-[150px] bg-white shadow-md rounded-lg p-1 space-y-0.5 transition-opacity duration-300 opacity-100 visible dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="hs-dropdown-default"
                >
                    {((c) => {
                        return <div>
                            <a class="DropdownOption" onClick={() => { c("Newsletter") }}>
                                Newsletter
                            </a>
                            <a class="DropdownOption" onClick={() => { c("Purchases") }}>
                                Purchases
                            </a>
                        </div>
                    })(c)}
                </div>
            )}
        </div>
    );
}

export function PositionBox() {
    const [position, setPosition] = createSignal({ x: 0, y: 0 });
    const [dragging, setDragging] = createSignal(false);
    const [startPos, setStartPos] = createSignal({ x: 0, y: 0 });

    const updatePosition = () => {
        const box = document.getElementById("box");
        if (box) {
            const rect = box.getBoundingClientRect();
            setPosition({
                x: rect.left,
                y: rect.top
            });
        }
    };

    const onMouseDown = (event) => {
        setDragging(true);
        setStartPos({ x: event.clientX, y: event.clientY });
        event.preventDefault();
    };

    const onMouseMove = (event) => {
        if (dragging()) {
            const deltaX = event.clientX - startPos().x;
            const deltaY = event.clientY - startPos().y;

            const box = document.getElementById("box");
            if (box) {
                setPosition({
                    x: position().x + deltaX,
                    y: position().y + deltaY
                });
                setStartPos({ x: event.clientX, y: event.clientY });
            }
        }
    };

    const onMouseUp = () => {
        setDragging(false);
    };

    onMount(() => {
        updatePosition();
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        onCleanup(() => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        });
    });

    return (
        <div class="fixed inset-0 pointer-events-none bg-red-200">
            <div
                id="box"
                class="bg-blue-500 text-white p-4 w-40 h-40 flex items-center justify-center cursor-move pointer-events-auto"
                style={{ position: "absolute", left: `${position().x}px`, top: `${position().y}px`, "z-index": 1000 }}
                onMouseDown={onMouseDown}
            >
                <div>
                    <div>X: {Math.round(position().x)}</div>
                    <div>Y: {Math.round(position().y)}</div>
                </div>
            </div>
        </div>
    );
}

export function PositionBox2() {
    const [anchorPos, setAnchorPos] = createSignal({ l: 0, t: 0, r: 0, b: 0 });
    const [overlayPos, setOverlayPos] = createSignal({ l: 0, t: 0, r: 0, b: 0 });
    const [dragging, setDragging] = createSignal(false);
    const [startPos, setStartPos] = createSignal({ x: 0, y: 0 });

    const alignment = { x: Math.random() * .8 - .4, y: Math.random() * .8 - .4 }

    let overlay: HTMLDivElement
    let anchor: HTMLDivElement

    const updatePosition = () => {
        if (anchor) {
            const rect = anchor.getBoundingClientRect();
            setAnchorPos({
                l: rect.left,
                t: rect.top,
                r: rect.right,
                b: rect.bottom
            });
            updateOverlayPos();
        }
    };

    const onMouseDown = (event) => {
        setDragging(true);
        setStartPos({ x: event.clientX, y: event.clientY });
        event.preventDefault();
    };

    const onMouseMove = (event) => {
        if (dragging()) {
            const deltaX = event.clientX - startPos().x;
            const deltaY = event.clientY - startPos().y;

            if (anchor) {
                setAnchorPos({
                    l: anchorPos().l + deltaX,
                    t: anchorPos().t + deltaY,
                    r: anchorPos().r + deltaX,
                    b: anchorPos().b + deltaY,
                });

                updateOverlayPos();

                setStartPos({ x: event.clientX, y: event.clientY });
            }
        }
    };

    const onMouseUp = () => {
        setDragging(false);
    };

    onMount(() => {
        updatePosition();

        //---------
        // dragging
        //---------
        // document.addEventListener("mousemove", onMouseMove);
        // document.addEventListener("mouseup", onMouseUp);

        const onScroll = () => {
            updatePosition();
        };

        window.addEventListener("scroll", onScroll);

        onCleanup(() => {
            //---------
            // dragging
            //---------
            // document.removeEventListener("mousemove", onMouseMove);
            // document.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("scroll", onScroll);
        });
    });

    return (
        <div>
            <div
                ref={anchor}
                class="bg-blue-500 text-white p-4 w-40 h-40 flex items-center justify-center cursor-move pointer-events-auto"
                //---------
                // dragging
                //---------
                // style={{ position: "absolute", left: `${anchorPos().l}px`, top: `${anchorPos().t}px`, "z-index": 1000 }}
                onMouseDown={onMouseDown}
            >
                <div>
                    <div>Left: {Math.round(anchorPos().l)}</div>
                    <div>Top: {Math.round(anchorPos().t)}</div>
                    <div>Right: {Math.round(anchorPos().r)}</div>
                    <div>Bottom: {Math.round(anchorPos().b)}</div>
                </div>

            </div>
            <div class="fixed inset-0 pointer-events-none">

                <div ref={overlay} class="w-80 h-80 bg-blue-800 opacity-50 flex flex-col items-end justify-end"
                    style={{ position: "absolute", left: `${overlayPos().l}px`, top: `${overlayPos().t}px`, "z-index": 1000 }}
                >
                    <div>Left: {Math.round(overlayPos().l)}</div>
                    <div>Top: {Math.round(overlayPos().t)}</div>
                    <div>Right: {Math.round(overlayPos().r)}</div>
                    <div>Bottom: {Math.round(overlayPos().b)}</div>
                </div>
            </div>
        </div>
    );

    function updateOverlayPos() {
        const boxrect = anchor.getBoundingClientRect();
        let overlayRect = overlay.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let ll = (overlayRect.width - boxrect.width) / 2;
        let tt = (overlayRect.height - boxrect.height) / 2;


        let rightC = alignment.x * (boxrect.width + ll)
        let topC = alignment.y * (boxrect.height + tt)

        let n = {
            l: anchorPos().l + rightC - ll,
            t: anchorPos().t + topC - tt,
            r: anchorPos().l + overlayRect.width + rightC - ll,
            b: anchorPos().t + overlayRect.height + topC - tt,
        };

        if (n.r > vw) {
            n.l = n.l - (n.r - vw);
            n.r = vw;
        }
        if (n.l < 0) {
            n.l = 0;
            n.r = overlayRect.width;
        }
        if (n.t < 0) {
            n.t = 0;
            n.b = overlayRect.height;
        }
        if (n.b > vh) {
            n.t = n.t - (n.b - vh);
            n.b = vh;
        }

        setOverlayPos(n);
    }
}

export function PositionCheck() {
    return <div>
        <div class="flex-grid">
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
            <div class="grid-item"><PositionBox2 /></div>
        </div>

        <div style="left: 0%; top: 0%; position: absolute;">
            <PositionBox2 />
        </div>
        <div style="left: 0%; top: 40%; position: absolute;">
            <PositionBox2 />
        </div>
        <div style="left: 0%; top: 80%; position: absolute;">
            <PositionBox2 />
        </div>

        <div style="left: 40%; top: 0%; position: absolute;">
            <PositionBox2 />
        </div>
        <div style="left: 40%; top: 40%; position: absolute;">
            <PositionBox2 />
        </div>
        <div style="left: 40%; top: 80%; position: absolute;">
            <PositionBox2 />
        </div>

        <div style="left: 80%; top: 40%; position: absolute;">
            <PositionBox2 />
        </div>
        <div style="left: 80%; top: 80%; position: absolute;">
            <PositionBox2 />
        </div>
        <div style="left: 80%; top: 0%; position: absolute;">
            <PositionBox2 />
        </div>
    </div>
}