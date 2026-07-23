export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 prose prose-invert">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>

      <h2>1. Who We Are</h2>
      <p>
        GWS Feedback ("we", "us") is a community feedback platform operated for
        the Greenwood Shopping community. This policy explains what information
        we collect, why, and how it&apos;s handled.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li>
          <strong>Account information</strong> — when you sign in via Discord
          or Roblox OAuth, we receive your account ID, username, and email
          address (if provided by the OAuth provider), and, if you grant it,
          your role/membership status in our Discord server.
        </li>
        <li>
          <strong>Content you submit</strong> — suggestions, comments, and
          votes you post on the platform.
        </li>
        <li>
          <strong>Session data</strong> — a session cookie is set when you log
          in, so you stay signed in between visits. This cookie is required
          for the site to function and does not track you across other
          websites.
        </li>
        <li>
          <strong>Technical logs</strong> — our hosting provider (Vercel) and
          database provider (Neon) may log IP addresses and request metadata
          for security and debugging purposes, retained per their standard
          retention policies.
        </li>
      </ul>

      <h2>3. How We Use Information</h2>
      <ul>
        <li>To authenticate you and maintain your session</li>
        <li>To display your submitted feedback, votes, and comments</li>
        <li>To assign your correct role/permissions based on server/group membership</li>
        <li>To moderate content and enforce our community rules</li>
      </ul>

      <h2>4. Sharing</h2>
      <p>
        We do not sell your information. We do not share your data with third
        parties except: our OAuth providers (Discord, Roblox) as part of the
        login process, and infrastructure providers (Vercel, Neon) who host
        the application and database.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        Your account and submitted content are retained while your account
        remains active. You may request deletion of your account and
        associated data by contacting a staff member through our Discord
        server.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct,
        or delete your personal data, or to object to certain processing.
        To exercise these rights, contact us via our Discord server.
      </p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>
        This service is not directed at children under 13 (or the minimum age
        required by your OAuth provider&apos;s terms). We do not knowingly
        collect data from users below that age.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Continued use of the
        platform after changes constitutes acceptance of the updated policy.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about this policy can be directed to our staff team via
        the Greenwood Shopping Discord server.
      </p>
    </main>
  );
}