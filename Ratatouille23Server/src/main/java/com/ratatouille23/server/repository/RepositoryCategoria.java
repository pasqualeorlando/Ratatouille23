package com.ratatouille23.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ratatouille23.server.model.Categoria;

public interface RepositoryCategoria extends JpaRepository<Categoria, Integer>{

	@Query(value="SELECT * FROM categorie WHERE nome= :categoria", nativeQuery=true)
	Optional<Categoria> ottieniCategoriaDaNome(@Param(value="categoria") String categoria);

}
