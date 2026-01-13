import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import JobCard from "../../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("new");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const [total, setTotal] = useState(0);

  const load = async () => {
    const res = await api.get(
      `/jobs?search=${search}&location=${location}&job_type=${type}&page=${page}&sort=${sort}`
    );
    setJobs(res.data.jobs);
    setTotal(res.data.total);
  };

  useEffect(() => {
    load();
  }, [page, sort]);

  return (
    <div className="container job-grid">
      {/* Sidebar Filters */}
      <div className="sidebar">
        <h3>Search Jobs</h3>

        <input
          placeholder="Search by title"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />

        <select onChange={e => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        <button className="btn-primary" onClick={() => { setPage(1); load(); }}>
          Search
        </button>

        <hr />

        <select onChange={e => setSort(e.target.value)}>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
        </select>
      </div>

      {/* Job List */}
      <div>
        {jobs.map(job => (
          <JobCard key={job.job_id} job={job} refresh={load} />
        ))}

        <div style={{ marginTop: 20 }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
          <span style={{ margin: "0 15px" }}>Page {page}</span>
          <button onClick={() => page * 5 < total && setPage(p => p + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
