"use client";
import { useCallback, useEffect, useState } from "react";
import { getTickets } from "@/lib/api/tickets";
import type { TicketFilter } from "@/lib/api/tickets";
import type { TicketOrder } from "@/lib/api/types";
import TicketCard from "./TicketCard";

export function MyTickets() {
  const [activeTab, setActiveTab] = useState<TicketFilter>("upcoming");
  const [tickets, setTickets] = useState<TicketOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [ticketCounts, setTicketCounts] = useState({
    upcoming: 0,
    past: 0,
  });

  const loadTickets = useCallback(async (filter: TicketFilter) => {
    setLoading(true);
    setError("");

    try {
      const data = await getTickets(filter);
      setTicketCounts((current) => ({
        ...current,
        [filter]: data.length,
      }));
      setTickets(data);
    } catch {
      setError("Could not load your tickets. Please try again.");
    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    void loadTickets(activeTab);
  }, [activeTab, loadTickets]);



  useEffect(() => {
    (["upcoming", "past"] as const).forEach(async (filter) => {
      try {
        const data = await getTickets(filter);

        setTicketCounts((current) => ({
          ...current,
          [filter]: data.length,
        }));
      } catch {
      }
    });
  }, []);

  return (
    <section>
      <div className="flex w-fit gap-1 rounded-[10px] bg-surface p-1.25">
        {(["upcoming", "past"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 rounded-[10px] px-3.5 py-1.75 text-label-m transition-colors duration-200 ${activeTab === tab
              ? "bg-border text-white"
              : "bg-transparent text-text-muted hover:text-white"
              }`}
          >
            {tab === "upcoming" ? "Upcoming" : "Past"}
            <span className="text-label-s text-text-muted">{ticketCounts[tab]}</span>
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-5 text-sm text-red-400">
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-10 text-sm text-gray-400">Loading tickets...</p>
      ) : error && tickets.length === 0 ? null : tickets.length === 0 ? (
        <p className="py-10 text-sm text-gray-400">
          {activeTab === "upcoming"
            ? "You don't have any upcoming tickets yet."
            : "You don't have any past tickets yet."}
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-5">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
            />
          ))}
        </div>
      )}
    </section>
  );
}
