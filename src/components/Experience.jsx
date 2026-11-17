export default function Experience({ date, title, company, children }) {
  return (
    <div className="experience">
      <div className="experience-date">{date}</div>
      <div className="experience-body">
        <span className="timeline-dot" aria-hidden="true" />
        <h3>{title}</h3>
        <p className="company">{company}</p>
        <ul>{children}</ul>
      </div>
    </div>
  );
}
