package com.zain.jobtracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zain.jobtracker.model.User;
import com.zain.jobtracker.repository.UserRepository;

@Service
public class UserService implements GenericService<User>{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public User save(User entity) {
		
		return userRepository.save(entity);
	}

	@Override
	public List<User> getAll() {
		
		return userRepository.findAll();
	}

	@Override
	public User findById(Integer id) {
		return userRepository.findById(id).get();
	}

	@Override
	public void delete(Integer id) {
		userRepository.deleteById(id);
	}

//	public boolean validateUser(String userName, String password) {
//		return userRepository.findByUsernameAndPassword(userName, password) != null;
//		
//	}

	public User findUser(String userName) {
		return userRepository.findByUsername(userName);
	}

}
