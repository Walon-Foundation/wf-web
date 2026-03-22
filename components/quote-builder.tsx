"use client";

import { useMemo, useState } from "react";

const tiers = [
  {
    id: "starter",
    name: "Starter",
    range: "$1000 - $1500",
    base: 1200,
    description: "Best for tight scopes: landing pages, small internal tools, or a single feature.",
    includes: ["Discovery + scope", "1 core user flow", "Launch-ready handoff"],
  },
  {
    id: "growth",
    name: "Growth",
    range: "$2500 - $4000",
    base: 3200,
    description: "Best for full product surfaces, dashboards, and multi-feature builds.",
    includes: ["Product structure + UX pass", "2-4 core flows", "Deployment support"],
  },
  {
    id: "custom",
    name: "Custom",
    range: "Custom",
    base: 0,
    description: "Best for larger or ongoing engagements where scope is evolving.",
    includes: ["Flexible scope", "Roadmap planning", "Ongoing collaboration"],
  },
] as const;

const addons = [
  { id: "design", name: "UI/UX design layer", price: 400 },
  { id: "branding", name: "Brand refresh + landing visuals", price: 300 },
  { id: "ai", name: "AI workflow or integration", price: 600 },
  { id: "payments", name: "Payments integration", price: 350 },
  { id: "admin", name: "Admin panel buildout", price: 450 },
  { id: "infra", name: "Deployment + infra setup", price: 300 },
] as const;

const projectTypes = [
  "Landing page or marketing site",
  "Full-stack web application",
  "Internal dashboard or workflow tool",
  "Backend API or service layer",
  "AI feature or AI-assisted workflow",
  "SDK, package, or developer tooling",
] as const;

const timelines = [
  "ASAP",
  "2-4 weeks",
  "1-2 months",
  "2-3 months",
  "Still exploring",
];

type TierId = (typeof tiers)[number]["id"];

const initialForm = {
  name: "",
  email: "",
  company: "",
  projectType: projectTypes[0],
  timeline: timelines[1],
  summary: "",
  extraContext: "",
};

export function QuoteBuilder() {
  const [selectedTier, setSelectedTier] = useState<TierId>("starter");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tier = tiers.find((item) => item.id === selectedTier) ?? tiers[0];
  const addonTotal = selectedAddons.reduce((total, addonId) => {
    const addon = addons.find((item) => item.id === addonId);
    return total + (addon?.price ?? 0);
  }, 0);
  const total = tier.base + addonTotal;

  const payload = useMemo(
    () => ({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      projectType: form.projectType,
      timeline: form.timeline,
      summary: form.summary.trim(),
      extraContext: form.extraContext.trim(),
      tierId: tier.id,
      tierLabel: tier.name,
      tierRange: tier.range,
      addons: selectedAddons.map((addonId) => addons.find((item) => item.id === addonId)?.name || addonId),
      total,
    }),
    [form, selectedAddons, tier, total],
  );

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setStatus("idle");
    setStatusMessage("");
  }

  function toggleAddon(addonId: string) {
    setSelectedAddons((current) =>
      current.includes(addonId) ? current.filter((id) => id !== addonId) : [...current, addonId],
    );
    setStatus("idle");
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!payload.name) next.name = "Name is required.";
    if (!payload.email) next.email = "Email is required.";
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!payload.summary || payload.summary.length < 25) {
      next.summary = "Add a bit more detail so the scope is clear.";
    }
    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();

    if (Object.keys(next).length > 0) {
      setErrors(next);
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields.");
      return;
    }

    try {
      setStatus("sending");
      setStatusMessage("");
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setStatusMessage("Quote request received. I will reply shortly.");
    } catch {
      setStatus("error");
      setStatusMessage("Submission failed. Use the email fallback below.");
    }
  }

  return (
    <div className="quote-builder">
      <div className="quote-tier-grid">
        {tiers.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`quote-tier-card ${selectedTier === item.id ? "is-active" : ""}`}
            onClick={() => setSelectedTier(item.id)}
          >
            <div className="quote-tier-head">
              <div>
                <p className="eyebrow">{item.name}</p>
                <h3 className="card-title mt-3">{item.range}</h3>
              </div>
              <span className="project-mark project-mark-badge">{item.id === "custom" ? "CX" : "TX"}</span>
            </div>
            <p className="card-copy mt-4">{item.description}</p>
            <ul className="quote-tier-list">
              {item.includes.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="quote-addon-grid">
        {addons.map((addon) => {
          const isActive = selectedAddons.includes(addon.id);
          return (
            <button
              key={addon.id}
              type="button"
              className={`quote-addon ${isActive ? "is-active" : ""}`}
              onClick={() => toggleAddon(addon.id)}
            >
              <div>
                <p className="card-title">{addon.name}</p>
                <p className="card-copy">+${addon.price}</p>
              </div>
              <span className="quote-addon-indicator">{isActive ? "Added" : "Add"}</span>
            </button>
          );
        })}
      </div>

      <div className="quote-summary">
        <div>
          <p className="section-label">Estimated total</p>
          <h2 className="section-title text-4xl sm:text-5xl">
            {tier.range === "Custom" ? "Custom estimate" : `$${total}`}
          </h2>
          <p className="section-text">
            Tier: {tier.name} · Add-ons: {selectedAddons.length}
          </p>
        </div>
        <div className="quote-summary-tags">
          <span className="project-tag">{tier.range}</span>
          {selectedAddons.map((addonId) => {
            const addon = addons.find((item) => item.id === addonId);
            return addon ? <span key={addon.id} className="project-tag">{addon.name}</span> : null;
          })}
        </div>
      </div>

      <form className="quote-form" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="form-field">
            <span className="form-label">Name</span>
            <input
              className={`form-input ${errors.name ? "is-invalid" : ""}`}
              name="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your name"
            />
            {errors.name ? <span className="form-error">{errors.name}</span> : null}
          </label>

          <label className="form-field">
            <span className="form-label">Email</span>
            <input
              className={`form-input ${errors.email ? "is-invalid" : ""}`}
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@example.com"
            />
            {errors.email ? <span className="form-error">{errors.email}</span> : null}
          </label>
        </div>

        <label className="form-field">
          <span className="form-label">Company or organization</span>
          <input
            className="form-input"
            name="company"
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
            placeholder="Optional"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="form-field">
            <span className="form-label">Project type</span>
            <select
              className="form-input"
              name="projectType"
              value={form.projectType}
              onChange={(event) => updateField("projectType", event.target.value)}
            >
              {projectTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span className="form-label">Timeline</span>
            <select
              className="form-input"
              name="timeline"
              value={form.timeline}
              onChange={(event) => updateField("timeline", event.target.value)}
            >
              {timelines.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="form-field">
          <span className="form-label">Project summary</span>
          <textarea
            className={`form-input form-textarea ${errors.summary ? "is-invalid" : ""}`}
            name="summary"
            value={form.summary}
            onChange={(event) => updateField("summary", event.target.value)}
            placeholder="What do you want built, what problem does it solve, and what stage are you at?"
          />
          {errors.summary ? <span className="form-error">{errors.summary}</span> : null}
        </label>

        <label className="form-field">
          <span className="form-label">Extra context</span>
          <textarea
            className="form-input form-textarea form-textarea-sm"
            name="extraContext"
            value={form.extraContext}
            onChange={(event) => updateField("extraContext", event.target.value)}
            placeholder="Anything else that helps clarify scope, constraints, or current state."
          />
        </label>

        {status !== "idle" ? (
          <div className={`form-${status === "success" ? "success" : "error"}`}>
            {statusMessage}
          </div>
        ) : null}

        <div className="intake-action-row">
          <button className="button-primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Quote Request"}
          </button>
          <a href="mailto:hello@walon.foundation" className="button-secondary">
            Email Directly
          </a>
        </div>
      </form>
    </div>
  );
}
