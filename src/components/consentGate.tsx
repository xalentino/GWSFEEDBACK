"use client";

import { useEffect, useState } from "react";

export default function ConsentGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("gwsfeedback_consent");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("gwsfeedback_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/70 p-4">
      <div className="max-w-md w-full rounded-xl bg-neutral-900 border border-neutral-700 p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-2">Before you continue</h2>
        <p className="text-sm text-neutral-300 mb-4">
          By using this site, you agree to our{" "}
          <a href="/privacy" target="_blank" className="underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms" target="_blank" className="underline">
            Terms of Service
          </a>
          . We use a session cookie to keep you signed in — nothing else.
        </p>
        <button
          onClick={accept}
          className="w-full rounded-lg bg-white text-black font-medium py-2 hover:bg-neutral-200 transition"
        >
          I Agree, Continue
        </button>
      </div>
    </div>
  );
}