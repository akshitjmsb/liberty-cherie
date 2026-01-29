import { Package, Truck, RefreshCw, Clock, MapPin, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Returns',
  description: 'Learn about our shipping options, delivery times, and return policy for Liberty Chérie Creation products.',
};

export default function ShippingPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cream via-white to-accent-light/20 py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl lg:text-5xl text-navy mb-6">
              Shipping & <span className="text-primary">Returns</span>
            </h1>
            <p className="text-lg text-soft-gray">
              Everything you need to know about getting your handcrafted pieces delivered safely.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Shipping Section */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary-light/20 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl text-navy">Shipping Information</h2>
              </div>

              <div className="space-y-6 text-soft-gray">
                <div className="bg-cream rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-navy mb-2">Shipping Destinations</h3>
                      <p>
                        We currently ship throughout Canada. For international orders,
                        please contact us directly to discuss shipping options.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-cream rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Package className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-navy mb-2">Shipping Rates</h3>
                      <ul className="space-y-2">
                        <li><strong>Orders over $100 CAD:</strong> FREE shipping within Canada</li>
                        <li><strong>Orders under $100 CAD:</strong> Flat rate $12 CAD</li>
                        <li><strong>Local pickup (Saint-Sauveur):</strong> FREE</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-cream rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-navy mb-2">Processing & Delivery Times</h3>
                      <ul className="space-y-2">
                        <li><strong>Processing time:</strong> 2-5 business days</li>
                        <li><strong>Delivery (Quebec):</strong> 3-5 business days</li>
                        <li><strong>Delivery (Rest of Canada):</strong> 5-10 business days</li>
                        <li><strong>Custom orders:</strong> 2-4 weeks (includes creation time)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-sm">
                  All orders are shipped with tracking. You&apos;ll receive a confirmation email
                  with tracking information once your order ships.
                </p>
              </div>
            </div>

            {/* Returns Section */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-secondary-light/30 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="font-display text-2xl text-navy">Returns & Exchanges</h2>
              </div>

              <div className="space-y-6 text-soft-gray">
                <p>
                  We want you to love your Liberty Chérie piece! If you&apos;re not completely
                  satisfied, we&apos;re here to help.
                </p>

                <div className="bg-cream rounded-xl p-6">
                  <h3 className="font-medium text-navy mb-3">Return Policy</h3>
                  <ul className="space-y-2">
                    <li>Returns accepted within <strong>14 days</strong> of delivery</li>
                    <li>Items must be unused and in original condition</li>
                    <li>Original packaging should be included when possible</li>
                    <li>Return shipping costs are the responsibility of the customer</li>
                  </ul>
                </div>

                <div className="bg-cream rounded-xl p-6">
                  <h3 className="font-medium text-navy mb-3">How to Initiate a Return</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Email us at contact@libertycherie.ca with your order number</li>
                    <li>Include the reason for your return</li>
                    <li>We&apos;ll provide return instructions within 24-48 hours</li>
                    <li>Ship the item back using a trackable shipping method</li>
                    <li>Refund will be processed within 5 business days of receiving the item</li>
                  </ol>
                </div>

                <div className="bg-primary-light/20 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-navy mb-2">Non-Returnable Items</h3>
                      <ul className="space-y-1">
                        <li>Custom-made or personalized items</li>
                        <li>Items marked as final sale</li>
                        <li>Items that have been used, washed, or altered</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Damaged Items Section */}
            <div>
              <h2 className="font-display text-2xl text-navy mb-6">Damaged or Defective Items</h2>
              <div className="text-soft-gray space-y-4">
                <p>
                  If your item arrives damaged or defective, please contact us immediately at
                  contact@libertycherie.ca with photos of the damage. We&apos;ll arrange for
                  a replacement or full refund at no additional cost to you.
                </p>
                <p>
                  Please report any damage within 48 hours of delivery to ensure we can
                  properly assist you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
