package com.zain.jobtracker.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;


@JsonIdentityInfo(
		  generator = ObjectIdGenerators.PropertyGenerator.class,
		  property = "id")
@Entity
@Table(name = "job")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String[] getTechnicalSkills() {
		return technicalSkills;
	}

	public void setTechnicalSkills(String[] technicalSkills) {
		this.technicalSkills = technicalSkills;
	}

	public String[] getSoftSkills() {
		return softSkills;
	}

	public void setSoftSkills(String[] softSkills) {
		this.softSkills = softSkills;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public Date getPostDate() {
		return postDate;
	}

	public void setPostDate(Date postDate) {
		this.postDate = postDate;
	}

	public Date getCloseDate() {
		return closeDate;
	}

	public void setCloseDate(Date closeDate) {
		this.closeDate = closeDate;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

	
    public String getURL() {
		return URL;
	}

	public void setURL(String uRL) {
		URL = uRL;
	}


	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}


	private String[] technicalSkills;

    
    private String[] softSkills;

    
    private String education;

    
    private String experience;

    
    private Date postDate;

    
    private Date closeDate;

    
    private String source;
    
    private String URL;
    
    private String salary;

    @OneToOne(mappedBy = "job", cascade = CascadeType.ALL)
//    @JsonIdentityReference(alwaysAsId = true)
    @JsonBackReference
    private Application application;

    // Getters and setters for all fields
}
