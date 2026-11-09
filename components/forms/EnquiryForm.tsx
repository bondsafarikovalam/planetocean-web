"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, Info, LoaderCircle, Send } from "lucide-react";
import { categories, programmesIn } from "@/data/programmes";
import { involvementPaths } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Enquiry form. If NEXT_PUBLIC_ENQUIRY_ENDPOINT is set, submissions are POSTed
 * there as JSON. Otherwise the form runs in demo mode and clearly says that
 * nothing has been sent or stored.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "";

type Fields = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  interest: string;
  message: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!f.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address, e.g. name@example.com.";
  if (f.phone.trim() && !PHONE_RE.test(f.phone.trim())) e.phone = "Please enter a valid phone number (digits, spaces, + and - only).";
  if (!f.interest) e.interest = "Please choose what you are interested in.";
  if (f.message.trim().length < 10) e.message = "Please tell us a little more (at least 10 characters).";
  return e;
}

export function EnquiryForm({ defaultInterest = "", className }: { defaultInterest?: string; className?: string }) {
  const uid = useId();
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    interest: defaultInterest,
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "demo" | "error">("idle");

  const id = (k: keyof Fields) => `${uid}-${k}`;

  const update = (k: keyof Fields) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [k]: ev.target.value };
    setFields(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(fields));
  };

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate(fields);
    setErrors(e);
    setTouched({ name: true, email: true, phone: true, interest: true, message: true });
    if (Object.keys(e).length) {
      const first = (Object.keys(e) as (keyof Fields)[])[0];
      document.getElementById(id(first))?.focus();
      return;
    }

    if (!ENDPOINT) {
      setStatus("demo");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...fields, source: typeof window !== "undefined" ? window.location.pathname : "" }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const reset = () => {
    setFields({ name: "", email: "", phone: "", organisation: "", interest: "", message: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const show = (k: keyof Fields) => (touched[k] ? errors[k] : undefined);

  if (status === "demo" || status === "sent") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("rounded-[1.75rem] bg-white p-8 ring-1 ring-ink/10 md:p-10", className)}
      >
        <CircleCheck className="size-10 text-teal" aria-hidden />
        {status === "sent" ? (
          <>
            <h3 className="mt-5 font-display text-2xl font-bold text-ink">Thank you, {fields.name.split(" ")[0]}.</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">Your enquiry has been sent. The Foundation team will be in touch.</p>
          </>
        ) : (
          <>
            <h3 className="mt-5 font-display text-2xl font-bold text-ink">Your enquiry passed validation.</h3>
            <div className="mt-4 flex gap-3 rounded-2xl bg-sand p-4 text-sm leading-relaxed text-ink">
              <Info className="mt-0.5 size-4 shrink-0 text-teal-ink" aria-hidden />
              <p>
                <strong>Demo mode:</strong> this website does not yet have a form backend connected, so your message has{" "}
                <strong>not</strong> been sent or stored anywhere. Once the form is connected, enquiries like this one will reach
                the Foundation team.
              </p>
            </div>
          </>
        )}
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-abyss px-6 text-sm font-semibold text-white transition-colors hover:bg-teal"
        >
          Start a new enquiry
        </button>
      </motion.div>
    );
  }

  const inputBase =
    "mt-2 block w-full rounded-2xl border-0 bg-mist px-4 py-3.5 text-base text-ink ring-1 ring-inset ring-ink/10 transition-shadow placeholder:text-ink-soft/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal";

  return (
    <form noValidate onSubmit={onSubmit} className={cn("rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/10 sm:p-8 md:p-10", className)}>
      {!ENDPOINT && (
        <p className="mb-8 flex gap-2.5 rounded-2xl bg-sand/70 px-4 py-3 text-sm text-ink">
          <Info className="mt-0.5 size-4 shrink-0 text-teal-ink" aria-hidden />
          <span>Preview mode: the form validates your details but does not send them yet.</span>
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("name")} label="Name" required error={show("name")}>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={update("name")}
            onBlur={blur("name")}
            aria-invalid={!!show("name")}
            aria-describedby={show("name") ? `${id("name")}-err` : undefined}
            className={cn(inputBase, show("name") && "ring-2 ring-red-500/70")}
          />
        </Field>
        <Field id={id("email")} label="Email" required error={show("email")}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={fields.email}
            onChange={update("email")}
            onBlur={blur("email")}
            aria-invalid={!!show("email")}
            aria-describedby={show("email") ? `${id("email")}-err` : undefined}
            className={cn(inputBase, show("email") && "ring-2 ring-red-500/70")}
          />
        </Field>
        <Field id={id("phone")} label="Phone" optional error={show("phone")}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={update("phone")}
            onBlur={blur("phone")}
            aria-invalid={!!show("phone")}
            aria-describedby={show("phone") ? `${id("phone")}-err` : undefined}
            className={cn(inputBase, show("phone") && "ring-2 ring-red-500/70")}
          />
        </Field>
        <Field id={id("organisation")} label="Organisation / school" optional>
          <input
            id={id("organisation")}
            name="organisation"
            autoComplete="organization"
            value={fields.organisation}
            onChange={update("organisation")}
            className={inputBase}
          />
        </Field>
        <Field id={id("interest")} label="Interest / programme" required error={show("interest")} className="sm:col-span-2">
          <select
            id={id("interest")}
            name="interest"
            value={fields.interest}
            onChange={update("interest")}
            onBlur={blur("interest")}
            aria-invalid={!!show("interest")}
            aria-describedby={show("interest") ? `${id("interest")}-err` : undefined}
            className={cn(inputBase, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230c2530%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-size-[1.1rem] bg-position-[right_1rem_center] bg-no-repeat pr-12", show("interest") && "ring-2 ring-red-500/70")}
          >
            <option value="">Choose one…</option>
            <optgroup label="Get involved">
              {involvementPaths.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
              <option value="general">General enquiry</option>
            </optgroup>
            {categories.map((c) => (
              <optgroup key={c.id} label={`Programmes — ${c.filterLabel}`}>
                {programmesIn(c.id).map((p) => (
                  <option key={p.number} value={p.number}>
                    {p.number} · {p.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
        <Field id={id("message")} label="Message" required error={show("message")} className="sm:col-span-2">
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            value={fields.message}
            onChange={update("message")}
            onBlur={blur("message")}
            aria-invalid={!!show("message")}
            aria-describedby={show("message") ? `${id("message")}-err` : undefined}
            className={cn(inputBase, "resize-y", show("message") && "ring-2 ring-red-500/70")}
          />
        </Field>
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            Sorry — your enquiry could not be sent. Please try again in a moment.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-soft">
          Fields marked <span aria-hidden className="text-teal-ink">*</span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-aqua px-7 font-semibold text-abyss transition-colors hover:bg-teal hover:text-white disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send enquiry <Send className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden className="ml-0.5 text-teal-ink">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
        {optional && <span className="ml-1.5 font-normal text-ink-soft">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
