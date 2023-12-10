package com.ratatouille23.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ratatouille23.server.model.Categoria;
import com.ratatouille23.server.repository.RepositoryCategoria;

@Service
public class ServiceCategoria {
	@Autowired private RepositoryCategoria repoCategoria;

	public Optional<Categoria> ottieniCategoriaDaId(int idCategoria) {
		return repoCategoria.findById(idCategoria);
	}
	
	public Optional<Categoria> ottieniCategoriaDaNome(String categoria) {
		return repoCategoria.ottieniCategoriaDaNome(categoria);
	}

	public List<Categoria> ottieniTutteCategorie() {
		List<Categoria> categorie = new ArrayList<>();    
		repoCategoria.findAll().forEach(categorie::add);    
		return categorie;
	}

	public Categoria creaCategoria(Categoria categoria) {
		try {
			if(!repoCategoria.existsById(categoria.getIdCategoria()))
				return repoCategoria.save(categoria);
			else
				return null;
		} catch(IllegalArgumentException e) {
			return null;
		}
	}

	public boolean eliminaCategoria(int idCategoria) {
		try {
			if(repoCategoria.existsById(idCategoria))
				repoCategoria.deleteById(idCategoria);
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public Categoria modificaCategoria(Categoria categoria) {
		try {
			if(repoCategoria.existsById(categoria.getIdCategoria()))
				return repoCategoria.save(categoria);
		} catch(IllegalArgumentException e) {
			return null;
		}
		return null;
	}
	
	
}
