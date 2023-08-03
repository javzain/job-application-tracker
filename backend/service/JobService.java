package com.zain.jobtracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zain.jobtracker.model.Job;
import com.zain.jobtracker.repository.JobRepository;

@Service
public class JobService implements GenericService<Job>{

	@Autowired
	private JobRepository jobRepository;
	
	@Override
	public Job save(Job entity) {
		return jobRepository.save(entity);
	}

	@Override
	public List<Job> getAll() {
		return jobRepository.findAll();
	}

	@Override
	public Job findById(Integer id) {
		return jobRepository.findById(id).get();
	}

	@Override
	public void delete(Integer id) {
		jobRepository.deleteById(id);
		
	}

}
