type ButtonProps = {
    text: string;
};

export default function PropButton({text} : ButtonProps) {
    return (
        <>
            <button className="px-8 text-lg py-3 text-white rounded-full font-medium bg-[#607912]">
                {text}
            </button>
        </>
    );
};