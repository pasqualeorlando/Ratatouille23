package com.ratatouille23.server.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ratatouille23.server.model.Dipendente;

public interface RepositoryDipendente extends JpaRepository<Dipendente, Integer> {

	@Query(value="SELECT * FROM dipendenti WHERE email= :email", nativeQuery=true)
	Optional<Dipendente> ottieniDipendenteDaEmail(@Param(value="email") String email);

	@Query(value="SELECT * FROM dipendenti WHERE ruolo= :ruolo", nativeQuery=true)
	List<Dipendente> ottieniDipendentiDaRuolo(@Param(value="ruolo") String ruolo);

	@Query(value="SELECT d.*"
			+ " FROM dipendenti AS d JOIN ("
			+ "	SELECT iddipendente, COUNT(ordinazioni) AS count_ordinazioni"
			+ "	FROM ordinazioni"
			+ "	WHERE orarioordinazione >= :datainizio AND orarioordinazione <= :datafine"
			+ "	GROUP BY iddipendente"
			+ "	ORDER BY count_ordinazioni DESC"
			+ "	) AS conteggio ON d.iddipendente = conteggio.iddipendente"
			+ " WHERE ruolo <> 'Amministratore'"
			+ " LIMIT 1", nativeQuery=true)
	Optional<Dipendente> ottieniMigliorAddettoSala(@Param(value="datainizio") LocalDate dataInizio, @Param(value="datafine") LocalDate dataFine);
	
	@Query(value="SELECT d.*"
			+ " FROM dipendenti AS d JOIN ("
			+ "	SELECT ppo.iddipendente, COUNT(ppo) AS count_preparazioni"
			+ "	FROM preparazionepiattiordinazioni AS ppo JOIN ordinazioni AS o ON ppo.idordinazione = o.idordinazione"
			+ "	WHERE o.orarioordinazione >= :datainizio AND o.orarioordinazione <= :datafine"
			+ "	GROUP BY ppo.iddipendente"
			+ "	ORDER BY count_preparazioni DESC"
			+ "	) AS conteggio ON d.iddipendente = conteggio.iddipendente"
			+ " WHERE ruolo <> 'Amministratore'"
			+ " LIMIT 1", nativeQuery=true)
	Optional<Dipendente> ottieniMigliorAddettoCucina(@Param(value="datainizio") LocalDate dataInizio, @Param(value="datafine") LocalDate dataFine);

}
