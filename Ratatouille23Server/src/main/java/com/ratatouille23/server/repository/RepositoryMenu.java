package com.ratatouille23.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ratatouille23.server.model.Menu;

public interface RepositoryMenu extends JpaRepository<Menu, Integer>{

	@Query(value="SELECT * FROM menu WHERE isabilitato=true", nativeQuery=true)
	List<Menu> ottieniTuttiMenuAbilitati();
}
