"use client";

import { FormEvent, useState } from "react";
import { wedding } from "@/lib/wedding";

export function RsvpForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setError("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      address: form.get("address"),
      attending: form.get("attending"),
      guests: form.get("guests"),
      meal: form.get("meal"),
      message: form.get("message"),
    };

    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus("error");
      setError(data.error || "Something went wrong. Please try again.");
      return;
    }
    setStatus("done");
    formElement.reset();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto grid w-full max-w-md gap-6 px-4">
      <Field name="name" label="Name" required />
      <Field name="email" label="Email" type="email" />
      <Field name="address" label="Address" />
      <Select
        name="attending"
        label="Will you attend?"
        options={[
          ["yes", "Joyfully accepting"],
          ["no", "Respectfully declining"],
        ]}
      />
      <Select
        name="guests"
        label="Number of guests"
        options={[["1", "1"], ["2", "2"]]}
      />
      <Select
        name="meal"
        label="Meal preference"
        options={wedding.mealOptions.map((item) => [item, item])}
      />
      <label className="block text-left">
        <span className="text-sm text-mute">Note</span>
        <textarea
          name="message"
          rows={3}
          className="mt-1 w-full border-0 border-b border-[#d9d0bf] bg-transparent py-2 outline-none focus:border-gold"
        />
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {status === "done" ? (
        <p className="text-center text-sm text-leaf">Thank you. Your RSVP has been received with love.</p>
      ) : null}
      <button
        type="submit"
        disabled={status === "saving"}
        className="mx-auto mt-2 rounded-full bg-[#b08978] px-10 py-3 text-sm tracking-[0.14em] text-white uppercase hover:bg-[#9a7566] disabled:opacity-60"
      >
        {status === "saving" ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-left">
      <span className="text-sm text-mute">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full border-0 border-b border-[#d9d0bf] bg-transparent py-2 outline-none focus:border-gold"
      />
    </label>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: (readonly [string, string] | [string, string])[];
}) {
  return (
    <label className="block text-left">
      <span className="text-sm text-mute">{label}</span>
      <select
        name={name}
        className="mt-1 w-full border-0 border-b border-[#d9d0bf] bg-transparent py-2 outline-none focus:border-gold"
      >
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
