const ITEMS = [
  { label: "Available", className: "border-[#3A3D55] bg-[#1A1C2E]" },
  { label: "Selected", className: "border-[#EC3013] bg-[#EC3013]" },
  { label: "Sold", className: "border-[#1E2033] bg-[#12142A]" },
  {
    label: "Held by another user",
    className: "border-[#2A2C3D] bg-[#1A1C2E]",
    hatched: true,
  },
];

const HATCH =
  "repeating-linear-gradient(135deg, rgba(255,255,255,0.14) 0 2px, transparent 2px 6px)";

export function SeatLegend() {
  return (
    <ul className="flex flex-wrap mt-8 items-center justify-center gap-x-8 gap-y-2 text-sm text-white/70">
      {ITEMS.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span
            className={`h-5 w-5 rounded-md border ${item.className}`}
            style={item.hatched ? { backgroundImage: HATCH } : undefined}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}