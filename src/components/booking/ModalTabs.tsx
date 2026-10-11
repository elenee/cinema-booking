export type Step = "seats" | "checkout";

const TABS: { id: Step; label: string }[] = [
  { id: "seats", label: "SEATS" },
  { id: "checkout", label: "CHECKOUT" },
];

interface ModalTabsProps {
  active: Step;
  checkoutDisabled: boolean;
  onChange: (step: Step) => void;
}

export function ModalTabs({ active, checkoutDisabled, onChange }: ModalTabsProps) {
  return (
    <div role="tablist" className="flex rounded-full bg-[#1A1C2E] p-0">
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        const disabled = tab.id === "checkout" && checkoutDisabled;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => onChange(tab.id)}
            className={`flex-1 rounded-full py-2.5 px-4 text-label-s font-bold transition-colors disabled:cursor-not-allowed ${isActive ? "bg-primary text-white" : "text-white/80"
              }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}