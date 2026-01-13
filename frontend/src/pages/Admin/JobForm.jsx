import { useState } from "react";
import api from "../../api/axiosInstance";

export default function JobForm() {
  const [job,setJob]=useState({title:"",description:"",location:"",job_type:""});

  const submit=async()=>{
    await api.post("/jobs", job);
    window.location="/admin";
  };

  return (
    <div>
      <h2>Create Job</h2>
      <input placeholder="Title" onChange={e=>setJob({...job,title:e.target.value})}/>
      <input placeholder="Location" onChange={e=>setJob({...job,location:e.target.value})}/>
      <input placeholder="Type" onChange={e=>setJob({...job,job_type:e.target.value})}/>
      <textarea placeholder="Description" onChange={e=>setJob({...job,description:e.target.value})}/>
      <button onClick={submit}>Save</button>
    </div>
  );
}
