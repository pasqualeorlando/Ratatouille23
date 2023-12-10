package com.ratatouille23.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ratatouille23.server.model.Piatto;

import jakarta.transaction.Transactional;

public interface RepositoryPiatto extends JpaRepository<Piatto, Long>{

	@Transactional
    @Modifying(clearAutomatically = true)
	@Query(value="UPDATE piatti SET isattivo = FALSE WHERE idpiatto= :id", nativeQuery=true)
	public void eliminaPiatto(@Param(value="id") long idPiatto);
	
	@Query(value="SELECT * FROM piatti AS P WHERE P.idcategoria= :idcategoria", nativeQuery=true)
	public List<Piatto> ottieniPiattiCategoria(@Param(value="idcategoria") int idCategoria);

	@Query(value="SELECT * FROM piatti AS P WHERE P.idcategoria= :idcategoria AND P.isattivo = TRUE", nativeQuery=true)
	public List<Piatto> ottieniPiattiAttiviCategoria(@Param(value="idcategoria") int idCategoria);

	@Query(value="SELECT * FROM piatti WHERE isattivo = TRUE", nativeQuery=true)
	public List<Piatto> ottieniTuttiPiattiAttivi();
}
