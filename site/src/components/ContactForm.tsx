"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import type { Dict } from "@/i18n";
import type { Locale } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "success" | "error";
type FieldName = "name" | "email" | "message";

const fieldBaseClasses =
  "w-full rounded-xl border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:outline-none focus:ring-2";
const fieldIdleClasses = "border-border focus:border-accent focus:ring-accent/40";
const fieldErrorClasses = "border-danger focus:border-danger focus:ring-danger/40";
const labelClasses =
  "mb-2 block font-mono text-xs font-medium tracking-[0.04em] text-text-muted";

const EMPTY_FIELD_ERRORS: Record<FieldName, boolean> = {
  name: false,
  email: false,
  message: false,
};

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<"error" | "invalid">("error");
  const [fieldErrors, setFieldErrors] = useState(EMPTY_FIELD_ERRORS);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const text = String(formData.get("message") ?? "").trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailValid || !text) {
      setMessage("invalid");
      setStatus("error");
      setFieldErrors({ name: !name, email: !emailValid, message: !text });
      return;
    }

    setFieldErrors(EMPTY_FIELD_ERRORS);
    setMessage("error");
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: text,
          locale,
          website: formData.get("website") ?? "",
        }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClasses = (hasError: boolean) =>
    `${fieldBaseClasses} ${hasError ? fieldErrorClasses : fieldIdleClasses}`;

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-xl border border-success/50 bg-surface p-6"
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-text-primary">
          {dict.contact.form.success}
        </p>
      </div>
    );
  }

  const hasError = status === "error";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div data-contact-field>
        <label htmlFor="contact-name" className={labelClasses}>
          {dict.contact.form.name}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          aria-invalid={fieldErrors.name || undefined}
          className={fieldClasses(fieldErrors.name)}
        />
      </div>
      <div data-contact-field>
        <label htmlFor="contact-email" className={labelClasses}>
          {dict.contact.form.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          aria-invalid={fieldErrors.email || undefined}
          className={fieldClasses(fieldErrors.email)}
        />
      </div>
      <div data-contact-field>
        <label htmlFor="contact-message" className={labelClasses}>
          {dict.contact.form.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          aria-invalid={fieldErrors.message || undefined}
          aria-describedby={hasError ? "contact-form-error" : "contact-message-hint"}
          className={`${fieldClasses(fieldErrors.message)} resize-y`}
        />
        {hasError ? (
          <p id="contact-form-error" role="alert" className="mt-2 text-sm text-danger">
            {message === "invalid" ? dict.contact.form.invalid : dict.contact.form.error}
          </p>
        ) : (
          <p id="contact-message-hint" className="mt-2 font-mono text-xs tracking-[0.04em] text-text-muted">
            {dict.contact.form.hint}
          </p>
        )}
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div data-contact-field>
        <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
          {status === "sending" ? dict.contact.form.sending : dict.contact.form.send}
          <Send className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
