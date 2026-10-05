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
            <span className="text-text-muted text-body-m">
                {text}{" "}
            </span>

            <button
                type="button"
                onClick={onClick}
                className="text-primary text-button"
            >
                {action}
            </button>
        </div>
    );
}