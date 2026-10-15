import { useEffect, useState } from "react";
import "../style/Interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router";

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
  const { report, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    document.title = report
      ? "Interview Plan | OptiVise"
      : "Preparing Interview Plan | OptiVise";
  }, [report]);

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
        <button
          onClick={() => { getResumePdf(interviewId) }}
          className="button primary-button"
        >
          <svg height={"0.6rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
          Download Resume
        </button>
        <div className="sidebar-bottom">
          <a href="/">← Back to Home</a>
          <span className="report-date">Generated on {new Date(report.createdAt).toLocaleDateString()}</span>
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
