interface LogoProps {
  size?: 'compact' | 'full';
  variant?: 'light' | 'dark';
  className?: string;
}

export default function Logo({ size = 'full', variant = 'light', className = '' }: LogoProps) {
  const width = size === 'compact' ? 120 : 160;
  const height = size === 'compact' ? 36 : 48;

  const colors = variant === 'light'
    ? {
        title: 'var(--color-navy)',
        subtitle: 'var(--color-primary)',
        divider: 'var(--color-secondary)',
      }
    : {
        title: '#FFFFFF',
        subtitle: 'var(--color-secondary)',
        divider: 'rgba(255, 255, 255, 0.5)',
      };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 48"
      role="img"
      aria-label="Liberty Chérie"
      className={className}
    >
      <title>Liberty Chérie</title>

      {/* LIBERTY */}
      <text
        x="80"
        y="17"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="18"
        fontWeight="700"
        letterSpacing="6"
        fill={colors.title}
      >
        LIBERTY
      </text>

      {/* Decorative divider: ── ✿ ── */}
      <g opacity="0.6">
        <line x1="40" y1="26" x2="72" y2="26" stroke={colors.divider} strokeWidth="1" />

        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="80"
            cy="26"
            rx="3"
            ry="1.2"
            fill={colors.divider}
            transform={`rotate(${angle} 80 26)`}
          />
        ))}
        <circle cx="80" cy="26" r="1" fill={colors.divider} />

        <line x1="88" y1="26" x2="120" y2="26" stroke={colors.divider} strokeWidth="1" />
      </g>

      {/* chérie */}
      <text
        x="80"
        y="40"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="14"
        fontWeight="500"
        fontStyle="italic"
        letterSpacing="1"
        fill={colors.subtitle}
      >
        chérie
      </text>
    </svg>
  );
}
