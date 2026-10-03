interface AuthFooterProps {
    text: string;
    action: string;
    onClick: () => void;
}

export function AuthFooter({
    text,
    action,
    onClick,
}: AuthFooterProps) {
    return (
        <div className="text-center text-sm">
            <span className="text-[#A9A9A9] text-[14px]">
                {text}{" "}
            </span>

            <button
                type="button"
                onClick={onClick}
                className="text-[#EC3013] text-[14px] font-extrabold"
            >
                {action}
            </button>
        </div>
    );
}