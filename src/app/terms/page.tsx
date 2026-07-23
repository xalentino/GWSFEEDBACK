export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 prose prose-invert">
      <h1>Terms of Service</h1>
      <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using this platform, you agree to these Terms of
        Service and our <a href="/privacy">Privacy Policy</a>. If you do not
        agree, please do not use the platform.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must comply with the terms of service of whichever OAuth provider
        (Discord or Roblox) you use to sign in, including any minimum age
        requirements set by that provider.
      </p>

      <h2>3. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Submit false, misleading, abusive, or harassing content</li>
        <li>Attempt to disrupt, exploit, or gain unauthorized access to the platform</li>
        <li>Impersonate another user or misrepresent your affiliation with any person or group</li>
        <li>Use the platform for any unlawful purpose</li>
      </ul>

      <h2>4. Content</h2>
      <p>
        You retain ownership of content you submit, but grant us a license to
        display, moderate, and store it as part of operating the platform.
        We reserve the right to remove content or suspend accounts that
        violate these terms or our community rules.
      </p>

      <h2>5. Moderation</h2>
      <p>
        Staff reserve the right to remove suggestions, comments, or accounts
        at their discretion to maintain a safe and constructive community.
      </p>

      <h2>6. Disclaimer</h2>
      <p>
        This platform is provided "as is" without warranties of any kind. We
        are not liable for any damages arising from your use of the platform.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may modify these terms at any time. Continued use after changes
        constitutes acceptance of the revised terms.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these terms can be directed to our staff team via
        the Greenwood Shopping Discord server.
      </p>
    </main>
  );
}