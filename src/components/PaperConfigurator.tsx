"use client";

import { useMemo, useState } from "react";

interface Option {
  id: string;
  label: string;
  hint?: string;
  /** Per-sheet price adjustment in pounds. */
  price?: number;
}

const SIZES: Option[] = [
  { id: "small", label: "Small Sheet", hint: "20 × 25 cm" },
  { id: "medium", label: "Medium Sheet", hint: "30 × 30 cm" },
  { id: "large", label: "Large Sheet", hint: "35 × 45 cm" },
  { id: "xl", label: "Extra Large", hint: "45 × 60 cm" },
  { id: "roll", label: "Roll Format", hint: "Continuous roll" },
  { id: "custom", label: "Custom Size", hint: "Enter below" },
];

const MATERIALS: Option[] = [
  { id: "wax", label: "Wax Paper", hint: "Classic waxed sheet", price: 0.09 },
  { id: "greaseproof", label: "Greaseproof", hint: "Grease-resistant", price: 0.08 },
  { id: "kraft", label: "Kraft Wax Paper", hint: "Natural brown", price: 0.1 },
  { id: "pe", label: "PE-Coated Paper", hint: "Moisture barrier", price: 0.12 },
  { id: "butcher", label: "Butcher Paper", hint: "Heavy-duty meat wrap", price: 0.13 },
  { id: "eco", label: "Eco / Compostable", hint: "Plastic-free coating", price: 0.14 },
];

const PRINTING: Option[] = [
  { id: "none", label: "No Printing", hint: "Plain sheets", price: -0.02 },
  { id: "one", label: "1 Colour", hint: "Single ink logo", price: 0.02 },
  { id: "two", label: "2 Colours", hint: "Two-ink brand print", price: 0.035 },
  { id: "cmyk", label: "Full Colour CMYK", hint: "Photographic print", price: 0.055 },
  { id: "pms", label: "PMS Match", hint: "Pantone matched", price: 0.045 },
  { id: "both", label: "Both Sides", hint: "Printed front & back", price: 0.06 },
];

const FINISHES: Option[] = [
  { id: "foodsafe", label: "Food-Safe Ink", hint: "Direct food contact", price: 0.01 },
  { id: "greaseresist", label: "Extra Grease Barrier", hint: "Heavier coating", price: 0.02 },
  { id: "microwave", label: "Microwave Safe", hint: "Reheat friendly", price: 0.015 },
  { id: "compostable", label: "Compostable Certified", hint: "Home compostable", price: 0.03 },
  { id: "perforated", label: "Perforated", hint: "Tear-off sheets", price: 0.02 },
  { id: "diecut", label: "Die-Cut Shape", hint: "Custom outline", price: 0.05 },
];

const QUANTITIES = [500, 1000, 2500, 5000, 10000, 25000, 50000];

const ADDONS: Option[] = [
  { id: "precut", label: "Pre-Cut Sheets", hint: "Ready-to-use stacks", price: 0.015 },
  { id: "interleaved", label: "Interleaved Packs", hint: "Dispenser ready", price: 0.02 },
  { id: "dispenser", label: "Dispenser Box", hint: "Branded counter box", price: 0.04 },
  { id: "sample", label: "Pre-Production Sample", hint: "Physical proof", price: 0.01 },
  { id: "banded", label: "Banded Bundles", hint: "Counted bundles", price: 0.012 },
  { id: "express", label: "Express Production", hint: "Priority queue", price: 0.03 },
];

const ASSURANCES = [
  "Free artwork & print setup",
  "Food-safe, UK-compliant materials",
  "Low minimums from 500 sheets",
  "UK-wide delivery",
];

const QTY_SCALE: Array<[number, number]> = [
  [50000, 0.78],
  [25000, 0.86],
  [10000, 1.0],
  [5000, 1.18],
  [2500, 1.42],
  [1000, 1.75],
  [500, 2.2],
  [1, 2.8],
];

function labelsOf(options: Option[], ids: string[]) {
  const labels = ids.map((id) => options.find((option) => option.id === id)?.label ?? id);
  return labels.length ? labels.join(", ") : "";
}

function priceOf(options: Option[], ids: string[]) {
  return ids.reduce((total, id) => total + (options.find((o) => o.id === id)?.price ?? 0), 0);
}

/**
 * Step-by-step spec builder for wax paper orders: it prices the selection
 * live and submits the whole spec (plus artwork) to the quote inbox.
 */
export default function PaperConfigurator({ productName }: { productName: string }) {
  const [size, setSize] = useState("");
  const [customSize, setCustomSize] = useState({ width: "", height: "", unit: "cm" });
  const [material, setMaterial] = useState("");
  const [printing, setPrinting] = useState<string[]>([]);
  const [finishes, setFinishes] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [customQuantity, setCustomQuantity] = useState("");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [designHelp, setDesignHelp] = useState(false);
  const [artworkName, setArtworkName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const effectiveQuantity = customQuantity ? Number(customQuantity) || 0 : quantity;

  function toggle(list: string[], setList: (next: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  const estimate = useMemo(() => {
    if (!material || !effectiveQuantity) return null;
    const base = MATERIALS.find((option) => option.id === material)?.price ?? 0.09;
    const scale = QTY_SCALE.find(([threshold]) => effectiveQuantity >= threshold)?.[1] ?? 2.8;
    const extras = priceOf(PRINTING, printing) + priceOf(FINISHES, finishes) + priceOf(ADDONS, addOns);
    const total = (base + extras) * scale * effectiveQuantity;
    return { low: Math.round(total * 0.88), high: Math.round(total * 1.14) };
  }, [material, effectiveQuantity, printing, finishes, addOns]);

  const sizeLabel =
    size === "custom"
      ? customSize.width || customSize.height
        ? `Custom: ${customSize.width || "?"} × ${customSize.height || "?"} ${customSize.unit}`
        : "Custom size"
      : SIZES.find((option) => option.id === size)?.label ?? "";

  const summaryRows: Array<[string, string]> = [
    ["Size", sizeLabel],
    ["Material", labelsOf(MATERIALS, material ? [material] : [])],
    ["Printing", labelsOf(PRINTING, printing)],
    ["Finishes", labelsOf(FINISHES, finishes)],
    ["Quantity", effectiveQuantity ? `${effectiveQuantity.toLocaleString()} sheets` : ""],
    ["Add-ons", labelsOf(ADDONS, addOns)],
    ["Artwork", artworkName],
    ["Design support", designHelp ? "Requested" : ""],
  ];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    form.set("productType", productName);
    form.set("size", sizeLabel || "Not selected");
    form.set("colour", labelsOf(PRINTING, printing) || "Not selected");
    form.set("quantity", effectiveQuantity ? `${effectiveQuantity} sheets` : "");

    const spec = [
      `Material: ${labelsOf(MATERIALS, material ? [material] : []) || "Not selected"}`,
      `Finishes: ${labelsOf(FINISHES, finishes) || "None"}`,
      `Add-ons: ${labelsOf(ADDONS, addOns) || "None"}`,
      `Design support: ${designHelp ? "Yes" : "No"}`,
      estimate
        ? `Estimated budget: £${estimate.low.toLocaleString()} – £${estimate.high.toLocaleString()}`
        : "Estimated budget: pending review",
      String(form.get("message") || "").trim(),
    ]
      .filter(Boolean)
      .join("\n");
    form.set("message", spec);

    try {
      const res = await fetch("/api/quote", { method: "POST", body: form });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Could not send. Please email us at Info@thewaxpapers.co.uk");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section id="configurator" className="py-14 scroll-mt-24" style={{ backgroundColor: "var(--color-cream-light)" }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "var(--color-gold-pale)" }}
          >
            <svg className="w-7 h-7" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Spec Received</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            Thanks — we have your full specification and will send pricing within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="configurator" className="py-14 scroll-mt-24" style={{ backgroundColor: "var(--color-cream-light)" }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--color-gold)" }}>
            Interactive Configurator
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">Build Your {productName} Spec</h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
            Pick your size, material, printing and quantity to see an instant price estimate, then
            send the spec straight to our production team.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div className="grid gap-5 min-w-0">
            <Step index={1} title="Select Size">
              <OptionGrid>
                {SIZES.map((option) => (
                  <OptionButton
                    key={option.id}
                    option={option}
                    selected={size === option.id}
                    onClick={() => setSize(option.id)}
                  />
                ))}
              </OptionGrid>
              {size === "custom" && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <input
                    className="form-input"
                    inputMode="decimal"
                    placeholder="Width"
                    value={customSize.width}
                    onChange={(e) => setCustomSize((c) => ({ ...c, width: e.target.value }))}
                  />
                  <input
                    className="form-input"
                    inputMode="decimal"
                    placeholder="Height"
                    value={customSize.height}
                    onChange={(e) => setCustomSize((c) => ({ ...c, height: e.target.value }))}
                  />
                  <select
                    className="form-input"
                    value={customSize.unit}
                    onChange={(e) => setCustomSize((c) => ({ ...c, unit: e.target.value }))}
                  >
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="in">inches</option>
                  </select>
                </div>
              )}
            </Step>

            <Step index={2} title="Select Material">
              <OptionGrid>
                {MATERIALS.map((option) => (
                  <OptionButton
                    key={option.id}
                    option={option}
                    selected={material === option.id}
                    onClick={() => setMaterial(option.id)}
                  />
                ))}
              </OptionGrid>
            </Step>

            <Step index={3} title="Printing Options" note="Select all that apply">
              <OptionGrid>
                {PRINTING.map((option) => (
                  <OptionButton
                    key={option.id}
                    option={option}
                    selected={printing.includes(option.id)}
                    onClick={() => toggle(printing, setPrinting, option.id)}
                  />
                ))}
              </OptionGrid>
            </Step>

            <Step index={4} title="Finishes & Treatments" note="Select all that apply">
              <OptionGrid>
                {FINISHES.map((option) => (
                  <OptionButton
                    key={option.id}
                    option={option}
                    selected={finishes.includes(option.id)}
                    onClick={() => toggle(finishes, setFinishes, option.id)}
                  />
                ))}
              </OptionGrid>
            </Step>

            <Step index={5} title="Select Quantity">
              <div className="flex flex-wrap gap-2.5">
                {QUANTITIES.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setQuantity(value);
                      setCustomQuantity("");
                    }}
                    className="min-h-11 px-5 rounded-full text-sm font-semibold transition-colors"
                    style={
                      quantity === value && !customQuantity
                        ? { backgroundColor: "var(--color-gold)", color: "white", border: "1.5px solid var(--color-gold)" }
                        : { backgroundColor: "white", color: "var(--color-charcoal)", border: "1.5px solid var(--color-paper)" }
                    }
                  >
                    {value.toLocaleString()}
                  </button>
                ))}
              </div>
              <label className="flex flex-wrap items-center gap-3 mt-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
                Or enter a custom quantity
                <input
                  className="form-input max-w-[180px]"
                  inputMode="numeric"
                  placeholder="e.g. 750"
                  value={customQuantity}
                  onChange={(e) => setCustomQuantity(e.target.value.replace(/[^0-9]/g, ""))}
                />
              </label>
            </Step>

            <Step index={6} title="Optional Add-Ons" note="Select all that apply">
              <OptionGrid>
                {ADDONS.map((option) => (
                  <OptionButton
                    key={option.id}
                    option={option}
                    selected={addOns.includes(option.id)}
                    onClick={() => toggle(addOns, setAddOns, option.id)}
                  />
                ))}
              </OptionGrid>
            </Step>

            <Step index={7} title="Upload Artwork" note="Optional">
              <label
                htmlFor="cfg-artwork"
                className="flex flex-col items-center gap-2 px-6 py-8 rounded-xl cursor-pointer text-center"
                style={{ border: "1.5px dashed var(--color-paper)", backgroundColor: "white" }}
              >
                <svg className="w-6 h-6" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
                <span className="text-sm font-semibold">
                  {artworkName || "Drop your file here or click to browse"}
                </span>
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  PDF, AI, EPS, PNG, JPG — max 10MB
                </span>
              </label>
              <input
                id="cfg-artwork"
                name="artwork"
                type="file"
                className="sr-only"
                accept=".pdf,.ai,.eps,.png,.jpg,.jpeg"
                onChange={(e) => setArtworkName(e.target.files?.[0]?.name ?? "")}
              />
            </Step>

            <Step index={8} title="Design Support">
              <button
                type="button"
                onClick={() => setDesignHelp((current) => !current)}
                aria-pressed={designHelp}
                className="w-full flex items-start gap-4 px-5 py-4 rounded-xl text-left"
                style={{
                  border: `1.5px solid ${designHelp ? "var(--color-gold)" : "var(--color-paper)"}`,
                  backgroundColor: designHelp ? "var(--color-gold-pale)" : "white",
                }}
              >
                <span
                  className="mt-0.5 flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors"
                  style={{ backgroundColor: designHelp ? "var(--color-gold)" : "var(--color-paper)" }}
                  aria-hidden
                >
                  <span
                    className="h-4 w-4 rounded-full bg-white transition-transform"
                    style={{ transform: designHelp ? "translateX(20px)" : "none" }}
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold">I need free design support</span>
                  <span className="block mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
                    Our studio sets up your print-ready artwork at no charge, with unlimited
                    revisions before production.
                  </span>
                </span>
              </button>
            </Step>

            <Step index={9} title="Your Details">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label" htmlFor="cfg-name">
                    Full Name <span style={{ color: "var(--color-gold)" }}>*</span>
                  </label>
                  <input id="cfg-name" name="name" type="text" required className="form-input" placeholder="Jane Smith" />
                </div>
                <div>
                  <label className="form-label" htmlFor="cfg-email">
                    Email Address <span style={{ color: "var(--color-gold)" }}>*</span>
                  </label>
                  <input id="cfg-email" name="email" type="email" required className="form-input" placeholder="jane@yourbusiness.co.uk" />
                </div>
                <div>
                  <label className="form-label" htmlFor="cfg-phone">Phone Number</label>
                  <input id="cfg-phone" name="phone" type="tel" className="form-input" placeholder="+44 7700 900000" />
                </div>
                <div>
                  <label className="form-label" htmlFor="cfg-company">Company</label>
                  <input id="cfg-company" name="company" type="text" className="form-input" placeholder="Your business" />
                </div>
              </div>
              <div className="mt-4">
                <label className="form-label" htmlFor="cfg-message">Message / Instructions</label>
                <textarea
                  id="cfg-message"
                  name="message"
                  rows={3}
                  className="form-input resize-y"
                  placeholder="Deadline, delivery address, or anything else we should know…"
                />
              </div>
            </Step>
          </div>

          <aside className="lg:sticky lg:top-24 min-w-0">
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "white", border: "1px solid var(--color-paper)" }}>
              <div className="px-6 py-4" style={{ backgroundColor: "var(--color-cream)", borderBottom: "1px solid var(--color-paper)" }}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--color-text-muted)" }}>
                  Your Selections
                </p>
              </div>
              <dl className="px-6">
                {summaryRows.map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-4 py-3" style={{ borderBottom: "1px solid var(--color-cream-light)" }}>
                    <dt className="text-sm" style={{ color: "var(--color-text-muted)" }}>{label}</dt>
                    <dd
                      className="text-sm text-right max-w-[60%]"
                      style={value ? { fontWeight: 600 } : { fontStyle: "italic", color: "var(--color-text-muted)" }}
                    >
                      {value || "Not selected"}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="m-6 px-5 py-5 rounded-xl text-center" style={{ backgroundColor: "var(--color-brown-dark)" }}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Estimated Price Range
                </p>
                <p className="mt-2 text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-gold-light)" }}>
                  {estimate
                    ? `£${estimate.low.toLocaleString()} – £${estimate.high.toLocaleString()}`
                    : "Select material & quantity"}
                </p>
                <p className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Indicative only — final pricing is confirmed once our team reviews your artwork
                  and specification.
                </p>
              </div>

              <ul className="px-6 pb-6 grid gap-2">
                {ASSURANCES.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm">
                    <svg className="w-3.5 h-3.5 mt-1 shrink-0" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-lg text-sm" style={{ backgroundColor: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-4 !py-3 !text-base">
              {loading ? "Sending…" : "Send My Spec for Pricing"}
            </button>
            <a href="tel:+447458651107" className="btn-secondary w-full justify-center mt-3 !py-3">
              Talk to a Packaging Expert
            </a>
          </aside>
        </form>
      </div>
    </section>
  );
}

function Step({
  index,
  title,
  note,
  children,
}: {
  index: number;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl p-5 sm:p-7" style={{ backgroundColor: "white", border: "1px solid var(--color-paper)" }}>
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: "var(--color-brown-dark)" }}
        >
          {index}
        </span>
        <h3 className="text-lg font-bold">{title}</h3>
        {note && (
          <span
            className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ backgroundColor: "var(--color-cream)", color: "var(--color-text-muted)" }}
          >
            {note}
          </span>
        )}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function OptionGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

function OptionButton({
  option,
  selected,
  onClick,
}: {
  option: Option;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="min-h-16 px-4 py-3 rounded-lg text-center transition-colors"
      style={{
        border: `1.5px solid ${selected ? "var(--color-gold)" : "var(--color-paper)"}`,
        backgroundColor: selected ? "var(--color-gold-pale)" : "white",
        boxShadow: selected ? "0 0 0 3px rgba(200,150,58,0.12)" : "none",
      }}
    >
      <span className="block text-sm font-semibold">{option.label}</span>
      {option.hint && (
        <span className="block mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
          {option.hint}
        </span>
      )}
    </button>
  );
}
