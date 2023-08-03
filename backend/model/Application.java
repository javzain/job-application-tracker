package com.zain.jobtracker.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@JsonIdentityInfo(
		  generator = ObjectIdGenerators.PropertyGenerator.class,
		  property = "id")
@Entity
@Table(name = "application")
public class Application {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String company;
	private String status;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "resume_id")
//	@JsonIdentityReference(alwaysAsId = true)
	private Resume resume;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "job_id")
//	@JsonIdentityReference(alwaysAsId = true)
	@JsonManagedReference
	private Job job;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;
	

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public Application() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Resume getResume() {
		return resume;
	}

	public void setResume(Resume resume) {
		this.resume = resume;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public void setUser(User user) {
		this.user = user;
		
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public User getUser() {
		
		return this.user;
	}

//	public void add(Application application) {
//		// TODO Auto-generated method stub
//		
//	}
	
	
	
	
	
	
	
}
