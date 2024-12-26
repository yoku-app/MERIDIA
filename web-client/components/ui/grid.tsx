export const BackgroundGrid = () => {
    return (
        <>
            <div className="absolute inset-0 h-[15rem] w-screen -z-[99]  bg-[image:radial-gradient(70%_60%_at_50%_-20%,hsl(0,0%,32%,0.35),rgba(255,255,255,0))]"></div>

            <svg
                className="absolute inset-0 -z-[99] h-screen  w-screen stroke-neutral-800/30 dark:stroke-neutral-200/30 [mask-image:radial-gradient(85%_95%_at_top_left,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="hero"
                        width="75"
                        height="75"
                        x="50%"
                        y="-25"
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.2 200V.5H200" fill="none"></path>
                    </pattern>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    strokeWidth="0"
                    fill="url(#hero)"
                ></rect>
            </svg>
        </>
    );
};

export const DotGridBackground = () => {
    return (
        <div className="h-screen inset-0 absolute w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
    );
};
