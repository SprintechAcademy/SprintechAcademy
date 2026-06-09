export default function Logo({ variant = 'lime' }) {
  const sprintechColor = variant === 'lime' ? 'var(--lime)' : 'var(--carbon)';
  const academyColor = 'var(--carbon)';

  return (
    <span className="logo-wrap" aria-label="Sprintech Academy">
      <span
        className="logo-sprintech"
        style={{ color: sprintechColor }}
      >
        Sprintech:
      </span>
      <span
        className="logo-academy"
        style={{ color: academyColor }}
      >
        academy
      </span>
    </span>
  );
}
