export default function Section({ title, children, className = '' }) {
  return (
    <section className={`section ${className}`.trim()}>
      <div className="section-heading">
        <span>{title}</span>
        <i aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}
