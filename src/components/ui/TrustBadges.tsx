import { Shield, Lock, Truck, CreditCard } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  showPaymentIcons?: boolean;
  className?: string;
}

export default function TrustBadges({
  variant = 'horizontal',
  showPaymentIcons = true,
  className = '',
}: TrustBadgesProps) {
  const badges = [
    {
      icon: Shield,
      label: 'Secure Checkout',
      description: '256-bit SSL encryption',
    },
    {
      icon: Lock,
      label: 'Privacy Protected',
      description: 'Your data is safe',
    },
    {
      icon: Truck,
      label: 'Free Shipping',
      description: 'On orders over $100',
    },
    {
      icon: CreditCard,
      label: 'Easy Payments',
      description: 'All major cards accepted',
    },
  ];

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="flex items-center gap-1.5 text-soft-gray text-sm">
          <Shield className="w-4 h-4" />
          <span>Secure Checkout</span>
        </div>
        {showPaymentIcons && (
          <div className="flex items-center gap-2">
            <PaymentIcon type="visa" />
            <PaymentIcon type="mastercard" />
            <PaymentIcon type="amex" />
            <PaymentIcon type="applepay" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className={`${
          variant === 'horizontal'
            ? 'flex flex-wrap justify-center gap-6 md:gap-8'
            : 'grid grid-cols-2 gap-4'
        }`}
      >
        {badges.map((badge) => (
          <div
            key={badge.label}
            className={`flex items-center gap-3 ${
              variant === 'vertical' ? 'flex-row' : 'flex-col text-center'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-secondary-light/30 flex items-center justify-center flex-shrink-0">
              <badge.icon className="w-5 h-5 text-secondary-dark" />
            </div>
            <div>
              <p className="font-medium text-navy text-sm">{badge.label}</p>
              {variant === 'vertical' && (
                <p className="text-soft-gray text-xs">{badge.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showPaymentIcons && (
        <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-cream">
          <span className="text-soft-gray text-sm mr-2">We accept:</span>
          <PaymentIcon type="visa" />
          <PaymentIcon type="mastercard" />
          <PaymentIcon type="amex" />
          <PaymentIcon type="applepay" />
          <PaymentIcon type="googlepay" />
        </div>
      )}
    </div>
  );
}

interface PaymentIconProps {
  type: 'visa' | 'mastercard' | 'amex' | 'applepay' | 'googlepay';
}

function PaymentIcon({ type }: PaymentIconProps) {
  const iconStyles = 'w-10 h-6 rounded bg-white border border-cream flex items-center justify-center';

  const icons: Record<string, React.ReactNode> = {
    visa: (
      <div className={iconStyles} aria-label="Visa">
        <svg viewBox="0 0 48 32" className="w-8 h-5">
          <path fill="#1A1F71" d="M17.545 11.348l-3.68 9.304H11.29l-1.812-7.43c-.11-.432-.206-.59-.54-.772-.55-.298-1.458-.577-2.255-.75l.054-.252h3.986c.508 0 .965.338 1.081.923l.986 5.237 2.437-6.16h2.318zm9.168 6.272c.01-2.457-3.398-2.593-3.375-3.69.008-.334.326-.69 1.021-.78.345-.045 1.297-.08 2.376.416l.423-1.974a6.472 6.472 0 00-2.253-.413c-2.381 0-4.056 1.266-4.07 3.079-.016 1.34 1.196 2.087 2.11 2.533.94.457 1.256.75 1.252 1.158-.006.626-.75.902-1.445.913-.214.004-.83-.053-1.56-.271l-.447 1.983a6.888 6.888 0 002.146.367c2.53 0 4.184-1.25 4.194-3.187v-.134h.628zm6.275 3.032h2.044l-1.782-9.304h-1.887c-.425 0-.783.247-.942.627l-3.318 7.89h2.318l.46-1.274h2.832l.275 1.061zm-2.463-3.025l1.164-3.209.67 3.209h-1.834zm-9.287-6.279l-1.824 9.304H17.28l1.824-9.304h2.134z"/>
        </svg>
      </div>
    ),
    mastercard: (
      <div className={iconStyles} aria-label="Mastercard">
        <svg viewBox="0 0 48 32" className="w-8 h-5">
          <circle cx="18" cy="16" r="8" fill="#EB001B"/>
          <circle cx="30" cy="16" r="8" fill="#F79E1B"/>
          <path fill="#FF5F00" d="M24 10.27a8 8 0 010 11.46 8 8 0 010-11.46z"/>
        </svg>
      </div>
    ),
    amex: (
      <div className={iconStyles} aria-label="American Express">
        <svg viewBox="0 0 48 32" className="w-8 h-5">
          <rect fill="#006FCF" x="4" y="6" width="40" height="20" rx="2"/>
          <text fill="white" fontSize="8" fontWeight="bold" x="24" y="18" textAnchor="middle">AMEX</text>
        </svg>
      </div>
    ),
    applepay: (
      <div className={iconStyles} aria-label="Apple Pay">
        <svg viewBox="0 0 48 32" className="w-8 h-5">
          <path fill="#000" d="M13.5 11.5c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.3-1.1zm.8 1.3c-1.3-.1-2.4.7-3 .7-.6 0-1.5-.7-2.5-.6-1.3 0-2.5.7-3.1 1.9-1.4 2.4-.4 5.9.9 7.8.6.9 1.4 2 2.4 1.9 1-.1 1.3-.6 2.5-.6 1.1 0 1.4.6 2.5.6 1 0 1.7-.9 2.3-1.9.7-1.1 1-2.1 1-2.2-.1-.1-2-.8-2-3 0-1.9 1.5-2.8 1.6-2.8-.9-1.3-2.3-1.5-2.6-1.8zm8.4-2.5v12.3h1.9v-4.2h2.6c2.4 0 4-1.6 4-4.1 0-2.4-1.6-4-3.9-4h-4.6zm1.9 1.6h2.2c1.6 0 2.6 1.1 2.6 2.4 0 1.3-.9 2.4-2.6 2.4h-2.2v-4.8zm10.9 10.8c1.2 0 2.3-.6 2.8-1.6h.1v1.5h1.8V16c0-1.8-1.4-3-3.6-3-2 0-3.5 1.1-3.5 2.8h1.7c.1-.9.9-1.4 1.8-1.4 1.2 0 1.8.5 1.8 1.5v.7l-2.4.1c-2.2.1-3.4 1-3.4 2.6 0 1.5 1.2 2.6 2.9 2.6zm.5-1.5c-1 0-1.7-.5-1.7-1.3 0-.8.6-1.3 1.9-1.4l2.1-.1v.7c0 1.2-1 2.1-2.3 2.1zm6.5 4.6c1.8 0 2.7-.7 3.4-2.8l3.3-9.1h-2l-2.2 7.1h-.1l-2.2-7.1h-2l3.2 8.7-.2.5c-.3.9-.8 1.2-1.6 1.2-.2 0-.4 0-.5 0v1.5c.1 0 .6 0 .9 0z"/>
        </svg>
      </div>
    ),
    googlepay: (
      <div className={iconStyles} aria-label="Google Pay">
        <svg viewBox="0 0 48 32" className="w-8 h-5">
          <path fill="#4285F4" d="M24 13.5v5h7.2c-.3 1.5-1.2 2.8-2.4 3.6l3.9 3c2.3-2.1 3.6-5.2 3.6-8.9 0-.9-.1-1.7-.2-2.5H24v-.2z"/>
          <path fill="#34A853" d="M12.7 19.2c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-4-3.1c-1.2 2.4-1.9 5-1.9 7.8s.7 5.5 1.9 7.8l4-3.1z"/>
          <path fill="#FBBC05" d="M24 9c1.9 0 3.6.7 5 1.8l3.7-3.7c-2.3-2.1-5.3-3.4-8.7-3.4-5.2 0-9.8 2.9-12.3 7.1l4 3.1c.9-2.9 3.6-4.9 6.3-4.9z"/>
          <path fill="#EA4335" d="M24 27.3c-4.6 0-8.6-3.1-10-7.5l-4 3.1c2.5 4.9 7.5 8.1 13 8.1 3.2 0 6.3-1.1 8.6-3l-3.9-3c-1.1.7-2.4 1.1-3.7 1.3z"/>
        </svg>
      </div>
    ),
  };

  return icons[type] || null;
}
