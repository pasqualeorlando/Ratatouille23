package com.ratatouille23.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ratatouille23.server.model.CategoriaMenu;
import com.ratatouille23.server.repository.RepositoryCategoriaMenu;

@Service
public class ServiceCategoriaMenu {
	
	@Autowired private RepositoryCategoriaMenu repoCategorieMenu;

	public List<CategoriaMenu> ottieniCategorieMenu(int idMenu) {
		return repoCategorieMenu.ottieniCategorieMenu(idMenu);
	}
	
	public List<CategoriaMenu> ottieniMenuCategoria(int idCategoria) {
		return repoCategorieMenu.ottieniMenuCategoria(idCategoria);
	}

	public List<CategoriaMenu> ottieniCategorieAttiveMenu(int idMenu) {
		return repoCategorieMenu.ottieniCategorieAttiveMenu(idMenu);
	}

	public CategoriaMenu aggiungiCategoriaMenu(CategoriaMenu cm) {
		try {
			if(!repoCategorieMenu.existsById(cm.getIdCategoriaMenu()))
				return repoCategorieMenu.save(cm);
			else
				return null;
		} catch(IllegalArgumentException e) {
			return null;
		}
	}

	public boolean eliminaCategoriaMenu(int idCategoriaMenu) {
		try {
			if(repoCategorieMenu.existsById(idCategoriaMenu))
				repoCategorieMenu.deleteById(idCategoriaMenu);
			else
				return false;
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public CategoriaMenu aggiornaCategoriaMenu(CategoriaMenu cm) {
		try {
			if(repoCategorieMenu.existsById(cm.getIdCategoriaMenu()))
				return repoCategorieMenu.save(cm);
		} catch(IllegalArgumentException e) {
			return null;
		}
		return null;
	}

}
