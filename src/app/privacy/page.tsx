export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Liberty Chérie Creation - how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  const lastUpdated = 'January 2026';

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cream via-white to-primary-light/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl text-navy mb-4">Privacy Policy</h1>
            <p className="text-soft-gray">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray">
            <div className="space-y-8 text-soft-gray">
              <div>
                <h2 className="font-display text-xl text-navy mb-4">Introduction</h2>
                <p>
                  Liberty Chérie Creation (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is
                  committed to protecting your personal information. This Privacy Policy explains
                  how we collect, use, disclose, and safeguard your information when you visit
                  our website or make a purchase.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Information We Collect</h2>
                <p className="mb-4">We may collect the following types of information:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Personal Information:</strong> Name, email address, shipping address, phone number</li>
                  <li><strong>Payment Information:</strong> Processed securely through Stripe; we do not store credit card details</li>
                  <li><strong>Order Information:</strong> Products purchased, order history, custom order requests</li>
                  <li><strong>Usage Data:</strong> How you interact with our website, pages visited, time spent</li>
                  <li><strong>Device Information:</strong> Browser type, IP address, device type</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and inquiries</li>
                  <li>Send shipping updates and tracking information</li>
                  <li>Respond to custom order requests</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Information Sharing</h2>
                <p className="mb-4">We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Payment Processors:</strong> Stripe, for secure payment processing</li>
                  <li><strong>Shipping Carriers:</strong> Canada Post or other carriers, to deliver your orders</li>
                  <li><strong>Service Providers:</strong> Supabase (database), Vercel (hosting)</li>
                </ul>
                <p className="mt-4">
                  We do not sell, trade, or rent your personal information to third parties
                  for marketing purposes.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information.
                  All payment transactions are encrypted using SSL technology and processed through
                  Stripe&apos;s secure payment infrastructure. However, no method of transmission over
                  the Internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Cookies</h2>
                <p>
                  We use cookies and similar technologies to enhance your browsing experience,
                  remember your preferences, and analyze website traffic. You can control cookies
                  through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Your Rights</h2>
                <p className="mb-4">Under Canadian privacy law, you have the right to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Access your personal information</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Withdraw consent for marketing communications</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact us at contact@libertycherie.ca.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to fulfill the
                  purposes outlined in this policy, comply with legal obligations, and resolve
                  disputes. Order records are typically retained for 7 years for tax and
                  accounting purposes.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Children&apos;s Privacy</h2>
                <p>
                  Our website is not intended for children under 13. We do not knowingly collect
                  personal information from children under 13.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. The updated policy will
                  be posted on this page with a new &quot;Last updated&quot; date.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or our privacy practices,
                  please contact us at:
                </p>
                <div className="mt-4 p-4 bg-cream rounded-lg">
                  <p><strong>Liberty Chérie Creation</strong></p>
                  <p>Saint-Sauveur, QC J0R 1K0</p>
                  <p>Email: contact@libertycherie.ca</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
