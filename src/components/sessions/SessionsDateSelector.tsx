import Link from "next/link";

interface SessionsDateSelectorProps {
    selectedDate: string;
}

function getTodayDateKey() {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Tbilisi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(new Date());

    const values = Object.fromEntries(
        parts.map((part) => [part.type, part.value])
    );

    return `${values.year}-${values.month}-${values.day}`;
}

function getNextSevenDates() {
    const today = getTodayDateKey();
    const [year, month, day] = today.split("-").map(Number);

    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(Date.UTC(year, month - 1, day + index));

        const value = [
            date.getUTCFullYear(),
            String(date.getUTCMonth() + 1).padStart(2, "0"),
            String(date.getUTCDate()).padStart(2, "0"),
        ].join("-");

        return {
            value,
            weekday: new Intl.DateTimeFormat("en-US", {
                weekday: "short",
                timeZone: "UTC",
            }).format(date),
            day: date.getUTCDate(),
            month: new Intl.DateTimeFormat("en-US", {
                month: "short",
                timeZone: "UTC",
            }).format(date),
        };
    });
}

export function SessionsDateSelector({
    selectedDate,
}: SessionsDateSelectorProps) {
    const dates = getNextSevenDates();

    return (
        <div className="border-b border-border pb-6 flex flex-col gap-3">
            <p className="text-overline text-text-muted">
                Date
            </p>

            <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
                {dates.map((date) => {
                    const isSelected = date.value === selectedDate;

                    return (
                        <Link
                            key={date.value}
                            href={`/sessions?date=${date.value}`}
                            aria-current={isSelected ? "date" : undefined}
                            className={`shrink-0 flex flex-col justify-center items-center w-9.25 h-13.5 rounded-lg ${isSelected
                                ? "bg-primary text-white"
                                : "bg-border text-white"
                                }`}
                        >
                            <span className="text-label-s">
                                {date.weekday}
                            </span>

                            <span className="text-label-s">
                                {date.day}
                            </span>

                        </Link>
                    );
                })}
            </div>
        </div>
    );
}