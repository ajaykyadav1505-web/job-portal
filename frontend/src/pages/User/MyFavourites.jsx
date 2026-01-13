import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

export default function MyFavourites() {
  const [jobs, setJobs] = useState([]);

  const load = async () => {
    const res = await axios.get("/favourites/my");
    setJobs(res.data);
  };

  const remove = async (id) => {
    await axios.delete(`/favourites/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">Saved Jobs</h2>

      {jobs.map((job) => (
        <div className="job-card" key={job.job_id}>
          <h3>{job.title}</h3>

          <div style={{ marginBottom: 10 }}>
            <span className="badge badge-location">{job.location}</span>
            <span className="badge badge-type">{job.job_type}</span>
          </div>

          <p>{job.description}</p>

          <button className="btn-outline" onClick={() => remove(job.job_id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
