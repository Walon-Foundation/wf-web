"use client";

import { useMemo, useState } from "react";

const projectTypes = [
  "Landing page or marketing site",
  "Full-stack web application",
  "Internal dashboard or workflow tool",
  "Backend API or service layer",
  "AI feature or AI-assisted workflow",
  "SDK, package, or developer tooling",
] as const;

const budgetRanges = [
  "Under $1k",
  "$1k - $3k",
  "$3k - $7k",
  "$7k - $15k",
  "$15k+",
];

const timelines = [
  "ASAP",
  "2-4 weeks",
  "1-2 months",
  "2-3 months",
  "Still exploring",
];

const intakeNotes = [
  "Clear scope leads to better timelines.",
  "Budget range helps shape the right solution.",
  "A short summary is enough for the first pass.",
];

const initialForm = {
  name: "",
  email: "",
  company: "",
  projectType: projectTypes[0],
  budgetRange: budgetRanges[1],
  timeline: timelines[1],
  summary: "",
  extraContext: "",
};

type FormState = typeof initialForm;

function getExtraFieldCopy(projectType: FormState["projectType"]) {
  if (projectType === "AI feature or AI-assisted workflow") {
    return {
      label: "AI context",
      placeholder: "What kind of AI workflow, data source, model provider, or automation are you thinking about?",
    };
  }

  if (projectType === "SDK, package, or developer tooling") {
    return {
      label: "Developer audience",
      placeholder: "Who is this tool for and what workflow should it improve?",
    };
  }

  if (projectType === "Landing page or marketing site") {
    return {
      label: "Content and brand state",
      placeholder: "Do you already have copy, branding, references, or a visual direction?",
    };
  }

  return {
    label: "Extra context",
    placeholder: "Anything else that helps clarify the scope, constraints, or current state of the project?",
  };
}

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.summary.trim()) {
    errors.summary = "Project summary is required.";
  } else if (form.summary.trim().length < 25) {
    errors.summary = "Add a bit more detail so the scope is clear.";
  }

  return errors;
}

export function ProjectInquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSentStateVisible, setIsSentStateVisible] = useState(false);

  const extraField = getExtraFieldCopy(form.projectType);

  const mailtoHref = useMemo(() => {
    const subject = `Project inquiry: ${form.projectType}`;
    const body = [
      `Name: ${form.name || "-"}`,
      `Email: ${form.email || "-"}`,
      `Company / org: ${form.company || "-"}`,
      `Project type: ${form.projectType}`,
      `Budget range: ${form.budgetRange}`,
      `Timeline: ${form.timeline}`,
      "",
      "Project summary:",
      form.summary || "-",
      "",
      `${extraField.label}:`,
      form.extraContext || "-",
    ].join("\n");

    return `mailto:hello@walon.foundation?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [extraField.label, form]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setIsSentStateVisible(false);
  }

  function handleSend(event: React.MouseEvent<HTMLAnchorElement>) {
    const nextErrors = validate(form);

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      setErrors(nextErrors);
      setIsSentStateVisible(false);
      return;
    }

    setIsSentStateVisible(true);
  }

  return (
    <div className="intake-shell">
      <div className="intake-shell-glow" />

      <div className="intake-layout">
        <aside className="intake-sidebar">
          <div className="space-y-4">
            <p className="section-label">Project Intake</p>
            <h2 className="section-title text-4xl sm:text-5xl">
              Send details that actually help scope the work.
            </h2>
            <p className="section-text">
              This first version prepares a structured inquiry email. It keeps
              the process lightweight while still giving enough context to
              discuss fit, scope, and next steps.
            </p>
          </div>

          <div className="intake-summary-grid">
            <div className="intake-summary-card">
              <span className="intake-stat">1</span>
              <p className="card-copy">Choose the closest project type.</p>
            </div>
            <div className="intake-summary-card">
              <span className="intake-stat">2</span>
              <p className="card-copy">Add budget and timeline context.</p>
            </div>
            <div className="intake-summary-card">
              <span className="intake-stat">3</span>
              <p className="card-copy">Write a clear summary and send it.</p>
            </div>
          </div>

          <div className="intake-note-stack">
            {intakeNotes.map((note) => (
              <div key={note} className="intake-note">
                <span className="service-dot" />
                <p className="card-copy">{note}</p>
              </div>
            ))}
          </div>

          <div className="intake-preview">
            <p className="eyebrow">Current Scope</p>
            <div className="intake-preview-grid">
              <div className="intake-preview-chip">{form.projectType}</div>
              <div className="intake-preview-chip">{form.budgetRange}</div>
              <div className="intake-preview-chip">{form.timeline}</div>
            </div>
          </div>
        </aside>

        <div className="intake-form-panel">
          <form className="grid gap-5">
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

            <div className="intake-band">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="form-field">
                  <span className="form-label">Project type</span>
                  <select
                    className="form-input"
                    name="projectType"
                    value={form.projectType}
                    onChange={(event) =>
                      updateField("projectType", event.target.value as FormState["projectType"])
                    }
                  >
                    {projectTypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="form-field">
                  <span className="form-label">Budget range</span>
                  <select
                    className="form-input"
                    name="budgetRange"
                    value={form.budgetRange}
                    onChange={(event) => updateField("budgetRange", event.target.value)}
                  >
                    {budgetRanges.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

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
              <span className="form-label">{extraField.label}</span>
              <textarea
                className="form-input form-textarea form-textarea-sm"
                name="extraContext"
                value={form.extraContext}
                onChange={(event) => updateField("extraContext", event.target.value)}
                placeholder={extraField.placeholder}
              />
            </label>

            {isSentStateVisible ? (
              <div className="form-success">
                Your email client should open with the inquiry prefilled. If it
                does not, use the direct email button instead.
              </div>
            ) : null}

            <div className="intake-action-row">
              <a href={mailtoHref} className="button-primary" onClick={handleSend}>
                Send Inquiry
              </a>
              <a href="mailto:hello@walon.foundation" className="button-secondary">
                Email Directly
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
