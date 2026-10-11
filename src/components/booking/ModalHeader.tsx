interface ModalHeaderProps {
    title?: string;
    subtitle?: string;
    secondsRemaining?: number;
}

export function ModalHeader({ title, subtitle, secondsRemaining }: ModalHeaderProps) {
    const timeLeft =
        secondsRemaining === undefined
            ? null
            : `${Math.floor(secondsRemaining / 60)}:${String(secondsRemaining % 60).padStart(2, "0")}`;

    return (
        <header className="flex items-start justify-between gap-4 pr-10">
            <div>
                <h2 id="purchase-modal-title" className="text-xl font-semibold uppercase text-white">
                    {title}
                </h2>
                {subtitle && <p className="mt-2 text-sm text-white/70">{subtitle}</p>}
            </div>

            {timeLeft && (
                <div className="shrink-0 rounded-2xl bg-white/10 px-4 py-2 text-center">
                    <p className="text-[10px] font-semibold uppercase text-white/60">Seats held</p>
                    <p className="text-base font-bold text-white">{timeLeft}</p>
                </div>
            )}
        </header>
    );
}