package com.zain.jobtracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zain.jobtracker.model.Application;
import com.zain.jobtracker.model.User;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer>{
	List<Application> findByUser(User user);
}
