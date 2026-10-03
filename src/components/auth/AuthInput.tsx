import Image from "next/image";

interface AuthInputProps {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    error?: string;
    valid?: boolean;
    registration: any;
}

export function AuthInput({
    id,
    label,
    type,
    placeholder,
    error,
    valid,
    registration,
}: AuthInputProps) {
    return (
        <div className="flex flex-col gap-2.5 font-semibold">
            <label htmlFor={id} className={`text-[12px] font-semibold ${error ? "text-[#EC3013]" : "text-white"
                }`}>{label}</label>

            <div className="relative">
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    {...registration}
                    className={`w-full rounded-xl border px-4 py-3 text-[12px] text-white placeholder:text-[#A9A9A9] focus:outline-none focus:ring-0 ${error ? "border-[#EC3013]" : "border-transparent"
                        } bg-[#1E2031]`}
                />
                {valid && !error && (
                    <Image
                        src="/icons/success.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                    />
                )}
            </div>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}