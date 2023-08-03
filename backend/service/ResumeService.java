package com.zain.jobtracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zain.jobtracker.model.Resume;
import com.zain.jobtracker.repository.ResumeRepository;

@Service
public class ResumeService implements GenericService<Resume>{
	@Autowired
	private ResumeRepository resumeRepository;
	
	@Override
	public Resume save(Resume resume) {
		return resumeRepository.save(resume);
	}

	@Override
	public Resume findById(Integer id) {
		
		return resumeRepository.findById(id).get();		// returns resume or no such element exception
	}

	@Override
	public void delete(Integer id) {
		resumeRepository.deleteById(id);
	}

	@Override
	public List<Resume> getAll() {
		
		return resumeRepository.findAll();
	}
}
