export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Liberty Chérie Creation - terms and conditions for using our website and purchasing our products.',
};

export default function TermsPage() {
  const lastUpdated = 'January 2026';

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cream via-white to-secondary-light/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl text-navy mb-4">Terms of Service</h1>
            <p className="text-soft-gray">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 text-soft-gray">
              <div>
                <h2 className="font-display text-xl text-navy mb-4">Agreement to Terms</h2>
                <p>
                  By accessing or using the Liberty Chérie Creation website and purchasing our
                  products, you agree to be bound by these Terms of Service. If you do not agree
                  to these terms, please do not use our website or services.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Products and Services</h2>
                <p className="mb-4">
                  Liberty Chérie Creation offers handcrafted bags, pouches, accessories, and
                  custom order services. All products are:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Handmade with care in Saint-Sauveur, Quebec</li>
                  <li>Subject to availability</li>
                  <li>Represented as accurately as possible in photographs and descriptions</li>
                  <li>May vary slightly from images due to the handcrafted nature</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Pricing and Payment</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>All prices are displayed in Canadian Dollars (CAD)</li>
                  <li>Prices include applicable taxes where required</li>
                  <li>Payment is processed securely through Stripe</li>
                  <li>We reserve the right to modify prices without prior notice</li>
                  <li>Orders are not confirmed until payment is successfully processed</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Orders and Fulfillment</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Order confirmation will be sent via email upon successful payment</li>
                  <li>Processing times are typically 2-5 business days for in-stock items</li>
                  <li>Custom orders may take 2-4 weeks depending on complexity</li>
                  <li>We reserve the right to cancel orders due to inventory issues or suspected fraud</li>
                  <li>Shipping times vary by location (see Shipping & Returns page)</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Custom Orders</h2>
                <p className="mb-4">For custom order requests:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Custom orders require a consultation and quote approval before production</li>
                  <li>A 50% deposit may be required for custom orders over $100 CAD</li>
                  <li>Custom orders are non-refundable once production has begun</li>
                  <li>Timelines are estimates and may vary based on complexity</li>
                  <li>Final products may vary slightly from initial designs due to the handmade process</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Intellectual Property</h2>
                <p>
                  All content on this website, including but not limited to text, images, logos,
                  designs, and product photographs, is the property of Liberty Chérie Creation
                  and is protected by copyright laws. You may not reproduce, distribute, or use
                  any content without our written permission.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">User Conduct</h2>
                <p className="mb-4">When using our website, you agree not to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Provide false or misleading information</li>
                  <li>Attempt to circumvent security measures</li>
                  <li>Use automated systems to access the website</li>
                  <li>Engage in any activity that disrupts our services</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Liberty Chérie Creation shall not be
                  liable for any indirect, incidental, special, or consequential damages arising
                  from your use of our website or products. Our liability is limited to the
                  amount paid for the specific product in question.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Product Care</h2>
                <p>
                  Our handcrafted products require proper care to maintain their quality. We are
                  not responsible for damage caused by improper care, misuse, or normal wear and
                  tear. Care instructions are provided with each product.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Governing Law</h2>
                <p>
                  These Terms of Service are governed by the laws of the Province of Quebec,
                  Canada. Any disputes shall be resolved in the courts of Quebec.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms of Service at any time. Changes
                  will be posted on this page with an updated date. Continued use of our
                  website after changes constitutes acceptance of the new terms.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-navy mb-4">Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us:
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
