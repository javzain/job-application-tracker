import React, { useState } from 'react';
import axios from 'axios';
import { getDocument } from 'pdfjs-dist';
import '../FormStyles.css';




const CreateApplicationForm = ({ onCreateSuccess }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState('');
  const [softSkills, setSoftSkills] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [postDate, setPostDate] = useState('');
  const [closeDate, setCloseDate] = useState('');
  const [source, setSource] = useState('');
  const [url, setURL] = useState('');
  const [salary, setSalary] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experienceYears, setExperienceYears] = useState(0);
  const [highestQualification, setHighestQualification] = useState('');
  const [companiesWorkedAt, setCompaniesWorkedAt] = useState([]);
  const [projects, setProjects] = useState([]);

  const extractResumeData = async (file) => {
    const reader = new FileReader();
    const buffer = await new Promise((resolve, reject) => {
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e.target.error);
      reader.readAsArrayBuffer(file);
    });

    const pdf = await getDocument({ data: buffer }).promise;
    const numPages = pdf.numPages;

    let text = '';
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(' ') + ' ';
    }

    // Replace non-breaking space characters with regular space characters
    text = text.replace(/\u00A0/g, ' ');

    const skills = extractSkills(text);
    const experienceYears = extractExperience(text);
    const highestQualification = extractHighestQualification(text);
    const companiesWorkedAt = extractCompaniesWorkedAt(text);
    const projects = extractProjects(text);

    return {
      skills,
      experienceYears,
      highestQualification,
      companiesWorkedAt,
      projects,
    };
  };

  const extractHighestQualification = (text) => {
    const regex = /Highest Qualification:[\n\s]*(.*?)[\n\s]*((Experience|Work History|Companies))/i;
    const matches = text.match(regex);
    return matches ? matches[1].replace(/(\w)\s(\w)/g, '$1 $2').trim() : '';
  };

  const extractSkills = (text) => {
    const skillRegex = /Skills:\s*((?:[\s\S](?!(?:\n\n|Work Experience:|Highest Qualification:|(?:\n\n)?Experience:)))+(?!Experience:))/i;
    const match = text.match(skillRegex);
    if (match) {
      const skillsText = match[1];
      const skillsList = skillsText.split(',').map((skill) => skill.trim());
      return skillsList;
    }
    return [];
  };

  const extractExperience = (text) => {
    const experienceRegex = /Experience:\s*(\d+)/i;
    const match = text.match(experienceRegex);
    if (match) {
      return parseInt(match[1]);
    }
    return 0;
  };

  const extractCompaniesWorkedAt = (text) => {
    const companyRegex = /Company:\s*([\w\s]+)/g;

    const companies = [];
    let match;
    while ((match = companyRegex.exec(text)) !== null) {
      companies.push(match[1].trim());
    }
    return companies;
  };


  const extractProjects = (text) => {
    const projectRegex = /(?:\d+\.\s*)([^\d]+)/g;

    const projects = [];
    let match;
    while ((match = projectRegex.exec(text)) !== null) {
      projects.push(match[1].trim());
    }
    return projects;
  };

  const handleResumeFileChange = async (event) => {
    const file = event.target.files[0];
    setResumeFile(file);

    if (file) {
      const resumeData = await extractResumeData(file);
      setSkills(resumeData.skills);
      setExperienceYears(resumeData.experience);
      setHighestQualification(resumeData.highestQualification);
      setCompaniesWorkedAt(resumeData.companiesWorkedAt);
      setProjects(resumeData.projects);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();



    // Create job
    const jobData = {

      technicalSkills: technicalSkills.split(/,\s*/),
      softSkills: softSkills.split(/,\s*/),
      education,
      experience,
      postDate,
      closeDate,
      source,
      url,
      salary
    };

    const resumeData = {
      skills,
      experienceYears,
      highestQualification,
      companiesWorkedAt,
      projects

    };

    // Send job data to the server
    let jobId;
    try {
      const jobResponse = await axios.post('http://localhost:8080/tracker/addJob', jobData, {
        withCredentials: true,
      });
      jobId = jobResponse.data.id;
    } catch (error) {
      console.error('Failed to create job:', error);
      alert('Failed to create job', error);
      return;
    }

    // send resume data to the server

    let resumeId;
    try {
      const resumeResponse = await axios.post('http://localhost:8080/tracker/addResume', resumeData, {
        withCredentials: true,
      });
      resumeId = resumeResponse.data.id;
    } catch (error) {
      console.error('Failed to create resume:', error);
      alert('Failed to create resume', error);
      return;
    }

    // Combine job and resume data into a single object
    const applicationData = {
      name,
      company,
      status


    };

    // Send application data to the server
    try {
      await axios.post('http://localhost:8080/tracker/addApp', applicationData, {
        params: {
          jobId: jobId,
          resumeId: resumeId
        },
        withCredentials: true
      });
      onCreateSuccess();
      // alert('Application created successfully');
    } catch (error) {
      console.error('Failed to create application:', error);
      alert('Failed to create application', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* ... other input fields ... */}
      <div className="form-group">
        <input
          type="text"
          placeholder="Job Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-input">
          <option value="">Select Status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Technical Skills (comma separated)"
          value={technicalSkills}
          onChange={(e) => setTechnicalSkills(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Soft Skills (comma separated)"
          value={softSkills}
          onChange={(e) => setSoftSkills(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <select value={education} onChange={(e) => setEducation(e.target.value)} className="form-input">
          <option value="">Select Education</option>
          <option value="Diploma">Diploma</option>
          <option value="Certificate">Certificate</option>
          <option value="Degree">Degree</option>
          <option value="Master's">Master's</option>
          <option value="PHD">PHD</option>
        </select>
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <input
          type="date"
          label="Post Date"
          placeholder="Post Date"
          value={postDate}
          onChange={(e) => setPostDate(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <input
          type="date"
          placeholder="Close Date"
          value={closeDate}
          onChange={(e) => setCloseDate(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <select value={source} onChange={(e) => setSource(e.target.value)} className="form-input">
          <option value="">Select Source</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Indeed">Indeed</option>
          <option value="Monster">Monster</option>
          <option value="University Job board">University Job board</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="form-input"
        />
      </div>


      {/* ... resume input fields and submit button ... */}
      <div className="form-group">
        <label htmlFor="resumeFile" className="form-label">
          Resume:
        </label>
        <input
          type="file"
          id="resumeFile"
          onChange={handleResumeFileChange}
          className="form-input-file"
        />
        {resumeFile && <p>{resumeFile.name}</p>}
      </div>
      <button type="submit" className="form-submit-btn">
        Create Application
      </button>
    </form>
  );
};
export default CreateApplicationForm;
