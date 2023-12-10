package com.ratatouille23.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ratatouille23.server.model.Menu;
import com.ratatouille23.server.repository.RepositoryMenu;

@Service
public class ServiceMenu {
	@Autowired RepositoryMenu repoMenu;

	public List<Menu> ottieniTuttiMenu() {
		List<Menu> menu = new ArrayList<>();    
		repoMenu.findAll().forEach(menu::add);    
		return menu;
	}

	public Optional<Menu> ottieniMenuDaId(int idMenu) {
		return repoMenu.findById(idMenu);
	}

	public Menu creaMenu(Menu menu) {
		try {
			if(!repoMenu.existsById(menu.getIdMenu()))
				return repoMenu.save(menu);
			else
				return null;
		} catch(IllegalArgumentException e) {
			return null;
		}
	}

	public boolean eliminaMenu(int idMenu) {
		try {
			if(repoMenu.existsById(idMenu))
				repoMenu.deleteById(idMenu);
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public Menu modificaMenu(Menu menu) {
		try {
			if(repoMenu.existsById(menu.getIdMenu()))
				return repoMenu.save(menu);
		} catch(IllegalArgumentException e) {
			return null;
		}
		return null;
	}

	public List<Menu> ottieniTuttiMenuAbilitati() {
		return repoMenu.ottieniTuttiMenuAbilitati();
	}
}
