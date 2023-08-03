package com.zain.jobtracker.service;

import java.util.List;

public interface GenericService<T> {
	public abstract T save(T entity);
	public abstract List<T> getAll();
	public abstract T findById(Integer id);
	public abstract void delete(Integer id);
	//public abstract void save(Application application);
	
	
}
