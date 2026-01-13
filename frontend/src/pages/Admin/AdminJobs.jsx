import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { Link } from "react-router-dom";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);

  const load = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data.jobs);
  };

  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await api.delete(`/jobs/${id}`);
    load();
  };

  return (
    <div className="container">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <h2>Admin Jobs</h2>
        <Link to="/admin/create" className="btn-primary">
          + Create Job
        </Link>
      </div>

      {jobs.map(job => (
        <div className="job-card" key={job.job_id}>
          <h3>{job.title}</h3>

          <div style={{ marginBottom: 10 }}>
            <span className="badge badge-location">{job.location}</span>
            <span className="badge badge-type">{job.job_type}</span>
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <Link to={`/admin/jobs/${job.job_id}`} className="btn-outline">
              View Applicants
            </Link>

            <button className="btn-danger" onClick={() => del(job.job_id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
