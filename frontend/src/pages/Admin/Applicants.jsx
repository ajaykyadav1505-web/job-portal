import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { useParams } from "react-router-dom";

export default function Applicants() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  const load = async () => {
    const res = await api.get(`/applications/job/${jobId}`);
    setApps(res.data);
  };

  const update = async (id, status) => {
    await api.put(`/applications/status/${id}`, { status });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <h2>Applicants</h2>

      {apps.map(a => (
        <div className="job-card" key={a.application_id}>
          <h3>{a.name}</h3>
          <p>{a.email}</p>
          <p>Status: <b>{a.status}</b></p>

          {a.resume_url && (
            <a href={a.resume_url} target="_blank" rel="noreferrer">
              View Resume
            </a>
          )}

          <div style={{ marginTop: 10 }}>
            <button onClick={() => update(a.application_id, "shortlisted")}>
              Shortlist
            </button>

            <button onClick={() => update(a.application_id, "rejected")}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
