import axios from "../api/axiosInstance";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function JobCard({ job, refresh }) {
  const { user } = useContext(AuthContext);

  const apply = async () => {
    const resume = prompt("Paste your resume link (Google Drive / PDF URL)");

    if (!resume) {
      alert("Resume link is required");
      return;
    }

    try {
      const res = await axios.post(`/applications/${job.job_id}`, {
        resume_url: resume
      });

      alert(res.data.message);
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const save = async () => {
    try {
      const res = await axios.post(`/favourites/${job.job_id}`);
      alert(res.data.message);
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>

      <div style={{ marginBottom: 10 }}>
        <span className="badge badge-location">{job.location}</span>
        <span className="badge badge-type">{job.job_type}</span>
      </div>

      <p>{job.description}</p>

      {user?.role === "candidate" && (
        <div style={{ marginTop: 12 }}>
          <button className="btn-primary" onClick={apply}>
            Apply
          </button>

          <button className="btn-outline" onClick={save}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}
