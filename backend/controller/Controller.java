package com.zain.jobtracker.controller;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController; //

import com.zain.jobtracker.model.Application;
import com.zain.jobtracker.model.Job;
import com.zain.jobtracker.model.Resume;
import com.zain.jobtracker.model.User;
import com.zain.jobtracker.service.ApplicationService;
import com.zain.jobtracker.service.JobService;
import com.zain.jobtracker.service.ResumeService;
import com.zain.jobtracker.service.UserService;

// contains mapping to our http requests such as get, post etc

@RestController
@RequestMapping("/tracker")
public class Controller {
	@Autowired
	private ApplicationService applicationService;
	
	@Autowired
	private ResumeService resumeService;
	
	@Autowired
	private JobService jobService;
	
	@Autowired
    private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	
	@PostMapping("/addApp")
	public String add(@RequestBody Application application, 
			@RequestParam int jobId, @RequestParam int resumeId, 
			Authentication authentication) {
	    String username = authentication.getName();
	    User user = userService.findUser(username);

	    if (user != null) {
	        application.setUser(user);
	    } else {
	        throw new RuntimeException("User not found");
	    }

	    // Fetch the associated job using jobId
	    Job job = jobService.findById(jobId);
	    if (job != null) {
	        application.setJob(job);
	        job.setApplication(application);
	    } else {
	        throw new RuntimeException("Job not found");
	    }

	    // Remove the resume handling if you don't want to include it
	    Resume resume = resumeService.findById(resumeId);
	    if (resume != null) {
	        application.setResume(resume);
	    	resume.getApplications().add(application);
	    }else {
	    	throw new RuntimeException("Resume not found");
	    }

	    applicationService.save(application);
	    return "New Application Added";
	}

	
	
	
//	//get all apps
	@GetMapping("/getAllApps")
	public ResponseEntity<List<Application>> getAllApplications(Authentication authentication) {
	    String username = authentication.getName();
	    User user = userService.findUser(username);

	    if (user != null) {
	        return new ResponseEntity<>(applicationService.getByUser(user), HttpStatus.OK);
	    }

	    throw new RuntimeException("User not found");
	}
	
	//get app by id
	@GetMapping("/getApp/{id}")
	public ResponseEntity<Application> getApp(@PathVariable Integer id){
		try {
			Application application = applicationService.findById(id);
			return new ResponseEntity<Application>(application, HttpStatus.OK);
		}catch (NoSuchElementException e) {
			return new ResponseEntity<Application>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	

	
	@PutMapping("/updateApp/{id}")
	public ResponseEntity<Application> update(@RequestBody Application application, @PathVariable Integer id) {
	    Application existingApp = applicationService.findById(id);

	    if (existingApp == null) {
	        return ResponseEntity.notFound().build();
	    }

	    Resume newResume = application.getResume();	// since 
	    Resume oldResume = existingApp.getResume();

	    if (oldResume != null && !oldResume.equals(newResume)) {
	        oldResume.getApplications().remove(existingApp);
	    }

	    if (newResume != null && !newResume.equals(oldResume)) {
	        newResume.getApplications().add(existingApp);
	    }

	    // Update job functionality
	    Job newJob = application.getJob();
	    Job oldJob = existingApp.getJob();

	    if (oldJob != null && !oldJob.equals(newJob)) {
	        oldJob.setApplication(null);
	    }

	    if (newJob != null && !newJob.equals(oldJob)) {
	        oldJob.setURL(newJob.getURL());
	        oldJob.setTechnicalSkills(newJob.getTechnicalSkills());
	        oldJob.setSoftSkills(newJob.getSoftSkills());
	        oldJob.setEducation(newJob.getEducation());
	        oldJob.setExperience(newJob.getExperience());
	        oldJob.setPostDate(newJob.getPostDate());
	        oldJob.setCloseDate(newJob.getCloseDate());
	        oldJob.setSource(newJob.getSource());
	    }

	    existingApp.setId(application.getId());
	    existingApp.setCompany(application.getCompany());
	    existingApp.setStatus(application.getStatus());
	    existingApp.setName(application.getName());
	    existingApp.setResume(application.getResume());
	    // No need to update the job reference, as we've already updated the properties of the existing job

	    applicationService.save(existingApp);

	    return ResponseEntity.ok(existingApp);
	}


	
	// delete app by id
	@DeleteMapping("/deleteApp/{id}")
	public ResponseEntity<String> delete(@PathVariable Integer id) {
	    Application application = applicationService.findById(id);
	    if (application != null) {
	        Resume resume = application.getResume();
	        if (resume != null) {
	            resume.getApplications().remove(application);
	        }

	        // remove any associated job entity and vice versa
	        Job job = application.getJob();
	        if (job != null) {
	            job.setApplication(null);
	            application.setJob(null);
	            jobService.save(job);
	        }

	        applicationService.delete(id);

	        return ResponseEntity.ok()
	                .body("{\"message\":\"Deleted application with id " + id + "!\"}");
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                .body("{\"message\":\"Application with id " + id + " not found!\"}");
	    }
	}


	
	
	
	// -------RESUME--------
	
	// add a new resume
	@PostMapping("/addResume")
	public ResponseEntity<Resume> addResume(@RequestBody Resume resume) {
	    resumeService.save(resume);
	    return ResponseEntity.status(HttpStatus.CREATED).body(resume);
	}
	
	//get all resumes
	@GetMapping("/getAllResumes")
	public List<Resume> getAllResumes(){
		return resumeService.getAll();
	}
	
	// get resume by id
	@GetMapping("/getResume/{id}")
	public ResponseEntity<Resume> getResume(@PathVariable Integer id){
		try {
			Resume resume = resumeService.findById(id);
			return new ResponseEntity<Resume>(resume, HttpStatus.OK);
		}catch (NoSuchElementException e) {
			return new ResponseEntity<Resume>(HttpStatus.NOT_FOUND);
		}
	}
	
	//update resume by id
	@PutMapping("/updateResume/{id}")
	public ResponseEntity<Resume> updateResume(@RequestBody Resume resume, @PathVariable Integer id){
		
		Resume existingResume = resumeService.findById(id);
		
		if(existingResume == null) {
			return ResponseEntity.notFound().build();
		}
		
		existingResume.setSkills(resume.getSkills());
		existingResume.setExperience(resume.getExperience());
		existingResume.setHighestQualification(resume.getHighestQualification());
		existingResume.setCompaniesWorkedAt(resume.getCompaniesWorkedAt());
		
		resumeService.save(existingResume);
		
		return ResponseEntity.ok(existingResume);
		
		
	}
	
	
	
	// ----- JOB ---------------
	
	// add job
	@PostMapping("/addJob")
	public ResponseEntity<Job> add(@RequestBody Job job) {
	    jobService.save(job);
	    return ResponseEntity.status(HttpStatus.CREATED).body(job);
	}
	//get all jobs
		@GetMapping("/getAllJobs")
		public List<Job> getAllJobs(){
			return jobService.getAll();
		}
		
		// delete job by id
		@DeleteMapping("/deleteJob/{id}")
		public String deleteJob(@PathVariable Integer id) {
		    Job job = jobService.findById(id);
		    if (job != null) {
		    	Application application = job.getApplication();
		        if (application != null) {
		            application.setJob(null);
		        }
		        jobService.delete(id);
		        return "Deleted application with id " + id + "!";
		    } else {
		        return "Application with id " + id + " not found!";
		    }
		}
		
		
		
		// ------ REGISTER --------
		
		@PostMapping("/register")
	    public ResponseEntity<?> registerUser(@RequestBody User userDto) {
	        if (userService.findUser(userDto.getUsername()) != null) {
	            return ResponseEntity.badRequest().body("Username already exists");
	        }
	        
	     // Encrypt the password before saving the user
	        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

	        User user = userService.save(userDto);
	        return ResponseEntity.status(HttpStatus.CREATED).body(user);
	    }
	
		@GetMapping("/getAllUsers")
		public List<User> getAllUsers() {
		    return userService.getAll();
		}
	
	
	
	
	
}
