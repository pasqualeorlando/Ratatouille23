package com.ratatouille23.server.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ratatouille23.server.model.Tavolo;

public interface RepositoryTavolo extends JpaRepository<Tavolo, Long>{

	@Query(value="SELECT * FROM tavoli AS T WHERE T.numerotavolo= :numerotavolo", nativeQuery=true)
	List<Tavolo> ottieniTavoliDaNumeroTavolo(@Param(value="numerotavolo") int numeroTavolo);

	@Query(value="SELECT t.*"
			+ " FROM tavoli AS t JOIN ordinazioni AS o ON t.idtavolo = o.idtavolo"
			+ " WHERE o.orarioordinazione >= :datainizio AND o.orarioordinazione <= :datafine"
			+ " GROUP BY t.idtavolo", nativeQuery=true)
	List<Tavolo> ottieniTavoli(@Param(value="datainizio") LocalDate dataInizio, @Param(value="datafine") LocalDate dataFine);

}
