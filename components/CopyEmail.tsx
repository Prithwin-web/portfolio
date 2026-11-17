"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./Icons";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers / insecure contexts
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <button type="button" onClick={copy} className="btn btn-paper" aria-label={`Copy email address ${email}`}>
        {copied ? <CheckIcon size={18} className="text-accent" /> : <CopyIcon size={18} />}
        {copied ? "Copied" : "Copy email"}
      </button>
      <div
        role="status"
        aria-live="polite"
        data-show={copied}
        className="toast note note-yellow fixed bottom-6 left-1/2 z-50 px-5 py-3 font-semibold"
      >
        {copied ? "Email address copied to clipboard" : ""}
      </div>
    </>
  );
}
