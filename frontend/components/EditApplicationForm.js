import React, { useState } from 'react';
import axios from 'axios';

const EditApplicationForm = (props) => {
  const { application } = props;

  const [name, setName] = useState(application?.name || '');
  const [company, setCompany] = useState(application?.company || '');
  const [status, setStatus] = useState(application?.status || '');
  const [technicalSkills, setTechnicalSkills] = useState(application?.job?.technicalSkills?.join(', ') || '');
  const [softSkills, setSoftSkills] = useState(application?.job?.softSkills?.join(', ') || '');
  const [education, setEducation] = useState(application?.job?.education || '');
  const [experience, setExperience] = useState(application?.job?.experience || '');
  const [postDate, setPostDate] = useState(application?.job?.postDate || '');
  const [closeDate, setCloseDate] = useState(application?.job?.closeDate || '');
  const [source, setSource] = useState(application?.job?.source || '');
  const [url, setURL] = useState(application?.job?.url);
  const [salary, setSalary] = useState(application?.job?.salary);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare data
    const updatedApplication = {
      ...application,
      name,
      company,
      status,
      job: {
        ...application.job,
        technicalSkills: technicalSkills.split(/,\s*/),
        softSkills: softSkills.split(/,\s*/),
        education,
        experience,
        postDate,
        closeDate,
        source,
        url,
        salary
      }

    };

    try {
      // Send the update request
      await axios.put(`http://localhost:8080/tracker/updateApp/${application.id}`, updatedApplication, {
        withCredentials: true
      });

      // Close the modal and refresh the data
      props.onUpdateSuccess();
    } catch (error) {
      // Handle the error
      console.error('Error updating application:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          className="form-control"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:  </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="technicalSkills">Technical Skills</label>
        <input
          type="text"
          className="form-control"
          id="technicalSkills"
          value={technicalSkills}
          onChange={(e) => setTechnicalSkills(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="softSkills">Soft Skills</label>
        <input
          type="text"
          className="form-control"
          id="softSkills"
          value={softSkills}
          onChange={(e) => setSoftSkills(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="education">Education:  </label>
        <select value={education} onChange={(e) => setEducation(e.target.value)}>
          <option value="">Select Education</option>
          <option value="Diploma">Diploma</option>
          <option value="Certificate">Certificate</option>
          <option value="Degree">Degree</option>
          <option value="Master's">Master's</option>
          <option value="PHD">PHD</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="experience">Experience</label>
        <input
          type="text"
          className="form-control"
          id="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="postDate">Post Date</label>
        <input
          type="date"
          className="form-control"
          id="postDate"
          value={postDate}
          onChange={(e) => setPostDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="closeDate">Close Date</label>
        <input
          type="date"
          className="form-control"
          id="closeDate"
          value={closeDate}
          onChange={(e) => setCloseDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="source">Source:  </label>
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">Select Source</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Indeed">Indeed</option>
          <option value="Monster">Monster</option>
          <option value="University Job board">University Job board</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="URL">URL</label>
        <input
          type="text"
          className="form-control"
          id="URL"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="salary">Salary</label>
        <input
          type="text"
          className="form-control"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Update Application
      </button>
    </form>
  );
};

export default EditApplicationForm;
