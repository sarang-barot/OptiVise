import { useState } from "react";
import "../style/Interview.scss";

const interviewReport = {
  matchScore: 88,
  technicalQuestions: [
    {
      question:
        "How does the Node.js Event Loop handle asynchronous operations, and what are the implications of 'blocking the event loop' in a high-traffic production environment?",
      intention:
        "To assess deep understanding of Node.js internals and the candidate's ability to write performant, non-blocking code.",
      answer:
        "The candidate should explain the phases of the event loop (timers, I/O callbacks, poll, check, etc.) and mention the 'libuv' library. They should explain that blocking the event loop prevents Node.js from processing other requests, leading to increased latency. Solutions include offloading heavy computations to worker threads or microservices and avoiding synchronous versions of FS or Crypto methods.",
    },
    {
      question:
        "You mentioned optimizing PostgreSQL queries. Can you explain the difference between a B-Tree index and a GIN index, and how you use EXPLAIN ANALYZE to identify performance bottlenecks?",
      intention:
        "To verify the candidate's claims about database optimization and their familiarity with PostgreSQL tools.",
      answer:
        "The candidate should explain that B-Tree is the default for equality and range queries, while GIN is better for full-text search or array types. Regarding EXPLAIN ANALYZE, they should mention looking for 'Seq Scan' vs 'Index Scan', 'Cost', and 'Actual Time' to determine where the query planner is spending the most resources.",
    },
    {
      question:
        "In a microservices architecture, how do you ensure data consistency across multiple services without using a distributed monolith approach?",
      intention:
        "To evaluate the candidate's knowledge of distributed systems, which is a requirement for the Senior role.",
      answer:
        "The answer should cover patterns like the Saga Pattern (choreography or orchestration) for eventual consistency, using Outbox patterns to ensure atomicity between database updates and event publishing, and the use of idempotency keys in APIs to handle retries safely.",
    },
    {
      question:
        "How would you implement a distributed rate-limiting mechanism using Redis for a public-facing API?",
      intention:
        "To test practical knowledge of Redis beyond simple key-value caching.",
      answer:
        "The candidate should discuss strategies like Fixed Window, Sliding Window Log, or Token Bucket. They should mention using Redis commands like 'INCR' and 'EXPIRE' or using Lua scripts to ensure atomicity and prevent race conditions between concurrent requests.",
    },
  ],
  behavioralQuestions: [
    {
      question:
        "Describe a time you had to troubleshoot a critical production failure. What was your process for identification, mitigation, and post-mortem analysis?",
      intention:
        "To assess the candidate's reliability under pressure and their systematic approach to debugging.",
      answer:
        "The candidate should use the STAR method. They should mention monitoring tools (like AWS CloudWatch or ELK), how they isolated the root cause, how they implemented a hotfix vs. a long-term fix, and the importance of a blameless post-mortem to prevent recurrence.",
    },
    {
      question:
        "How do you approach a situation where you disagree with a technical decision made by a peer or a lead regarding system architecture?",
      intention:
        "To evaluate communication skills, professional maturity, and collaboration style.",
      answer:
        "The candidate should emphasize data-driven arguments over personal preference. They should mention presenting pros and cons, creating a small Proof of Concept (PoC) if possible, and ultimately following the principle of 'disagree and commit' if a decision is finalized for the sake of the team's progress.",
    },
  ],
  skillGaps: [
    { skill: "Message Brokers (Kafka/RabbitMQ)", severity: "high" },
    { skill: "Kubernetes (Orchestration)", severity: "low" },
    {
      skill: "Advanced System Design Patterns (Circuit Breakers, CQRS)",
      severity: "medium",
    },
  ],
  preparationPlan: [
    {
      day: 1,
      focus: "Advanced Node.js & TypeScript",
      tasks: [
        "Review Node.js Event Loop phases and Worker Threads API.",
        "Practice advanced TypeScript concepts like Generics, Utility Types, and Decorators.",
        "Refactor an existing piece of logic to use Streams to handle large data sets.",
      ],
    },
    {
      day: 2,
      focus: "Database Mastery & Performance",
      tasks: [
        "Deep dive into PostgreSQL Indexing strategies (B-Tree, GIN, BRIN).",
        "Practice writing complex queries and optimizing them using EXPLAIN ANALYZE.",
        "Review Redis eviction policies and advanced data structures like Sorted Sets and Hashes.",
      ],
    },
    {
      day: 3,
      focus: "Microservices & Distributed Systems",
      tasks: [
        "Study the Saga Pattern and Outbox Pattern for distributed transactions.",
        "Learn the basics of Kafka or RabbitMQ, focusing on 'At-least-once' delivery and Consumer Groups.",
        "Read about Circuit Breakers and how to implement them in Node.js (e.g., using Opossum).",
      ],
    },
    {
      day: 4,
      focus: "Infrastructure & System Design",
      tasks: [
        "Review AWS services commonly used with Node.js: Lambda, ECS/Fargate, RDS, and S3.",
        "Practice drawing System Design diagrams for high-traffic applications (e.g., a URL Shortener or a Notification System).",
        "Study Docker multi-stage builds for optimizing image sizes.",
      ],
    },
    {
      day: 5,
      focus: "Behavioral Preparation & Mock Interviews",
      tasks: [
        "Prepare STAR method stories for: production failures, technical disagreements, and leading a project.",
        "Review the job description one last time to align project examples with their Responsibilities section.",
        "Conduct a mock interview focusing on explaining architectural decisions clearly.",
      ],
    },
  ],
};

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
                  {interviewReport.technicalQuestions.length}
                </span>
              )}
              {item.key === "behavioral" && (
                <span className="nav-count">
                  {interviewReport.behavioralQuestions.length}
                </span>
              )}
              {item.key === "roadmap" && (
                <span className="nav-count">
                  {interviewReport.preparationPlan.length}
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
                {interviewReport.technicalQuestions.length} questions
              </span>
            </div>
            <QuestionList questions={interviewReport.technicalQuestions} />
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
                {interviewReport.behavioralQuestions.length} questions
              </span>
            </div>
            <QuestionList questions={interviewReport.behavioralQuestions} />
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
              {interviewReport.preparationPlan.map((item) => (
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
            aria-label={`Match score: ${interviewReport.matchScore}%`}
            className="score-ring"
            style={{ "--score": `${interviewReport.matchScore}%` }}
          >
            <strong>{interviewReport.matchScore}</strong>
            <span>/ 100</span>
          </div>
          <p className="score-caption">
            Strong foundation with a few high-impact areas to sharpen.
          </p>
        </section>
        <section className="gap-panel">
          <div className="rail-heading">
            <h2>Skill Gaps</h2>
            <span>{interviewReport.skillGaps.length}</span>
          </div>
          <div className="skill-list">
            {interviewReport.skillGaps.map((item) => (
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
