"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import type { Dict } from "@/i18n";
import type { Locale } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "success" | "error";

const inputBaseClasses =
  "w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<"error" | "invalid">("error");

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
      return;
    }

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

  const inputClasses = `${inputBaseClasses} ${
    status === "error" ? "border-danger" : "border-border"
  }`;

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-terminal/50 bg-surface p-6">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-terminal" />
        <p className="text-sm text-text-primary">{dict.contact.form.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-text-muted">
          {dict.contact.form.name}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-text-muted">
          {dict.contact.form.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-text-muted">
          {dict.contact.form.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          className={inputClasses}
        />
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        style={{ caretColor: "transparent" }}
        aria-hidden="true"
      />
      <div>
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? dict.contact.form.sending : dict.contact.form.send}
          <Send className="h-4 w-4" />
        </Button>
        {status === "error" ? (
          <p className="mt-3 text-sm text-danger" role="alert">
            {message === "invalid" ? dict.contact.form.invalid : dict.contact.form.error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
