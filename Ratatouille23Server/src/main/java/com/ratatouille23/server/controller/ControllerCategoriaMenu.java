package com.ratatouille23.server.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ratatouille23.server.model.CategoriaMenu;
import com.ratatouille23.server.model.dto.DTOCategoriaMenu;
import com.ratatouille23.server.service.ServiceCategoria;
import com.ratatouille23.server.service.ServiceCategoriaMenu;
import com.ratatouille23.server.service.ServiceMenu;

@RestController
@RequestMapping(path = "api/categoriemenu", produces = { "application/json" })
@CrossOrigin
public class ControllerCategoriaMenu {
	
	@Autowired private ServiceCategoriaMenu serviceCategoriaMenu;
	@Autowired private ServiceMenu serviceMenu;
	@Autowired private ServiceCategoria serviceCategoria;
	
	@Autowired private ModelMapper modelMapper;
	
	//GET
	@GetMapping("getCategorieMenu/{idmenu}")
	@ResponseBody
	public List<DTOCategoriaMenu> ottieniCategorieMenu(@PathVariable(name="idmenu") int idMenu) {
		List<CategoriaMenu> cm = serviceCategoriaMenu.ottieniCategorieMenu(idMenu);
		if(cm.isEmpty())
			return null;
		
		List<DTOCategoriaMenu> daRestituire = new ArrayList<DTOCategoriaMenu>();
		for(CategoriaMenu catMenu : cm)
			daRestituire.add(convertiInDTO(catMenu));
			
		return daRestituire;
	}
	
	@GetMapping("getMenuCategoria/{idcategoria}")
	@ResponseBody
	public List<DTOCategoriaMenu> ottieniMenuCategoria(@PathVariable(name="idcategoria") int idCategoria) {
		List<CategoriaMenu> cm = serviceCategoriaMenu.ottieniMenuCategoria(idCategoria);
		if(cm.isEmpty())
			return null;
		
		List<DTOCategoriaMenu> daRestituire = new ArrayList<DTOCategoriaMenu>();
		for(CategoriaMenu catMenu : cm)
			daRestituire.add(convertiInDTO(catMenu));
			
		return daRestituire;
	}
	
	@GetMapping("getCategorieAttiveMenu/{idmenu}")
	@ResponseBody
	public List<DTOCategoriaMenu> ottieniCategorieAttiveMenu(@PathVariable(name="idmenu") int idMenu) {
		List<CategoriaMenu> cm = serviceCategoriaMenu.ottieniCategorieAttiveMenu(idMenu);
		if(cm.isEmpty())
			return null;
		
		List<DTOCategoriaMenu> daRestituire = new ArrayList<DTOCategoriaMenu>();
		for(CategoriaMenu catMenu : cm)
			daRestituire.add(convertiInDTO(catMenu));
			
		return daRestituire;
	}
	
	//POST
	@PostMapping("aggiungiCategoriaMenu")
	@ResponseBody
	public ResponseEntity<DTOCategoriaMenu> aggiungiCategoriaMenu(@RequestBody DTOCategoriaMenu dtoCategoriaMenu) {
		CategoriaMenu cm = convertiInEntity(dtoCategoriaMenu);
		
		//System.out.println(cm.getIdCategoriaMenu());
		CategoriaMenu aggiunta = serviceCategoriaMenu.aggiungiCategoriaMenu(cm);
		if(aggiunta != null)
			return ResponseEntity.status(HttpStatus.OK).body(convertiInDTO(aggiunta));
		else
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
	}
	//PUT
	//modifica posizione e modifica isabilitato
	@PutMapping("modificaCategoriaMenu")
	@ResponseBody
	public ResponseEntity<DTOCategoriaMenu> aggiornaPosizioniCategorie(@RequestBody DTOCategoriaMenu dtoCategoriaMenu) {
		CategoriaMenu cm = convertiInEntity(dtoCategoriaMenu);
		
		CategoriaMenu modificata = serviceCategoriaMenu.aggiornaCategoriaMenu(cm);
		if(modificata != null)
			return ResponseEntity.status(HttpStatus.OK).body(convertiInDTO(modificata));
		else
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
	}
	
	//DELETE
	@DeleteMapping("eliminaCategoriaMenu/{idcategoriamenu}")
	@ResponseBody
	public ResponseEntity<String> eliminaCategoriaMenu(@PathVariable(name="idcategoriamenu") int idCategoriaMenu) {
		boolean eliminata = serviceCategoriaMenu.eliminaCategoriaMenu(idCategoriaMenu);
		if(eliminata)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
	}
	
	//Conversioni
	private DTOCategoriaMenu convertiInDTO(CategoriaMenu catMenu) {
		DTOCategoriaMenu dtoCatMenu = new DTOCategoriaMenu();
		dtoCatMenu.setAbilitato(catMenu.isAbilitato());
		dtoCatMenu.setPosizioneCategoria(catMenu.getPosizioneCategoria());
		dtoCatMenu.setIdMenu(catMenu.getMenu().getIdMenu());
		dtoCatMenu.setIdCategoria(catMenu.getCategoria().getIdCategoria());
		dtoCatMenu.setIdCategoriaMenu(catMenu.getIdCategoriaMenu());
		dtoCatMenu.setNomeCategoria(catMenu.getCategoria().getNome());
		dtoCatMenu.setNomeMenu(catMenu.getMenu().getNome());
		return dtoCatMenu;
	}
	
	private CategoriaMenu convertiInEntity(DTOCategoriaMenu dtoCatMenu) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		CategoriaMenu categoriaMenu = new CategoriaMenu();
		categoriaMenu = modelMapper.map(dtoCatMenu, CategoriaMenu.class);
		
		//Mapping altri attributi
		categoriaMenu.setMenu(serviceMenu.ottieniMenuDaId(dtoCatMenu.getIdMenu()).get());
		categoriaMenu.setCategoria(serviceCategoria.ottieniCategoriaDaId(dtoCatMenu.getIdCategoria()).get());
		
		return categoriaMenu;
	}
}
