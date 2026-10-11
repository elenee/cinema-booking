import { Seat } from "@/lib/api/booking";
import { SeatButton, SeatVisualState } from "./SeatButton";
import { SeatMapData } from "@/lib/api/types";

function getSeatState(
  seat: Seat,
  selectedIds: Set<number>,
  contestedSeatCodes: Set<string>,
): SeatVisualState {
  if (contestedSeatCodes.has(seat.code)) return "sold";
  if (seat.state === "sold") return "sold";
  if (selectedIds.has(seat.id)) return "selected";
  if (seat.state === "held" && !seat.isMine) return "held";
  return "available";
}

interface SeatMapProps {
  seatMap: SeatMapData;
  selectedIds: Set<number>;
  contestedSeatCodes: Set<string>;
  onToggleSeat: (seat: Seat) => void;
}

export function SeatMap({ seatMap, selectedIds, contestedSeatCodes, onToggleSeat }: SeatMapProps) {
  return (
    <div className="overflow-x-auto">
      <div className="mx-auto w-180 min-w-full pt-[19.5px]">
        <div className="mx-auto rounded-b-2xl py-[8.5px] text-white bg-surface text-center text-label-s font-bold tracking-wide">
          SCREEN
        </div>

        {seatMap.sections.map((section) => (
          <div key={section.name} className="mt-8 flex flex-col items-center px-10 gap-6">
            <h3 className="text-label-s text-text-muted">
              {section.name}
            </h3>

            <div className="flex flex-col gap-2">
              {section.rows.map((row) => (
                <div
                  key={`${section.name}-${row.label}`}
                  className="flex items-center justify-center gap-2"
                >
                  <span className="w-5 text-center text-label-s text-white">
                    {row.label}
                  </span>

                  <div className="flex items-center gap-2">
                    {row.seats.map((seat) =>
                      seat.state === "unavailable" ? (
                        <span
                          key={seat.id}
                          aria-hidden="true"
                          className={`h-11 w-11 sm:h-12 sm:w-12 ${seat.aisleAfter ? "mr-3" : ""
                            }`}
                        />
                      ) : (
                        <SeatButton
                          key={seat.id}
                          seat={seat}
                         state={getSeatState(seat, selectedIds, contestedSeatCodes)}
                          onToggle={onToggleSeat}
                        />
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}