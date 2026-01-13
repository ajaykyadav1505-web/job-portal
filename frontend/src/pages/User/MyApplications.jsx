import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get("/applications/my").then(res => setApps(res.data));
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">My Applications</h2>

      {apps.map(job => (
        <div className="job-card" key={job.application_id}>
          <div className="job-title">{job.title}</div>

          <div style={{ marginTop: 6 }}>
            <span className="badge badge-location">{job.location}</span>
            <span className="badge badge-type">{job.job_type}</span>
          </div>

          <div className="job-desc">{job.description}</div>

          <div style={{ marginTop: 10 }}>
            <span className="badge" style={{
              background: job.status === "shortlisted" ? "#ecfdf5" : "#fef3c7",
              color: job.status === "shortlisted" ? "#047857" : "#92400e"
            }}>
              {job.status.toUpperCase()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
