export default function ChevronButton() {
    return (
        <>
            <a
                href="#value-proposition"
                className="inline-block transition-transform duration-300 ease-in-out hover:scale-125 focus:outline-none cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-chevron-down-icon lucide-chevron-down">
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </a>
        </>
    );
};