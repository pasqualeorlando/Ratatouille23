package com.ratatouille23.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.ratatouille23.server.model.CategoriaMenu;

public interface RepositoryCategoriaMenu extends JpaRepository<CategoriaMenu, Integer>{

	@Query(value="SELECT * FROM categoriemenu AS cm WHERE cm.idmenu= :idmenu", nativeQuery=true)
	public List<CategoriaMenu> ottieniCategorieMenu(@Param(value="idmenu") int idMenu);

	@Query(value="SELECT * FROM categoriemenu AS cm WHERE cm.idmenu= :idmenu AND cm.isabilitato = TRUE", nativeQuery=true)
	public List<CategoriaMenu> ottieniCategorieAttiveMenu(@Param(value="idmenu") int idMenu);
	
	@Modifying(clearAutomatically = true)
	@Transactional
	@Query(value="DELETE FROM categoriemenu AS cm WHERE cm.idmenu= :idmenu AND cm.idcategoria= :idcategoria", nativeQuery=true)
	public void eliminaCategoriaMenu(@Param(value="idmenu") int idMenu, @Param(value="idcategoria") int idCategoria);

	@Query(value="SELECT * FROM categoriemenu AS cm WHERE cm.idcategoria= :idcategoria", nativeQuery=true)
	public List<CategoriaMenu> ottieniMenuCategoria(@Param(value="idcategoria") int idCategoria);
	
	
}
