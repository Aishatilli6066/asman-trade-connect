import { useEffect } from "react";
import { X } from "lucide-react";
import { closeConsultation, useConsultationOpen } from "./consultation-store";
import { ConsultationForm } from "./forms/ConsultationForm";

export function ConsultationModal() {
  const open = useConsultationOpen();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeConsultation(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={closeConsultation}
    >
      <div className="min-h-full flex items-start justify-center p-4 md:p-10">
        <div
          className="relative w-full max-w-3xl bg-[var(--color-burgundy)] border-t-2 border-[var(--color-gold)] animate-in fade-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeConsultation}
            className="absolute top-5 right-5 text-white/60 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="p-8 md:p-12">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
              Consultation Request
            </div>
            <h3 className="mt-3 font-display text-3xl md:text-4xl text-white">
              Let's discuss your trade ambitions.
            </h3>
            <p className="mt-3 text-white/60 text-sm max-w-xl">
              Share a few details and our coordination team will respond within 24 hours.
            </p>
            <div className="mt-8">
              <ConsultationForm dark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}