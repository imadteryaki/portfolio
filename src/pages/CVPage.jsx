import {
  FiArrowLeft,
  FiArrowUpRight,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPrinter,
} from "react-icons/fi";

import Section from "../components/Section";
import Experience from "../components/Experience";
import "../styles/cv.css";


const stack = [
  { title: 'Frontend', items: ['React', 'JavaScript', 'Vite', 'Tailwind CSS', 'Bootstrap', 'Framer Motion', 'HTML5', 'CSS3'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'Python', 'Flask'] },
  { title: 'Datenbanken', items: ['MongoDB', 'SQL', 'BigQuery'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'Linux', 'Postman', 'VS Code'] },
];

export default function CVPage({ onBack }) {

  return (
    <div className="cv-shell"  dir="ltr">
      <button
        className="back-button"
        type="button"
        onClick={onBack}
      >
        <FiArrowLeft aria-hidden="true" />
        Zurück zum Portfolio
      </button>

      <button className="print-button" type="button" onClick={() => window.print()}>
        <FiPrinter aria-hidden="true" />
        <span>AUSDRUCKEN</span>
      </button>

      <main className="page">
        <header className="hero">
          <div className="hero-orb one" />
          <div className="hero-orb two" />

          <div className="hero-content">
            <div className="identity">
              <p className="eyebrow">FULL STACK DEVELOPER</p>
              <h1>IMAD <span>TERYAKI</span></h1>
              <p className="headline">React <b>·</b> Node.js <b>·</b> MongoDB <b>·</b> REST APIs</p>
            </div>

            <div className="contact-grid">
              <a href="mailto:teryaki.imad@gmail.com"><FiMail />teryaki.imad@gmail.com</a>
              <span><FiPhone />+49 176 343 440 09</span>
              <span><FiMapPin />Wuppertal, Deutschland</span>
              <a href="https://imadteryaki.vercel.app" target="_blank" rel="noreferrer"><FiGlobe />imadteryaki.vercel.app</a>
              <a className="text-contact" href="https://github.com/imadteryaki" target="_blank" rel="noreferrer">GitHub · imadteryaki</a>
              <a className="text-contact" href="https://www.linkedin.com/in/imad-teryaki-0b7b98270" target="_blank" rel="noreferrer">LinkedIn · Imad Teryaki</a>
            </div>
          </div>
        </header>

        <div className="content">
          <aside>
            <Section title="TECH STACK">
              <div className="stack-grid">
                {stack.map((group) => (
                  <div className="stack-card" key={group.title}>
                    <div className="stack-card-head">
                      <span>{group.title}</span>
                      <b>{String(group.items.length).padStart(2, '0')}</b>
                    </div>
                    <div className="stack-tags">
                      {group.items.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="SPRACHEN">
              <div className="language"><b>Deutsch</b><span>C1</span></div>
              <div className="language"><b>Englisch</b><span>B1</span></div>
              <div className="language"><b>Arabisch</b><span>Muttersprache</span></div>
            </Section>

            <Section title="KERNKOMPETENZEN">
              <div className="competencies">
                <span>Full Stack Development</span>
                <span>Responsive UI</span>
                <span>API-Integration</span>
                <span>Clean Code</span>
                <span>Problemlösung</span>
                <span>Teamarbeit</span>
              </div>
            </Section>
          </aside>

          <article>
            <Section title="PROFIL">
              <p className="profile">
                Ich bin ein kreativer und begeisterter Entwickler für Webanwendungen. Ich entwerfe moderne, benutzerfreundliche und leistungsfähige Webseiten. Ich kenne mich mit React, Node.js, Express und MongoDB aus. Ich erstelle Benutzeroberflächen, die auf verschiedenen Geräten und Bildschirmgrößen gut aussehen, und Backend-APIs, die einfach zu benutzen sind.
                Zur Zeit arbeite ich in meinem Job an einem System, das unserem Unternehmen im Bereich Marketing und Geschäftsprozessen hilft. Dabei vereine ich technisches Wissen mit analytischem Verstand und Eigenverantwortung, um Lösungen zu finden, die wirklich helfen. Ich möchte verläßliche Software entwickeln, die einen echten Nutzen hat.
              </p>
            </Section>

            <Section title="BERUFSERFAHRUNG">
              <div className="timeline">
                <Experience date="02/2026 – HEUTE" title="Softwareentwickler" company="Autoverwertung Wuppertal">
                  <li>Entwicklung eines internen Systems zur Digitalisierung und effizienten Steuerung von Marketing- und Geschäftsprozessen.</li>
                  <li>Konzeption und Implementierung neuer Funktionen sowie gezielte Optimierung bestehender Softwaremodule.</li>
                  <li>Wartung der Anwendung, systematische Fehleranalyse und kontinuierliche Verbesserung von Stabilität und Performance.</li>
                </Experience>

                <Experience date="12/2023 – 10/2024" title="Softwareentwickler" company="GULP Solution Services GmbH">
                  <li>Mitarbeit bei der Entwicklung und Pflege moderner Webanwendungen, insbesondere einer Benutzeroberfläche zur Verwaltung von Kundenstammdaten.</li>
                  <li>Umsetzung technischer Anforderungen sowie Durchführung von Fehleranalysen und Qualitätssicherungsmaßnahmen im Team.</li>
                </Experience>
              </div>
            </Section>

            <Section title="PROJEKT">
              <a className="project" href="https://imadteryaki.vercel.app" target="_blank" rel="noreferrer">
                <div>
                  <div className="project-top">
                    <h3>Developer Portfolio</h3>
                    <span>LIVE PROJECT</span>
                  </div>
                  <p>
                    Mehrsprachiges, responsives Portfolio mit React, Vite, Tailwind CSS, Framer Motion und react-i18next.
                    Entwickelt mit Fokus auf moderne UI, Performance und eine konsistente Personal-Branding-Erfahrung.
                  </p>
                </div>
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </Section>

            <Section title="AUSBILDUNG">
              <div className="education">
                <div><h3>Software-Web Entwicklung</h3><p>DCI Digital Career Institute</p></div>
                <span>11/2022 – 12/2023</span>
              </div>
              <div className="education">
                <div><h3>Informatik</h3><p>Tishreen Universität · Studium nicht abgeschlossen</p></div>
              </div>
            </Section>
          </article>
        </div>
      </main>
    </div>
  );
}
