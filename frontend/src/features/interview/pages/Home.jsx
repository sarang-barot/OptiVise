import { useState, useRef, useEffect } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {
  useEffect(() => {
    document.title = "Home | OptiVise";
  }, []);
  const { loading, generateReport, reports } = useInterview();
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [errors, setErrors] = useState({});
  const resumeInputRef = useRef();

  const navigate = useNavigate();

  const validateForm = () => {
    const nextErrors = {};
    const trimmedJobDescription = jobDescription.trim();
    const trimmedSelfDescription = selfDescription.trim();
    const resumeFile = resumeInputRef.current?.files?.[0];

    if (!trimmedJobDescription) {
      nextErrors.jobDescription = "Please enter the target job description.";
    }

    if (!resumeFile && !trimmedSelfDescription) {
      nextErrors.selfDescription = "Please upload a resume or provide a self-description.";
    }

    if (resumeFile) {
      const isPdf = resumeFile.type === "application/pdf" || resumeFile.name.toLowerCase().endsWith(".pdf");
      const isDocx = resumeFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || resumeFile.name.toLowerCase().endsWith(".docx");

      if (!isPdf && !isDocx) {
        nextErrors.resume = "Only PDF or DOCX files are allowed.";
      }

      if (resumeFile.size > 5 * 1024 * 1024) {
        nextErrors.resume = "Resume must be smaller than 5MB.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleGenerateReport = async () => {
    if (!validateForm()) {
      return;
    }

    const resumeFile = resumeInputRef.current?.files?.[0];

    const data = await generateReport({ jobDescription: jobDescription.trim(), selfDescription: selfDescription.trim(), resumeFile });
    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading you interview plan...</h1>
      </main>
    );
  }

  return (
    <main className="home">
      <div className="home-inner">
        <header className="home-header">
          <h1>
            Create Your Custom <span>Interview Plan</span>
          </h1>
          <p>
            Let our AI analyze the job requirements and your unique profile to
            <br /> build a winning strategy.
          </p>
        </header>

        <section className="interview-card" aria-label="Interview plan details">
          <div className="left">
            <div className="section-heading">
              <div className="heading-label">
                <span className="heading-label__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </span>
                <label htmlFor="jobDescription">Target Job Description</label>
              </div>
              <span className="badge required">Required</span>
            </div>
            <div className="textarea-wrap job-description-wrap">
              <textarea
                aria-invalid={Boolean(errors.jobDescription)}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  if (errors.jobDescription) setErrors((prev) => ({ ...prev, jobDescription: '' }));
                }}
                name="jobDescription"
                id="jobDescription"
                maxLength="5000"
                value={jobDescription}
                placeholder={
                  "Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires\nproficiency in React, TypeScript, and large-scale system\ndesign..."
                }
                required
              ></textarea>
              {errors.jobDescription && <small style={{ color: '#ff6b6b', display: 'block', marginTop: '0.35rem' }}>{errors.jobDescription}</small>}
              <span className="character-count">0 / 5000 chars</span>
            </div>
          </div>

          <div className="right">
            <div className="section-heading profile-heading">
              <div className="heading-label">
                <span className="heading-label__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <span>Your Profile</span>
              </div>
            </div>

            <div className="input-group resume-group">
              <div className="field-heading">
                <label htmlFor="resume">Upload Resume</label>
                <span className="badge">Best Results</span>
              </div>
              <label className="file-label" htmlFor="resume">
                <span className="file-label__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 16 12 12 8 16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                </span>
                <strong>Click to upload or drag &amp; drop</strong>
                <small>PDF or DOCX (Max 5MB)</small>
              </label>
              <input
                ref={resumeInputRef}
                hidden
                type="file"
                name="resume"
                id="resume"
                accept=".pdf,.docx"
                onChange={() => {
                  if (errors.resume) setErrors((prev) => ({ ...prev, resume: '' }));
                }}
              />
              {errors.resume && <small style={{ color: '#ff6b6b', display: 'block', marginTop: '0.35rem' }}>{errors.resume}</small>}
            </div>

            <div className="or-divider">
              <span>OR</span>
            </div>

            <div className="input-group self-description-group">
              <label htmlFor="selfDescription">Quick Self-Description</label>
              <textarea
                aria-invalid={Boolean(errors.selfDescription)}
                onChange={(e) => {
                  setSelfDescription(e.target.value);
                  if (errors.selfDescription) setErrors((prev) => ({ ...prev, selfDescription: '' }));
                }}
                name="selfDescription"
                id="selfDescription"
                value={selfDescription}
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              ></textarea>
              {errors.selfDescription && <small style={{ color: '#ff6b6b', display: 'block', marginTop: '0.35rem' }}>{errors.selfDescription}</small>}
            </div>

            <div className="helper-message">
              <span className="info-icon">i</span>
              <span>
                Either a <strong>Resume</strong> or a{" "}
                <strong>Self Description</strong> is required to generate a
                personalized plan.
              </span>
            </div>
          </div>

          <footer className="interview-card-footer">
            <span>AI-Powered Strategy Generation&nbsp; · &nbsp;Approx 30s</span>
            <button onClick={handleGenerateReport} className="button primary-button" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              Generate My Interview Strategy
            </button>
          </footer>
        </section>

        {reports.length > 0 && (
          <section className="recent-reports">
            <h2>My Recent Interview Plans</h2>
            <ul className="reports-list">
              {reports.map(report => (
                <li key={report._id} className="report-item" onClick={() => navigate(`/interview/${report._id}`)}>
                  <h3>{report.title || "Untitled Position"}</h3>
                  <p className="report-meta">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                  <p className={`match-score ${report.matchScore >= 80 ? 'score-high' : report.matchScore >= 60 ? 'score-mid' : 'score-low'}`}>Match Score: {report.matchScore}%</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        <nav className="home-footer" aria-label="Footer navigation">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#help">Help Center</a>
        </nav>
      </div>
    </main>
  );
};

export default Home;
