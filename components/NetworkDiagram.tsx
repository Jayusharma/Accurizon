"use client";

import { useRef, useEffect, useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION — edit these to change positions, labels, timing
// ─────────────────────────────────────────────────────────────────────────────

/**
 * MAIN SERVICE NODES (4 primary nodes connected directly to center)
 * fx, fy: fractional offset from canvas center. Range roughly -0.5 to 0.5.
 *         Negative fx = left, Positive fx = right
 *         Negative fy = up,   Positive fy = down
 * depth:  parallax strength. Higher = moves MORE with mouse (feels closer/3D)
 * size:   dot radius in px — vary slightly for visual interest
 */
const PRIMARY_NODES = [
  {
    id: "bookkeeping",
    label: ["BOOKKEEPING"],
    sub: ["Ledgers, reconciliation", "monthly close cycles"],
    fx: -0.55, fy: -0.05,
    depth: 0.032,
    size: 9,           // slightly bigger
  },
  {
    id: "reporting",
    label: ["FINANCIAL", "REPORTING"],
    sub: ["P&L, balance sheets", "cash flow statements"],
    fx: 0.30, fy: -0.54,
    depth: 0.020,
    size: 8,
  },
  {
    id: "compliance",
    label: ["TAX &", "COMPLIANCE"],
    sub: ["Filings, provisioning", "regulatory alignment"],
    fx: -0.35, fy: 0.34,
    depth: 0.038,
    size: 10,          // biggest — closest feel
  },
  {
    id: "advisory",
    label: ["CFO", "ADVISORY"],
    sub: ["Strategic counsel", "forecasting & KPIs"],
    fx: 0.36, fy: 0.30,
    depth: 0.016,
    size: 8,
  },
];

/**
 * RELAY NODES — 2 smaller, semi-transparent junction dots.
 * Secondary (lighter) lines route THROUGH these instead of connecting
 * the main nodes directly. This creates a more layered, realistic network graph.
 *
 * Placed near the top-left and top-right of the diagram,
 * slightly inward from the main nodes so lines converge naturally.
 */
const RELAY_NODES = [
  {
    id: "relay-left",
    fx: -0.46, fy: -0.40,   // upper-left quadrant, above bookkeeping
    depth: 0.025,
    size: 5,
  },
  {
    id: "relay-right",
    fx: 0.22, fy: -0.76,    // upper-right quadrant, above reporting
    depth: 0.018,
    size: 5,
  },
];

/**
 * SECONDARY LINE TOPOLOGY — lighter lines that form the background web.
 * type "p" = connects two PRIMARY nodes (index into PRIMARY_NODES)
 * type "r" = connects a PRIMARY node to a RELAY node
 * type "rr" = connects two RELAY nodes
 *
 * Lines route: some primary→relay→primary instead of direct primary→primary
 * giving the multi-hop "depth" look from the reference image.
 */
const SECONDARY_LINES: Array<
  | { type: "p"; a: number; b: number }
  | { type: "pr"; p: number; r: number }
  | { type: "rr"; a: number; b: number }
> = [
  { type: "pr", p: 0, r: 0 },   // bookkeeping → relay-left
  { type: "pr", p: 1, r: 1 },   // reporting   → relay-right
  { type: "rr", a: 0, b: 1 },   // relay-left  ↔ relay-right
  // { type: "p",  a: 0, b: 2 },   // bookkeeping ↔ compliance  (left-side vertical)
  // { type: "p",  a: 1, b: 3 },   // reporting   ↔ advisory    (right-side vertical)
  { type: "p",  a: 2, b: 3 },   // compliance  ↔ advisory    (bottom)
  { type: "pr", p: 2, r: 0 },   // compliance  → relay-left  (route up-left)
  { type: "pr", p: 3, r: 1 },   // advisory    → relay-right (route up-right)
];

// ─────────────────────────────────────────────────────────────────────────────
// ENTRANCE ANIMATION PHASES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Phase 0: Only center node visible (initial)
 * Phase 1: Primary lines grow outward from center
 * Phase 2: Primary node dots appear (scale in)
 * Phase 3: Node text labels fade in + relay dots appear
 * Phase 4: Secondary lines draw (the lighter web)
 */
const PHASE_TIMES = [0, 350, 1150, 1450, 1800];

// ─────────────────────────────────────────────────────────────────────────────
// CORNER BRACKET RETICLE (used on center node)
// ─────────────────────────────────────────────────────────────────────────────
function Brackets({ size = 16, stroke = "rgba(0,0,0,0.36)" }: { size?: number; stroke?: string }) {
  const b = `1.4px solid ${stroke}`;
  return (
    <>
      <span style={{ position:"absolute", top:0, left:0, width:size, height:size, borderTop:b, borderLeft:b }} />
      <span style={{ position:"absolute", top:0, right:0, width:size, height:size, borderTop:b, borderRight:b }} />
      <span style={{ position:"absolute", bottom:0, left:0, width:size, height:size, borderBottom:b, borderLeft:b }} />
      <span style={{ position:"absolute", bottom:0, right:0, width:size, height:size, borderBottom:b, borderRight:b }} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NETWORK DIAGRAM COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function NetworkDiagram() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number>(0);

  // Canvas pixel dimensions — measured by ResizeObserver after mount
  const [dim, setDim] = useState({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);

  // Current entrance phase (0-4)
  const [phase, setPhase] = useState(0);

  // Smoothed mouse offset from canvas center (spring-lerped in rAF)
  const smooth = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  // ── DOM refs for rAF direct mutation (avoids React re-renders) ──

  // Each primary node's outer wrapper div (we update left/top directly)
  const priNodeRefs  = useRef<(HTMLDivElement | null)[]>([]);
  // Each relay node's wrapper div
  const relNodeRefs  = useRef<(HTMLDivElement | null)[]>([]);
  // SVG lines for primary connections (center → primary node)
  const priLineRefs  = useRef<(SVGLineElement | null)[]>([]);
  // Diamond markers on primary lines
  const priDiaRefs   = useRef<(SVGRectElement | null)[]>([]);
  // SVG lines for secondary web connections
  const secLineRefs  = useRef<(SVGLineElement | null)[]>([]);
  // Diamond markers on secondary lines
  const secDiaRefs   = useRef<(SVGRectElement | null)[]>([]);

  // ── ResizeObserver: measure canvas ──
  useEffect(() => {
    if (!rootRef.current) return;
    const ro = new ResizeObserver(([e]) => {
      setDim({ w: e.contentRect.width, h: e.contentRect.height });
      setReady(true);
    });
    ro.observe(rootRef.current);
    return () => ro.disconnect();
  }, []);

  // ── Phase timer: fire each phase after previous ──
  useEffect(() => {
    if (!ready) return;
    const timers = PHASE_TIMES.slice(1).map((delay, i) =>
      setTimeout(() => setPhase(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [ready]);

  // ── Mouse events: update target (raw, unsmoothed) ──
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = rootRef.current?.getBoundingClientRect();
    if (!r) return;
    target.current = { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 };
  }, []);
  const onMouseLeave = useCallback(() => { target.current = { x: 0, y: 0 }; }, []);

  // ── rAF loop: spring-lerp mouse → direct DOM mutation ──
  useEffect(() => {
    if (!ready) return;

    const LERP = 0.065; // smoothing factor (lower = smoother/slower)

    const tick = () => {
      // Spring-lerp smooth mouse toward target
      smooth.current.x += (target.current.x - smooth.current.x) * LERP;
      smooth.current.y += (target.current.y - smooth.current.y) * LERP;
      const mx = smooth.current.x;
      const my = smooth.current.y;

      // Canvas center in pixels
      const hw = dim.w / 2;
      const hh = dim.h / 2;

      // Compute current screen positions for each primary node
      const pPos = PRIMARY_NODES.map(n => ({
        x: hw + n.fx * hw + mx * n.depth,
        y: hh + n.fy * hh + my * n.depth,
      }));

      // Compute current screen positions for each relay node
      const rPos = RELAY_NODES.map(n => ({
        x: hw + n.fx * hw + mx * n.depth,
        y: hh + n.fy * hh + my * n.depth,
      }));

      // ── Update primary node wrapper positions ──
      PRIMARY_NODES.forEach((_, i) => {
        const el = priNodeRefs.current[i];
        if (!el) return;
        el.style.left = `${pPos[i].x}px`;
        el.style.top  = `${pPos[i].y}px`;
      });

      // ── Update relay node wrapper positions ──
      RELAY_NODES.forEach((_, i) => {
        const el = relNodeRefs.current[i];
        if (!el) return;
        el.style.left = `${rPos[i].x}px`;
        el.style.top  = `${rPos[i].y}px`;
      });

      // ── Update primary SVG lines (center → each primary node) ──
      PRIMARY_NODES.forEach((_, i) => {
        const ln  = priLineRefs.current[i];
        const dia = priDiaRefs.current[i];
        if (!ln) return;
        const { x, y } = pPos[i];
        // Move endpoint to current node position
        ln.setAttribute("x2", String(x));
        ln.setAttribute("y2", String(y));
        // Move diamond to midpoint
        if (dia) {
          const dmx = (hw + x) / 2;
          const dmy = (hh + y) / 2;
          dia.setAttribute("x", String(dmx - 4));
          dia.setAttribute("y", String(dmy - 4));
          dia.setAttribute("transform", `rotate(45,${dmx},${dmy})`);
        }
      });

      // ── Update secondary SVG lines ──
      SECONDARY_LINES.forEach((seg, i) => {
        const ln  = secLineRefs.current[i];
        const dia = secDiaRefs.current[i];
        if (!ln) return;

        let ax: number, ay: number, bx: number, by: number;

        if (seg.type === "p") {
          // Primary ↔ Primary
          ax = pPos[seg.a].x; ay = pPos[seg.a].y;
          bx = pPos[seg.b].x; by = pPos[seg.b].y;
        } else if (seg.type === "pr") {
          // Primary ↔ Relay
          ax = pPos[seg.p].x; ay = pPos[seg.p].y;
          bx = rPos[seg.r].x; by = rPos[seg.r].y;
        } else {
          // Relay ↔ Relay
          ax = rPos[seg.a].x; ay = rPos[seg.a].y;
          bx = rPos[seg.b].x; by = rPos[seg.b].y;
        }

        ln.setAttribute("x1", String(ax)); ln.setAttribute("y1", String(ay));
        ln.setAttribute("x2", String(bx)); ln.setAttribute("y2", String(by));

        if (dia) {
          const dmx = (ax + bx) / 2;
          const dmy = (ay + by) / 2;
          dia.setAttribute("x", String(dmx - 3));
          dia.setAttribute("y", String(dmy - 3));
          dia.setAttribute("transform", `rotate(45,${dmx},${dmy})`);
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready, dim]);

  // ── Trigger primary line stroke-dashoffset animation (Phase 1) ──
  useEffect(() => {
    if (phase < 1) return;
    priLineRefs.current.forEach((el, i) => {
      if (!el) return;
      // Stagger each line by 65ms
      setTimeout(() => { el.style.strokeDashoffset = "0"; }, i * 65);
    });
  }, [phase]);

  // ── Trigger secondary line stroke-dashoffset animation (Phase 4) ──
  useEffect(() => {
    if (phase < 4) return;
    secLineRefs.current.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => { el.style.strokeDashoffset = "0"; }, i * 80);
    });
  }, [phase]);

  // Shorthand for canvas center
  const hw = dim.w / 2;
  const hh = dim.h / 2;

  // Initial positions (before parallax starts) — used for initial SVG line lengths
  const initP = PRIMARY_NODES.map(n => ({ x: hw + n.fx * hw, y: hh + n.fy * hh }));
  const initR = RELAY_NODES.map(n => ({ x: hw + n.fx * hw, y: hh + n.fy * hh }));

  // Helper: get initial segment endpoints for secondary lines
  function secInitPos(seg: typeof SECONDARY_LINES[number]) {
    if (seg.type === "p")  return { ax: initP[seg.a].x, ay: initP[seg.a].y, bx: initP[seg.b].x, by: initP[seg.b].y };
    if (seg.type === "pr") return { ax: initP[seg.p].x, ay: initP[seg.p].y, bx: initR[seg.r].x, by: initR[seg.r].y };
    return { ax: initR[seg.a].x, ay: initR[seg.a].y, bx: initR[seg.b].x, by: initR[seg.b].y };
  }

  return (
    <div
      ref={rootRef}
      className="relative w-full overflow-hidden select-none"
      style={{ height: "80vh", minHeight: 560 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >

      {/* ── DOT GRID BACKGROUND ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.068) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Soft radial vignette — fades edges of grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 58% 52% at 50% 50%, transparent 10%, rgba(249,250,251,0.70) 100%)",
        }}
      />

      {/* ── SVG LAYER — all lines ── */}
      {ready && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={dim.w}
          height={dim.h}
          style={{ overflow: "visible" }}
        >
          {/* SECONDARY LINES — lighter, drawn first so they sit below */}
          {phase >= 4 && SECONDARY_LINES.map((seg, i) => {
            const { ax, ay, bx, by } = secInitPos(seg);
            const len = Math.hypot(bx - ax, by - ay);
            const mx = (ax + bx) / 2;
            const my = (ay + by) / 2;
            return (
              <g key={`sec-${i}`}>
                <line
                  ref={el => { secLineRefs.current[i] = el; }}
                  x1={ax} y1={ay} x2={bx} y2={by}
                  stroke="rgba(0,0,0,0.09)"
                  strokeWidth="0.85"
                  strokeDasharray={len}
                  strokeDashoffset={len}
                  style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }}
                />
                <rect
                  ref={el => { secDiaRefs.current[i] = el; }}
                  x={mx - 3} y={my - 3} width={6} height={6}
                  fill="#f9fafb" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8"
                  transform={`rotate(45,${mx},${my})`}
                />
              </g>
            );
          })}

          {/* PRIMARY LINES — darker, grow from center outward */}
          {phase >= 1 && PRIMARY_NODES.map((_, i) => {
            const { x, y } = initP[i];
            // strokeDasharray = full line length so dashoffset can animate to 0
            const len = Math.hypot(x - hw, y - hh);
            const mx = (hw + x) / 2;
            const my = (hh + y) / 2;
            return (
              <g key={`pri-${i}`}>
                <line
                  ref={el => { priLineRefs.current[i] = el; }}
                  // x1,y1 = canvas center (where center ball is)
                  x1={hw} y1={hh}
                  x2={x}  y2={y}
                  stroke="rgba(0,0,0,0.26)"
                  strokeWidth="1.1"
                  strokeDasharray={len}
                  strokeDashoffset={len}   // starts hidden, animates to 0
                  style={{ transition: `stroke-dashoffset 0.85s cubic-bezier(0.22,1,0.36,1) ${i * 65}ms` }}
                />
                {/* Diamond marker at line midpoint */}
                <rect
                  ref={el => { priDiaRefs.current[i] = el; }}
                  x={mx - 4} y={my - 4} width={8} height={8}
                  fill="#f9fafb" stroke="rgba(0,0,0,0.28)" strokeWidth="1"
                  transform={`rotate(45,${mx},${my})`}
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* ── CENTER NODE — always visible, fixed at canvas center ── */}
      {/* ALIGNMENT: wrapper has width:0 height:0, so (left,top) = exact pixel (hw,hh).
          The reticle is shifted -54px (half of 108) so its CENTER sits at (hw,hh).
          This means the ball center matches the SVG line origin exactly. */}
      {ready && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{ left: hw, top: hh, width: 0, height: 0 }}
        >
          {/* Label — sits ABOVE reticle center */}
          <p
            className="text-[0.56rem] font-bold uppercase tracking-[0.32em]"
            style={{
              position: "absolute",
              color: "rgba(0,0,0,0.38)",
              bottom: 54 + 8,        // 54px up from center to reticle top, +8 gap
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            ACCURIZON CORE
          </p>

          {/* Reticle box — left:-54 top:-54 centers this 108×108 box on (hw,hh) */}
          <div
            className="relative flex items-center justify-center"
            style={{ position: "absolute", width: 108, height: 108, left: -54, top: -54 }}
          >
            <Brackets size={16} />

            {/* Animated pulse ring */}
            <div className="absolute rounded-full"
                 style={{
                   width: 72, height: 72,
                   border: "1px solid rgba(0,0,0,0.08)",
                   animation: "nd-pulse 3s ease-in-out infinite",
                 }} />

            {/* Dark center ball — its visual center is at (hw,hh) in screen space */}
            <div className="relative z-10 flex items-center justify-center rounded-full"
                 style={{
                   width: 50, height: 50,
                   background: "#111111",
                   boxShadow: "0 8px 30px rgba(0,0,0,0.22)",
                 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                   stroke="rgba(255,255,255,0.78)" strokeWidth="1.4" strokeLinecap="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
              </svg>
            </div>
          </div>

          {/* Description — sits BELOW reticle center */}
          <div
            style={{
              position: "absolute",
              top: 54 + 10,          // 54px down from center to reticle bottom, +10 gap
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              whiteSpace: "nowrap",
              opacity: phase >= 3 ? 1 : 0,
              transition: "opacity 0.55s ease",
            }}
          >
            <p className="text-[0.54rem] leading-[1.8]" style={{ color: "rgba(0,0,0,0.30)" }}>
              Unified financial systems<br />
              Operational clarity layer<br />
              Structured reporting engine
            </p>
          </div>
        </div>
      )}

      {/* ── PRIMARY NODE DOTS + LABELS ── */}
      {ready && PRIMARY_NODES.map((n, i) => (
        <div
          key={n.id}
          ref={el => { priNodeRefs.current[i] = el; }}
          className="absolute z-10 pointer-events-none"
          // Width/height 0 so the (left,top) IS the exact dot center
          style={{ left: initP[i].x, top: initP[i].y, width: 0, height: 0 }}
        >
          {/* ── DOT — centered exactly at (0,0) of this wrapper ── */}
          <div
            style={{
              position: "absolute",
              // Center the dot: shift left and up by half its size
              left: -(n.size),
              top: -(n.size),
              width: n.size * 2,
              height: n.size * 2,
              borderRadius: "50%",
              background: "#2c2c2c",
              boxShadow: `0 0 0 ${n.size * 0.5}px rgba(0,0,0,0.055), 0 4px 14px rgba(0,0,0,0.15)`,
              // Phase 2: scale in
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? "scale(1)" : "scale(0.2)",
              transition: `opacity 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms,
                           transform 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
            }}
          />

          {/* ── LABEL — positioned to the right+below the dot ── */}
          <div
            style={{
              position: "absolute",
              left: n.size + 6,    // 6px gap from dot edge
              top: -(n.size),      // align top with dot top
              whiteSpace: "nowrap",
              // Phase 3: fade in
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(6px)",
              transition: `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms`,
            }}
          >
            {n.label.map((line, li) => (
              <p key={li} className="text-[0.58rem] font-bold uppercase leading-[1.55]"
                 style={{ letterSpacing: "0.22em", color: "rgba(0,0,0,0.72)" }}>
                {line}
              </p>
            ))}
            <div className="mt-0.5">
              {n.sub.map((line, si) => (
                <p key={si} className="text-[0.54rem] leading-[1.65]"
                   style={{ color: "rgba(0,0,0,0.33)" }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* ── RELAY NODES — small, semi-transparent junction dots ── */}
      {/* These appear at Phase 3 with the labels, acting as network junction points */}
      {ready && phase >= 3 && RELAY_NODES.map((n, i) => (
        <div
          key={n.id}
          ref={el => { relNodeRefs.current[i] = el; }}
          className="absolute z-10 pointer-events-none"
          style={{ left: initR[i].x, top: initR[i].y, width: 0, height: 0 }}
        >
          {/* Small square marker (not circle) — differentiates relay from primary */}
          <div
            style={{
              position: "absolute",
              left: -(n.size),
              top: -(n.size),
              width: n.size * 2,
              height: n.size * 2,
              border: "1px solid rgba(0,0,0,0.28)",
              background: "rgba(249,250,251,0.9)",
              opacity: phase >= 3 ? 0.7 : 0,
              transform: phase >= 3 ? "scale(1) rotate(45deg)" : "scale(0) rotate(45deg)",
              transition: `opacity 0.5s ease ${i * 100 + 200}ms, transform 0.5s ease ${i * 100 + 200}ms`,
            }}
          />
        </div>
      ))}

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes nd-pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%       { opacity: 0.08; transform: scale(1.44); }
        }
      `}</style>
    </div>
  );
}
