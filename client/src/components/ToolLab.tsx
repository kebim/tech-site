/**
 * Industrial Field Manual design reminder: Tool Lab is a client-side practice bench, not a fake shell.
 * Each exercise is transparent about its limits and provides a bounded, educational action.
 */
import { useMemo, useState } from "react";
import { Atom, Binary, Braces, Check, Copy, Network, Play, RotateCcw } from "lucide-react";

type LabName = "logic" | "network" | "data" | "quantum";

const labTabs: Array<{ id: LabName; label: string; note: string; icon: typeof Binary }> = [
  { id: "logic", label: "Logic bench", note: "Binary & gates", icon: Binary },
  { id: "network", label: "Network bench", note: "IPv4 subnetting", icon: Network },
  { id: "data", label: "Data bench", note: "JSON formatter", icon: Braces },
  { id: "quantum", label: "Quantum bench", note: "Probability sampler", icon: Atom },
];

function ipv4ToNumber(value: string) {
  const parts = value.split(".");
  if (parts.length !== 4) return null;
  let out = 0;
  for (const part of parts) {
    if (!/^\d+$/.test(part)) return null;
    const n = Number(part);
    if (n < 0 || n > 255) return null;
    out = (out * 256) + n;
  }
  return out >>> 0;
}

function numberToIpv4(value: number) {
  return [24, 16, 8, 0].map((shift) => (value >>> shift) & 255).join(".");
}

export function ToolLab() {
  const [activeLab, setActiveLab] = useState<LabName>("logic");
  const [decimal, setDecimal] = useState("42");
  const [gateA, setGateA] = useState(true);
  const [gateB, setGateB] = useState(false);
  const [gate, setGate] = useState("XOR");
  const [address, setAddress] = useState("192.168.10.34");
  const [prefix, setPrefix] = useState("24");
  const [jsonText, setJsonText] = useState('{\n  "track": "cloud",\n  "ready": true\n}');
  const [jsonStatus, setJsonStatus] = useState("Paste JSON, then format or compact it locally.");
  const [probability, setProbability] = useState(50);
  const [shots, setShots] = useState(128);
  const [quantumResult, setQuantumResult] = useState<{ zero: number; one: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const binaryResult = useMemo(() => {
    const parsed = Number(decimal);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 65535) return "Enter a whole number from 0 to 65,535.";
    return `${parsed.toString(2).padStart(8, "0")}₂`;
  }, [decimal]);

  const gateResult = useMemo(() => {
    const result = gate === "AND" ? gateA && gateB : gate === "OR" ? gateA || gateB : gate === "NAND" ? !(gateA && gateB) : gateA !== gateB;
    return result ? 1 : 0;
  }, [gateA, gateB, gate]);

  const subnet = useMemo(() => {
    const ip = ipv4ToNumber(address);
    const cidr = Number(prefix);
    if (ip === null || !Number.isInteger(cidr) || cidr < 0 || cidr > 32) return { error: "Enter a valid IPv4 address and prefix length from 0 to 32." };
    const mask = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
    const network = (ip & mask) >>> 0;
    const broadcast = (network | (~mask >>> 0)) >>> 0;
    const total = 2 ** (32 - cidr);
    const hostRange = cidr >= 31 ? "Special-use range — verify your network policy." : `${numberToIpv4((network + 1) >>> 0)} – ${numberToIpv4((broadcast - 1) >>> 0)}`;
    return { network: numberToIpv4(network), broadcast: numberToIpv4(broadcast), mask: numberToIpv4(mask), hosts: cidr >= 31 ? "Special-use" : String(total - 2), hostRange };
  }, [address, prefix]);

  function formatJson(compact = false) {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, compact ? 0 : 2));
      setJsonStatus(compact ? "Valid JSON compacted locally." : "Valid JSON formatted locally.");
    } catch (error) {
      setJsonStatus(error instanceof Error ? `Fix JSON: ${error.message}` : "Fix the JSON syntax and try again.");
    }
  }

  function runQuantum() {
    let one = 0;
    for (let i = 0; i < shots; i += 1) if (Math.random() < probability / 100) one += 1;
    setQuantumResult({ one, zero: shots - one });
  }

  async function copyResult() {
    const text = activeLab === "logic" ? `${decimal}₁₀ = ${binaryResult}; ${gate}(${Number(gateA)}, ${Number(gateB)}) = ${gateResult}` : activeLab === "network" && "network" in subnet ? `${address}/${prefix}: ${subnet.network} / ${subnet.mask}` : activeLab === "data" ? jsonText : quantumResult ? `0: ${quantumResult.zero}, 1: ${quantumResult.one}` : "";
    if (!text) return;
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section id="tool-lab" className="tool-lab-section">
      <div className="lab-heading">
        <p className="eyebrow">02 / test in browser</p>
        <h2>Use a small, safe practice bench.</h2>
        <p>These utilities run entirely in your browser. They do not scan networks, save data, connect to cloud accounts, or execute code remotely.</p>
      </div>
      <div className="lab-shell">
        <div className="lab-tabs" role="tablist" aria-label="Tool Lab utilities">
          {labTabs.map((tab) => { const Icon = tab.icon; return <button key={tab.id} role="tab" aria-selected={activeLab === tab.id} className={activeLab === tab.id ? "lab-tab active" : "lab-tab"} onClick={() => setActiveLab(tab.id)}><Icon size={17} /><span>{tab.label}</span><small>{tab.note}</small></button>; })}
        </div>
        <div className="lab-workspace">
          <div className="lab-topline"><span>Local utility / no data leaves this page</span><button onClick={copyResult} className="copy-button">{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy result"}</button></div>
          {activeLab === "logic" && <div className="lab-panel logic-panel" role="tabpanel">
            <div className="lab-block"><p className="lab-label">Decimal → binary</p><label className="lab-input"><span>DEC</span><input value={decimal} onChange={(event) => setDecimal(event.target.value)} inputMode="numeric" aria-label="Decimal number" /></label><output className="lab-output">{binaryResult}</output></div>
            <div className="gate-workspace"><p className="lab-label">Gate sandbox</p><div className="gate-controls"><button onClick={() => setGateA((current) => !current)} className={gateA ? "signal-switch on" : "signal-switch"}>A <b>{Number(gateA)}</b></button><select value={gate} onChange={(event) => setGate(event.target.value)} aria-label="Logic gate"><option>AND</option><option>OR</option><option>XOR</option><option>NAND</option></select><button onClick={() => setGateB((current) => !current)} className={gateB ? "signal-switch on" : "signal-switch"}>B <b>{Number(gateB)}</b></button></div><div className="gate-result"><span>OUTPUT</span><strong>{gateResult}</strong></div></div>
          </div>}
          {activeLab === "network" && <div className="lab-panel subnet-panel" role="tabpanel">
            <div className="subnet-inputs"><label>IPv4 address<input value={address} onChange={(event) => setAddress(event.target.value)} inputMode="decimal" /></label><label>Prefix<input value={prefix} onChange={(event) => setPrefix(event.target.value)} inputMode="numeric" /></label></div>
            {"error" in subnet ? <p className="lab-error">{subnet.error}</p> : <div className="subnet-results"><div><span>Network</span><strong>{subnet.network}</strong></div><div><span>Mask</span><strong>{subnet.mask}</strong></div><div><span>Broadcast</span><strong>{subnet.broadcast}</strong></div><div><span>Usable hosts</span><strong>{subnet.hosts}</strong></div><p><b>Host range:</b> {subnet.hostRange}</p></div>}
          </div>}
          {activeLab === "data" && <div className="lab-panel json-panel" role="tabpanel"><textarea value={jsonText} onChange={(event) => setJsonText(event.target.value)} aria-label="JSON input" spellCheck="false" /><div className="json-actions"><button onClick={() => formatJson(false)} className="lime-button">Format JSON <Braces size={16} /></button><button onClick={() => formatJson(true)} className="outline-button">Compact</button><button onClick={() => setJsonText("")} className="text-reset"><RotateCcw size={14} /> Clear</button></div><p className={jsonStatus.startsWith("Fix") ? "lab-error" : "lab-status"}>{jsonStatus}</p></div>}
          {activeLab === "quantum" && <div className="lab-panel quantum-panel" role="tabpanel"><div className="probability-control"><label>Probability of measuring <b>|1⟩</b></label><input type="range" min="0" max="100" value={probability} onChange={(event) => setProbability(Number(event.target.value))} /><strong>{probability}%</strong></div><div className="shot-row"><label>Samples<select value={shots} onChange={(event) => setShots(Number(event.target.value))}><option value={32}>32 shots</option><option value={128}>128 shots</option><option value={512}>512 shots</option></select></label><button onClick={runQuantum} className="lime-button"><Play size={16} /> Simulate measurements</button></div>{quantumResult ? <div className="quantum-results"><div><span>|0⟩</span><strong>{quantumResult.zero}</strong><i style={{ width: `${(quantumResult.zero / shots) * 100}%` }} /></div><div><span>|1⟩</span><strong>{quantumResult.one}</strong><i style={{ width: `${(quantumResult.one / shots) * 100}%` }} /></div></div> : <p className="lab-status">This is a probability sampler for learning about repeated measurement—not a quantum computer connection.</p>}</div>}
        </div>
      </div>
    </section>
  );
}
