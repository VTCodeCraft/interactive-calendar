import Image from "next/image";

type ImageSectionProps = {
  monthLabel: string;
  yearLabel: string;
};

export function ImageSection({ monthLabel, yearLabel }: ImageSectionProps) {
  return (
    <section className="relative min-h-[10rem] overflow-hidden border-b border-[#d7ddd4] bg-[#18343a] lg:h-full lg:min-h-0 lg:border-b-0 lg:border-r">
      <Image
        src="/calendar-hero.svg"
        alt="Featured atelier visual"
        fill
        priority
        className="object-cover object-center opacity-80"
        sizes="(max-width: 1024px) 100vw, 42vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,18,0.1)_0%,rgba(10,22,23,0.12)_35%,rgba(9,16,16,0.82)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(120,203,199,0.22),transparent_30%),radial-gradient(circle_at_70%_15%,rgba(255,255,255,0.08),transparent_20%)]" />

      <div className="absolute inset-x-4 top-3 rounded-[0.9rem] border border-white/12 bg-white/5 p-2 backdrop-blur-sm lg:left-4 lg:right-auto lg:top-4 lg:w-[10rem]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-white/60">Curated Issue</p>
        <div className="mt-1.5 rounded-[0.75rem] border border-white/10 bg-white/8 p-2 shadow-[0_10px_18px_rgba(0,0,0,0.14)]">
          <div className="mb-1.5 h-5 rounded-lg bg-white/12" />
          <div className="mb-2 h-2 rounded-full bg-white/12" />
          <div className="mb-2 h-2 w-5/6 rounded-full bg-white/12" />
          <div className="h-2 w-4/6 rounded-full bg-white/12" />
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-3 lg:inset-x-4 lg:bottom-4">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#d4e8e3]/72">
            The Digital Atelier
          </p>
          <h2 className="mt-2 font-serif text-[1.7rem] font-semibold leading-[0.94] text-white sm:text-[2rem] lg:text-[2.1rem]">
            The tactile side of planning.
          </h2>
          <p className="mt-1.5 max-w-sm text-[10px] leading-4 text-[#d9ebe7]/84">
            Craft your month with a gallery-like calendar, quiet structure, and notes that feel more editorial than utilitarian.
          </p>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-1">
          <div className="rounded-full border border-white/12 bg-white/10 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">
            {monthLabel}
          </div>
          <div className="rounded-full border border-white/12 bg-white/10 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">
            {yearLabel}
          </div>
        </div>
      </div>
    </section>
  );
}
