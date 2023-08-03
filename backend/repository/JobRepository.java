package com.zain.jobtracker.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zain.jobtracker.model.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {
	

}
