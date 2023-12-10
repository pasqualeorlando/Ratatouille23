package com.ratatouille23.server.auth.service;

import com.ratatouille23.server.auth.AuthenticationRequest;
import com.ratatouille23.server.auth.AuthenticationResponse;
import com.ratatouille23.server.auth.ModifyRequest;
import com.ratatouille23.server.auth.RegisterRequest;
import com.ratatouille23.server.auth.config.JwtService;
import com.ratatouille23.server.model.Dipendente;
import com.ratatouille23.server.model.dto.DTODipendente;
import com.ratatouille23.server.service.ServiceDipendente;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
	
	@Autowired
	private ServiceDipendente service;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private ModelMapper modelMapper;

	public AuthenticationResponse register(RegisterRequest request) {
		if(service.ottieniDipendenteDaEmail(request.getEmail()).get() != null) {
			return null;
		}
		else {
			Dipendente dipendente = new Dipendente(request.getNome(), request.getCognome(), request.getEmail(), passwordEncoder.encode(request.getPassword()), request.getRuolo(), null, null, true);
			if(service.creaDipendente(dipendente)) {
				String jwtToken = jwtService.generateToken(dipendente);
				return new AuthenticationResponse(jwtToken, convertiInDTO(dipendente));
			} else
				return null;
		}
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		if(service.ottieniDipendenteDaEmail(request.getEmail()).isPresent()) {
			Dipendente dipendente = service.ottieniDipendenteDaEmail(request.getEmail()).get();
			String jwtToken = jwtService.generateToken(dipendente);
			return new AuthenticationResponse(jwtToken, convertiInDTO(dipendente));
		} else
			return null;
	}
	
	public AuthenticationResponse modifyCredentials(ModifyRequest request) {
		Dipendente dipendente = service.ottieniDipendenteDaEmail(request.getVecchiaEmail()).get();
		if(dipendente != null) {
			dipendente.setEmail(request.getNuovaEmail());
			dipendente.setPassword(passwordEncoder.encode(request.getNuovaPassword()));
			dipendente.setPrimoAccesso(false);
			if(service.modificaDipendente(dipendente)) {
				String jwtToken = jwtService.generateToken(dipendente);
				return new AuthenticationResponse(jwtToken, convertiInDTO(dipendente));
			} else
				return null;
		} else
			return null;
	}
	
	//Conversione
	private DTODipendente convertiInDTO(Dipendente dipendente) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		DTODipendente dtoDipendente = new DTODipendente();
		dtoDipendente = modelMapper.map(dipendente, DTODipendente.class);
		
		return dtoDipendente;
	}
}
