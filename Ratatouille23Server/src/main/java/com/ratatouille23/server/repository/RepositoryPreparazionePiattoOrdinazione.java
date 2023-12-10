package com.ratatouille23.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ratatouille23.server.model.PreparazionePiattoOrdinazione;

public interface RepositoryPreparazionePiattoOrdinazione extends JpaRepository<PreparazionePiattoOrdinazione, Long> {

	@Query(value="SELECT * FROM preparazionepiattiordinazioni AS PPO WHERE PPO.statopreparazione= :stato", nativeQuery=true)
	List<PreparazionePiattoOrdinazione> ottieniPreparazioniStato(@Param(value="stato") String stato);

	@Query(value="SELECT * FROM preparazionepiattiordinazioni AS PPO WHERE PPO.idordinazione= :idordinazione", nativeQuery=true)
	List<PreparazionePiattoOrdinazione> ottieniPreparazioniDaIdOrdinazione(@Param(value="idordinazione") long idOrdinazione);
	
	@Query(value="SELECT * FROM preparazionepiattiordinazioni AS PPO WHERE PPO.iddipendente= :iddipendente AND PPO.statopreparazione='Evaso'", nativeQuery=true)
	List<PreparazionePiattoOrdinazione> ottieniPreparazioniEvaseDipendente(@Param(value="iddipendente") int idDipendente);

	@Query(value="SELECT * FROM preparazionepiattiordinazioni AS PPO WHERE PPO.iddipendente= :iddipendente", nativeQuery=true)
	List<PreparazionePiattoOrdinazione> ottieniPreparazioniDipendente(@Param(value="iddipendente") int idDipendente);

}
