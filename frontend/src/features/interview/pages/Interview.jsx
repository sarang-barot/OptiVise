import { useState } from "react";
import "../style/Interview.scss";
import { useInterview } from "../hooks/useInterview";

const navItems = [
  { key: "technical", label: "Technical Questions", icon: "<>" },
  { key: "behavioral", label: "Behavioral Questions", icon: "◌" },
  { key: "roadmap", label: "Road Map", icon: "↗" },
];

const Icon = ({ children }) => (
  <span className="interview-icon">{children}</span>
);

const QuestionList = ({ questions }) => {
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <div className="question-list">
      {questions.map((item, index) => {
        const isOpen = openQuestion === index;

        return (
          <article
            className={`question-card ${isOpen ? "open" : ""}`}
            key={item.question}
          >
            <button
              aria-expanded={isOpen}
              className="question-trigger"
              onClick={() => setOpenQuestion(isOpen ? null : index)}
              type="button"
            >
              <span className="question-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="question-prompt">{item.question}</span>
              <span className="question-chevron" aria-hidden="true">
                ⌄
              </span>
            </button>
            {isOpen && (
              <div className="question-details">
                <div className="question-detail">
                  <span>INTENTION</span>
                  <p>{item.intention}</p>
                </div>
                <div className="question-detail answer">
                  <span>IDEAL ANSWER</span>
                  <p>{item.answer}</p>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};

const Interview = () => {
  const [activeSection, setActiveSection] = useState("technical");
  const { report, loading } = useInterview();

  if (loading || !report) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }
  return (
    <main className="interview-page">
      <aside className="interview-sidebar">
        <div className="report-brand">
          <span className="brand-mark">O</span>
          <span>OptiVise</span>
        </div>
        <div className="sidebar-label">Your Interview Report</div>
        <nav className="report-nav" aria-label="Report sections">
          {navItems.map((item) => (
            <button
              className={activeSection === item.key ? "active" : ""}
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              type="button"
            >
              <Icon>{item.icon}</Icon>
              <span>{item.label}</span>
              {item.key === "technical" && (
                <span className="nav-count">
                  {report.technicalQuestions.length}
                </span>
              )}
              {item.key === "behavioral" && (
                <span className="nav-count">
                  {report.behavioralQuestions.length}
                </span>
              )}
              {item.key === "roadmap" && (
                <span className="nav-count">
                  {report.preparationPlan.length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <a href="/">← Back to Home</a>
          <span className="report-date">Generated Sep 24, 2026</span>
        </div>
      </aside>

      <section className="report-content">
        <header className="report-header">
          <div>
            <p className="eyebrow">Personalized interview preparation</p>
            <h1>
              Your Interview <span>Strategy</span>
            </h1>
            <p className="report-summary">
              A focused roadmap for your Senior Backend Engineer interview.
            </p>
          </div>
          <button className="report-action" type="button">
            <Icon>↓</Icon> Export Report
          </button>
        </header>

        {activeSection === "technical" && (
          <section className="question-section" id="technical-questions">
            <div className="section-title-row">
              <div>
                <p className="eyebrow">Deep dive</p>
                <h2>Technical Questions</h2>
              </div>
              <span className="section-count">
                {report.technicalQuestions.length} questions
              </span>
            </div>
            <QuestionList questions={report.technicalQuestions} />
          </section>
        )}

        {activeSection === "behavioral" && (
          <section
            className="question-section behavioral-section"
            id="behavioral-questions"
          >
            <div className="section-title-row">
              <div>
                <p className="eyebrow">Culture and collaboration</p>
                <h2>Behavioral Questions</h2>
              </div>
              <span className="section-count">
                {report.behavioralQuestions.length} questions
              </span>
            </div>
            <QuestionList questions={report.behavioralQuestions} />
          </section>
        )}

        {activeSection === "roadmap" && (
          <section className="roadmap-section" id="road-map">
            <div className="section-title-row">
              <div>
                <p className="eyebrow">Five focused sessions</p>
                <h2>Preparation Roadmap</h2>
              </div>
            </div>
            <div className="roadmap-list">
              {report.preparationPlan.map((item) => (
                <article className="roadmap-day" key={item.day}>
                  <div className="day-marker">
                    <span>DAY</span>
                    <strong>{String(item.day).padStart(2, "0")}</strong>
                  </div>
                  <div className="roadmap-day-content">
                    <div className="roadmap-day-heading">
                      <h3>{item.focus}</h3>
                      <span>{item.tasks.length} tasks</span>
                    </div>
                    <ul>
                      {item.tasks.map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>

      <aside className="report-rail">
        <section className="score-panel">
          <p className="eyebrow">Profile alignment</p>
          <h2>Match Score</h2>
          <div
            aria-label={`Match score: ${report.matchScore}%`}
            className="score-ring"
            style={{ "--score": `${report.matchScore}%` }}
          >
            <strong>{report.matchScore}</strong>
            <span>/ 100</span>
          </div>
          <p className="score-caption">
            Strong foundation with a few high-impact areas to sharpen.
          </p>
        </section>
        <section className="gap-panel">
          <div className="rail-heading">
            <h2>Skill Gaps</h2>
            <span>{report.skillGaps.length}</span>
          </div>
          <div className="skill-list">
            {report.skillGaps.map((item) => (
              <div className="skill-item" key={item.skill}>
                <span className={`severity-dot ${item.severity}`}></span>
                <span>{item.skill}</span>
                <small>{item.severity}</small>
              </div>
            ))}
          </div>
          <div className="severity-key">
            <span>
              <i className="high"></i> Priority
            </span>
            <span>
              <i className="medium"></i> Focus
            </span>
            <span>
              <i className="low"></i> Maintain
            </span>
          </div>
        </section>
        <section className="rail-note">
          <Icon>✦</Icon>
          <p>
            Start with the high-priority gaps, then use the roadmap to build
            momentum.
          </p>
        </section>
      </aside>
    </main>
  );
};

export default Interview;
