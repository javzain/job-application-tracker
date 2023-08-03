package com.zain.jobtracker.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zain.jobtracker.model.Application;
import com.zain.jobtracker.model.User;
import com.zain.jobtracker.repository.ApplicationRepository;

@Service
public class ApplicationService implements GenericService<Application>{

	@Autowired
	private ApplicationRepository applicationRepository;
	
	@Override
	public Application save(Application application) {
		return applicationRepository.save(application);
	}

	@Override
	public List<Application> getAll() {
		return applicationRepository.findAll();
	}

	@Override
	public Application findById(Integer id) {
	
		return applicationRepository.findById(id).get();
	}
	
	@Override
	public void delete(Integer id) {
		applicationRepository.deleteById(id);
	}

	public List<Application> getByUser(User user){
		return applicationRepository.findByUser(user);
	}
	
	
}


