package com.ratatouille23.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ratatouille23.server.model.TavoloLocale;

public interface RepositoryTavoloLocale extends JpaRepository<TavoloLocale, Integer>{

	@Query(value="SELECT * FROM tavolilocali ORDER BY numerotavolo ASC", nativeQuery=true)
	List<TavoloLocale> ottieniTavoliLocali();

	
}
