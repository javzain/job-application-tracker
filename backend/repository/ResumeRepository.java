package com.zain.jobtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zain.jobtracker.model.Resume;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Integer>{
	
}
