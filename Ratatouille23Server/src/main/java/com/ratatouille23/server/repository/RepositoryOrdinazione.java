package com.ratatouille23.server.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ratatouille23.server.model.Ordinazione;

public interface RepositoryOrdinazione extends JpaRepository<Ordinazione, Long> {

	@Query(value="SELECT * FROM ordinazioni WHERE idordinazione IN ("
			+ "	SELECT DISTINCT idordinazione "
			+ "	FROM preparazionepiattiordinazioni "
			+ "	WHERE statopreparazione <> 'Evaso'"
			+ ") AND orarioordinazione >= :data"
			+ " ORDER BY orarioordinazione ASC", nativeQuery=true)
	List<Ordinazione> ottieniOrdinazioniDaTerminare(@Param(value="data") LocalDate data);
	
	@Query(value="SELECT * FROM ordinazioni WHERE idordinazione NOT IN ("
			+ "	SELECT DISTINCT idordinazione"
			+ "	FROM preparazionepiattiordinazioni"
			+ "	WHERE statopreparazione <> 'Evaso') AND orarioordinazione >= :datainizio AND orarioordinazione <= :datafine"
			+ "	ORDER BY orarioordinazione ASC", nativeQuery=true)
	List<Ordinazione> ottieniOrdinazioniTerminate(@Param(value="datainizio") LocalDate dataInizio, @Param(value="datafine") LocalDate dataFine);

	@Query(value="SELECT * FROM ordinazioni WHERE idtavolo= :idtavolo", nativeQuery=true)
	List<Ordinazione> ottieniOrdinazioniDaIdTavolo(@Param(value="idtavolo") long idTavolo);

	@Query(value="SELECT * FROM ordinazioni WHERE iddipendente= :iddipendente", nativeQuery=true)
	List<Ordinazione> ottieniOrdinazioniDipendente(@Param(value="iddipendente")int idDipendente);
}
