import Image from "next/image";
import { ReactNode } from "react";

interface AuthModalProps {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: ReactNode;
}

export function AuthModal({
  title,
  subtitle,
  onClose,
  children,
}: AuthModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-8 flex flex-col gap-6 bg-[#070C1C] border border-[#2A2C3D] rounded-[28px] text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-extrabold">{title}</h2>
            <p className="text-[12px] text-[#A9A9A9]">{subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <Image
              src="/icons/close.png"
              alt=""
              width={12}
              height={12}
            />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}