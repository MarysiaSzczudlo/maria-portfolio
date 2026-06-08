interface QuickSummaryProps {
  problem: string;
  solution: string;
  role: string;
  keyResult: string;
}

export function QuickSummaryCard({ problem, solution, role, keyResult }: QuickSummaryProps) {
  const items = [
    { label: 'Problem', value: problem },
    { label: 'Solution', value: solution },
    { label: 'My Role', value: role },
    { label: 'Key Result', value: keyResult },
  ];

  return (
    <div
      className="rounded-xl mb-16"
      style={{
        border: '1px solid var(--portfolio-border)',
        backgroundColor: 'rgba(0,0,0,0.02)',
        padding: '32px',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 md:divide-x divide-y md:divide-y-0"
        style={{ '--tw-divide-opacity': '1', borderColor: 'var(--portfolio-border)' } as React.CSSProperties}
      >
        {items.map((item, i) => (
          <div key={i} className="md:px-6 first:pl-0 pt-6 md:pt-0 first:pt-0">
            <p
              className="font-normal mb-2"
              style={{
                fontSize: '11px',
                color: 'var(--portfolio-accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
              }}
            >
              {item.label}
            </p>
            <p
              className="font-normal"
              style={{
                fontSize: '15px',
                color: 'var(--portfolio-text-primary)',
                lineHeight: '1.5',
              }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
