package com.zain.jobtracker.model;

import java.util.ArrayList;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@JsonIdentityInfo(		// helps with circular reference to other objects
		  generator = ObjectIdGenerators.PropertyGenerator.class,
		  property = "id")
@Entity
@Table(name = "resume")
public class Resume {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	public int getId() {
		return id;
	}




	public List<Application> getApplications() {
		return applications;
	}




	public void setApplications(List<Application> applications) {
		this.applications = applications;
	}




	public void setId(int id) {
		this.id = id;
	}




	private String[] skills;
	private int experienceYears;
	private String highestQualification;		// education
	private String[] companiesWorkedAt;
	private String[] projects;
	
	@OneToMany(mappedBy = "resume", cascade = CascadeType.ALL)
	@JsonIdentityReference(alwaysAsId = true)
	private List<Application> applications = new ArrayList<>();


	public String[] getSkills() {
		return skills;
	}




	public void setSkills(String[] skills) {
		this.skills = skills;
	}




	public int getExperience() {
		return experienceYears;
	}




	public void setExperience(int experience) {
		this.experienceYears = experience;
	}




	public String getHighestQualification() {
		return highestQualification;
	}




	public void setHighestQualification(String highestQualification) {
		this.highestQualification = highestQualification;
	}




	public String[] getCompaniesWorkedAt() {
		return companiesWorkedAt;
	}




	public void setCompaniesWorkedAt(String[] companiesWorkedAt) {
		this.companiesWorkedAt = companiesWorkedAt;
	}




	public String[] getProjects() {
		return projects;
	}




	public void setProjects(String[] projects) {
		this.projects = projects;
	}




	
}
