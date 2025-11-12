"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

/** ---------- CONFIG ---------- */
const ASSET_BASE = "/images/cable-customizer/"; // put your images in /public/images/cable-customizer

const CABLE_TYPES = [
  "LMR 600",
  "LMR 400",
  "LMR 240",
  "LMR 195",
  "RG 58",
  "RG 142",
  "RG 174",
  "RG 213",
  "RG 223",
];

const CONNECTOR_TYPES = [
  "N-Female",
  "N-Male",
  "TNC-Male",
  "TNC-Female",
  "SMA-Male",
  "SMA-Female",
  "Reverse Polarity SMA-Male",
  "Reverse Polarity SMA-Female",
  "Reverse Polarity TNC-Male",
  "Reverse Polarity TNC-Female",
  "BNC-Male",
  "BNC-Female",
  "N-Female Bulkhead",
];

const CONNECTOR_IMAGE_MAP: Record<string, string[]> = {
  "N-Female": ["n-female-main.png", "n-female-1.png", "n-female-2.png", "n-female-3.png"],
  "N-Male": ["n-male-main.png", "n-male-1.png", "n-male-2.png", "n-male-3.png"],
  "SMA-Male": ["sma-male-main.png", "sma-male-1.png", "sma-male-2.png", "sma-male-3.png"],
  "SMA-Female": ["sma-female-main.png", "sma-female-1.png", "sma-female-2.png", "sma-female-3.png"],
};

// prices
const CONNECTOR_PRICES: Record<
  string,
  Partial<Record<"LMR100" | "LMR195" | "LMR200" | "LMR240" | "LMR400" | "RG58" | "RG142" | "RG174", number>>
> = {
  "N-Male":     { LMR100: 4.95, LMR195: 4.95, LMR200: 4.95, LMR240: 5.95, LMR400: 6.95, RG58: 4.95, RG142: 6.95, RG174: 4.95 },
  "N-Female":   { LMR100: 4.95, LMR195: 4.95, LMR200: 4.95, LMR240: 5.95, LMR400: 6.95, RG58: 4.95, RG142: 6.95, RG174: 4.95 },
  "SMA-Male":   { LMR100: 3.95, LMR195: 3.95, LMR200: 3.95, LMR240: 4.45, LMR400: 4.95, RG58: 4.95, RG142: 4.95, RG174: 3.95 },
  "SMA-Female": { LMR100: 3.85, LMR195: 3.85, LMR200: 3.85, LMR240: 4.45, LMR400: 4.85, RG58: 4.85, RG142: 4.85, RG174: 3.85 },
  "TNC-Male":   { LMR100: 3.95, LMR195: 3.95, LMR200: 3.95, LMR240: 4.65, LMR400: 5.55, RG58: 4.95, RG142: 4.95, RG174: 3.95 },
  "TNC-Female": { LMR100: 3.95, LMR195: 3.95, LMR200: 3.95, LMR240: 4.45, LMR400: 5.55, RG58: 4.95, RG142: 4.95, RG174: 3.95 },
  "QMA-Male":   { LMR100: 5.50, LMR195: 5.50, LMR200: 5.50, LMR240: 6.15, LMR400: 6.95, RG58: 5.95, RG142: 6.50, RG174: 5.50 },
  "QMA-Female": { LMR100: 5.50, LMR195: 5.50, LMR200: 5.50, LMR240: 6.15, LMR400: 6.95, RG58: 5.95, RG142: 6.50, RG174: 5.50 },
};

const CABLE_PRICE_PER_FOOT: Record<
  "LMR100" | "LMR195" | "LMR200" | "LMR240" | "LMR400" | "RG58" | "RG142" | "RG174",
  number
> = {
  LMR100: 0.55,
  LMR195: 0.75,
  LMR200: 0.85,
  LMR240: 0.88,
  LMR400: 1.05,
  RG58: 0.75,
  RG142: 3.85,
  RG174: 0.45,
};

/** ---------- HELPERS ---------- */
function normCableKey(cableLabel: string) {
  return cableLabel.replace(/\s+/g, "") as keyof typeof CABLE_PRICE_PER_FOOT;
}
function getConnectorImages(name: string): string[] {
  const mapped = CONNECTOR_IMAGE_MAP[name];
  if (Array.isArray(mapped)) return mapped;
  const base = (name || "").replace(/\s+/g, "-").toLowerCase();
  return [`${base}-main.png`, `${base}-1.png`, `${base}-2.png`, `${base}-3.png`];
}

/** ---------- PAGE ---------- */
export default function CustomCablePage() {
  const [cable, setCable] = useState("LMR 400");
  const [aConn, setAConn] = useState("N-Male");
  const [bConn, setBConn] = useState("N-Male");
  const [length, setLength] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const cableKey = normCableKey(cable);

  const price = useMemo(() => {
    const a = CONNECTOR_PRICES[aConn]?.[cableKey] ?? 0;
    const b = CONNECTOR_PRICES[bConn]?.[cableKey] ?? 0;
    const cableCost = (CABLE_PRICE_PER_FOOT[cableKey] ?? 0) * (length || 0);
    return (a + b + cableCost) * 1.35;
  }, [aConn, bConn, cableKey, length]);

  const aImages = getConnectorImages(aConn);
  const bImages = getConnectorImages(bConn);

  function decQty() {
    setQuantity((q) => Math.max(1, q - 1));
  }
  function incQty() {
    setQuantity((q) => q + 1);
  }

  async function handleAddToCart() {
    // Wire to Shopify in your API route (this is a stub)
    const payload = {
      cableType: cable,
      connectorA: aConn,
      connectorB: bConn,
      length: `${length} ft`,
      quantity,
      priceEach: Number(price.toFixed(2)),
    };
    console.log("Add to cart:", payload);
    alert("Custom Cable Details" + JSON.stringify(payload, null, 2));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 overflow-hidden pb-10 pt-51.5">
      {/* Title + sub */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-wide">CUSTOM CABLE BUILDER</h1>
        <p className="mt-3 text-sm text-gray-600">
          We use high-quality, low-loss coaxial cables and connectors. After following the steps below,
          our team will build your custom cable to your exact specifications.
        </p>
      </div>

      <div className="my-6 h-px w-full bg-gray-200" />

      {/* ===== Tabs layout corrected ===== */}
      <div className="grid gap-4">
        {/* STEP 1 on top, centered */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <StepTab label="STEP 1">
              <select
                className="w-full rounded border border-gray-300 px-4 py-2.5 text-sm focus:outline-none"
                value={cable}
                onChange={(e) => setCable(e.target.value)}
              >
                {CABLE_TYPES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </StepTab>
          </div>
        </div>

        {/* single DOWN arrow under STEP 1 */}
        <div className="flex justify-center">
          <DownArrow />
        </div>

        {/* STEP 2 (left) and STEP 3 (right) at the bottom */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <StepTab label="STEP 2">
              <select
                className="w-full rounded border border-gray-300 px-4 py-2.5 text-sm focus:outline-none"
                value={aConn}
                onChange={(e) => setAConn(e.target.value)}
              >
                {CONNECTOR_TYPES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </StepTab>
          </div>
          <div>
            <StepTab label="STEP 3">
              <select
                className="w-full rounded border border-gray-300 px-4 py-2.5 text-sm focus:outline-none"
                value={bConn}
                onChange={(e) => setBConn(e.target.value)}
              >
                {CONNECTOR_TYPES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </StepTab>
          </div>
        </div>
      </div>
      {/* ===== end tabs layout ===== */}

      {/* Main preview */}
      <div className="mt-6 grid grid-cols-[1fr_2fr_1fr] items-center gap-6 max-md:grid-cols-3">
        {/* A primary */}
        <div className="flex items-center justify-center">
          <SquareThumb src={ASSET_BASE + aImages[0]} alt={`${aConn} main`} size={70} />
        </div>

        {/* Cable center */}
        <div className="flex items-center justify-center">
          <div className="relative h-5 w-full max-w-[920px]">
            <Image src={ASSET_BASE + "cable.png"} alt="Cable" fill className="object-contain" />
          </div>
        </div>

        {/* B primary */}
        <div className="flex items-center justify-center">
          <SquareThumb src={ASSET_BASE + bImages[0]} alt={`${bConn} main`} size={70} />
        </div>
      </div>

      {/* Galleries + length (STEP 4) */}
      <div className="mt-6 grid grid-cols-[1fr_2fr_1fr] items-start gap-6 max-md:grid-cols-3">
        {/* A gallery */}
        <div className="grid grid-cols-3 place-items-center gap-3">
          {aImages.slice(1).map((f, i) => (
            <SquareThumb key={i} src={ASSET_BASE + f} alt={`${aConn} ${i + 1}`} size={64} inset />
          ))}
        </div>

        {/* Length control (arrow now points DOWN) */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3 h-3 w-4">
            {/* ▼ down arrow */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 border-x-8 border-t-[10px] border-x-transparent border-t-[#6CC04A]" />
          </div>

          <div className="flex items-stretch">
            <div className="flex items-center justify-center rounded-l border border-gray-300 px-4 text-sm font-semibold">
              STEP 4
            </div>
            <input
              type="number"
              min={0}
              step={0.5}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-24 border-y border-l-0 border-r-0 border-gray-300 px-3 text-center text-sm outline-none"
            />
            <div className="flex items-center justify-center rounded-r border border-gray-300 px-3 text-sm">
              ft
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-500">= {(length * 0.3048).toFixed(1)} m</div>
        </div>

        {/* B gallery */}
        <div className="grid grid-cols-3 place-items-center gap-3">
          {bImages.slice(1).map((f, i) => (
            <SquareThumb key={i} src={ASSET_BASE + f} alt={`${bConn} ${i + 1}`} size={64} inset />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-gray-200" />

      {/* Order summary + step 5 (price/qty/button) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-center">
        {/* Summary list */}
        <div>
          <h3 className="text-sm font-extrabold tracking-wide">ORDER SUMMARY</h3>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              Cable Type:{" "}
              <span className="font-semibold">
                {cable.replace(/(\w+\s\d+).*/g, "$1")}{" "}
                - <span className="uppercase">{cable.includes("LMR") ? "Black" : ""}</span>
              </span>
            </li>
            <li>
              Connector A: <span className="font-semibold">{aConn}</span>
            </li>
            <li>
              Connector B: <span className="font-semibold">{bConn}</span>
            </li>
            <li>
              Cable Length: <span className="font-semibold">{length}</span>
            </li>
          </ul>
          <p className="mt-3 text-xs text-gray-600">* Custom Cable sold as is, no returns.</p>
        </div>

        {/* Step 5 tray */}
        <div className="grid w-full grid-cols-[auto_auto_auto_1fr] overflow-hidden rounded border border-gray-300">
          <div className="flex items-center justify-center bg-[#6CC04A] px-5 py-3 text-sm font-bold text-white">
            STEP 5
          </div>

          {/* Quantity group */}
          <div className="flex items-center gap-2 px-4 py-3 text-sm">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center rounded border border-gray-300">
              <button
                onClick={decQty}
                className="px-3 py-1 text-lg leading-none hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                –
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-12 border-x border-gray-300 py-1 text-center outline-none"
              />
              <button
                onClick={incQty}
                className="px-3 py-1 text-lg leading-none hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center px-6 py-3 text-sm font-bold">
            PRICE: ${price.toFixed(2)}
          </div>

          {/* CTA */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-[#6CC04A] px-6 py-3 text-sm font-extrabold tracking-wide text-white transition-colors hover:bg-[#5CAF3F]"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </main>
  );
}

/** ---------- SMALL SUBCOMPONENTS ---------- */
function StepTab({ label, children }: { label: string; children: React.ReactNode }) {
  // green left block + white box
  return (
    <div className="flex items-stretch">
      <div className="flex select-none items-center justify-center bg-[#6CC04A] px-5 text-sm font-bold text-white">
        {label}
      </div>
      <div className="flex-1 border border-gray-300 px-4 py-2.5 text-sm">{children}</div>
    </div>
  );
}

function DownArrow() {
  // ▼ single green triangle pointing DOWN
  return (
    <div className="h-5">
      <div className="mx-auto h-0 w-0 border-x-8 border-t-[10px] border-x-transparent border-t-[#6CC04A]" />
    </div>
  );
}

function SquareThumb({
  src,
  alt,
  size = 64,
  inset,
}: {
  src: string;
  alt: string;
  size?: number;
  inset?: boolean;
}) {
  return (
    <div
      className={`grid place-items-center border border-gray-200 bg-white ${
        inset ? "p-2" : "p-0"
      }`}
      style={{ width: size + (inset ? 8 : 0), height: size + (inset ? 8 : 0) }}
    >
      <Image src={src} alt={alt} width={size} height={size} className="object-contain" />
    </div>
  );
}
