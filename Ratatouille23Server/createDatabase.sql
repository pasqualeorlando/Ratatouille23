CREATE TABLE menu (
	idMenu SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL UNIQUE,
	isAbilitato BOOL NOT NULL DEFAULT TRUE
);

CREATE TABLE categorie (
	idCategoria SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL
);

CREATE TABLE categoriemenu (
	idCategoriaMenu SERIAL PRIMARY KEY,
	idMenu INTEGER NOT NULL,
	idCategoria INTEGER NOT NULL,
	posizioneCategoria INTEGER NOT NULL,
	isAbilitato BOOL NOT NULL DEFAULT TRUE,
	
	CONSTRAINT idmenu_fk FOREIGN KEY(idMenu) REFERENCES menu(idMenu) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT idcategoria_fk FOREIGN KEY(idCategoria) REFERENCES categorie(idCategoria) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT categoriasingola UNIQUE(idMenu, idCategoria)
);

CREATE TYPE allergene AS ENUM('Arachidi', 'Frutta a guscio', 'Latte', 'Molluschi', 'Pesce', 'Sesamo', 'Soia', 'Crostacei', 'Glutine', 'Lupini', 'Senape', 'Sedano', 'Anidride solforosa e solfiti', 'Uova');
CREATE CAST (character varying AS allergene) WITH INOUT AS ASSIGNMENT;

CREATE TABLE piatti (
	idPiatto BIGSERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	costo NUMERIC(7,2) NOT NULL,
	descrizione VARCHAR(1024),
	posizionePiatto INTEGER NOT NULL,
	idCategoria INTEGER,
	isAttivo BOOL NOT NULL DEFAULT TRUE,
	
	CONSTRAINT idCategoria_fk FOREIGN KEY(idCategoria) REFERENCES categorie(idCategoria) ON DELETE SET NULL ON UPDATE CASCADE
);

--In una categoria il nome di un piatto è unico. Controlla che non ne esistano altri con lo stesso nome ma ATTIVI
CREATE FUNCTION piattoUnico()
RETURNS TRIGGER AS
'
BEGIN
	IF NEW.nome = OLD.nome THEN
		RETURN NEW;
	END IF;
	IF EXISTS(SELECT * FROM piatti AS P WHERE P.nome = NEW.nome AND P.isAttivo = TRUE AND P.idcategoria = NEW.idcategoria ) THEN
		RAISE ''Piatto gia esistente!'';
	END IF;
	RETURN NEW;
END;'
language 'plpgsql';
CREATE TRIGGER piattoNomeUnico
BEFORE INSERT OR UPDATE ON piatti
FOR EACH ROW
	EXECUTE PROCEDURE piattoUnico();

CREATE PROCEDURE aggiornaPosizioniCategoria
(cat INTEGER) AS
'
DECLARE
	pos INTEGER := 1;
	I RECORD;
BEGIN
	FOR I IN SELECT * FROM piatti AS p 
			 WHERE p.idCategoria = cat AND p.isAttivo = TRUE
			 ORDER BY p.posizionePiatto
	LOOP
		UPDATE piatti SET posizionePiatto = pos WHERE idPiatto = I.idPiatto;
		pos := pos+1;
	END LOOP;
END;'
language 'plpgsql';

--Se una categoria viene eliminata allora la posizione del piatto è impostata a -1. Altrimenti lo metto in coda alla categoria e aggiorno le posizioni
CREATE FUNCTION aggiustaPosizione()
RETURNS TRIGGER AS
'
BEGIN
	IF NEW.idCategoria IS NULL THEN
		UPDATE piatti SET posizionePiatto = -1 WHERE idPiatto = NEW.idPiatto;
	ELSE
		IF OLD.posizionePiatto = -1 AND (SELECT MAX(posizionePiatto)=-1 AS m FROM piatti WHERE idCategoria = NEW.idCategoria) THEN
			UPDATE piatti SET posizionePiatto = 1 WHERE idPiatto = NEW.idPiatto;
		ELSE
			UPDATE piatti SET posizionePiatto = (SELECT 1+COALESCE(MAX(posizionePiatto),0) AS m FROM piatti WHERE idCategoria = NEW.idCategoria) WHERE idPiatto = NEW.idPiatto;
		END IF;
		CALL aggiornaPosizioniCategoria(NEW.idCategoria);
	END IF;
	RETURN NEW;
END;'
language 'plpgsql';
CREATE TRIGGER aggiustaPosizionePiatto
AFTER UPDATE OF idCategoria ON piatti
FOR EACH ROW
	EXECUTE PROCEDURE aggiustaPosizione();

--Se un piatto viene eliminato allora gli imposto la posizione a -1 e aggiorno le posizioni di tutti gli altri
CREATE FUNCTION aggiustaPosizione1()
RETURNS TRIGGER AS
'
BEGIN
	IF NEW.isAttivo = FALSE THEN
		UPDATE piatti SET posizionePiatto = -1 WHERE idPiatto = NEW.idPiatto;
		CALL aggiornaPosizioniCategoria(OLD.idCategoria);
	END IF;
	RETURN NEW;
END;'
language 'plpgsql';
CREATE TRIGGER aggiustaPosizionePiatto1
AFTER UPDATE OF isAttivo ON piatti
FOR EACH ROW
	EXECUTE PROCEDURE aggiustaPosizione1();

CREATE FUNCTION aggiustaPosizione2()
RETURNS TRIGGER AS
'	
	DECLARE
		cat INTEGER;
	BEGIN
		IF NEW.idCategoria IS NOT NULL THEN
			cat := NEW.idCategoria;
			UPDATE piatti SET posizionePiatto=posizionePiatto+1 WHERE idCategoria = cat AND posizionePiatto >= NEW.posizionePiatto;
		END IF;
		RETURN NEW;
	END;
'
language 'plpgsql';
CREATE TRIGGER aggiustaPosizionePiatto2
BEFORE INSERT ON piatti
FOR EACH ROW
	EXECUTE PROCEDURE aggiustaPosizione2();

CREATE TABLE allergenipiatti (
	idPiatto INTEGER NOT NULL,
	allergeni allergene NOT NULL,
	
	CONSTRAINT idPiatto_fk FOREIGN KEY(idPiatto) REFERENCES piatti(idPiatto) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tavoliLocali (
	numeroTavolo INTEGER PRIMARY KEY,
	stato VARCHAR(15) NOT NULL
);

CREATE TABLE tavoli (
	idTavolo BIGSERIAL PRIMARY KEY,
	numeroOspiti INTEGER NOT NULL,
	numeroTavolo INTEGER NOT NULL,
	
	CONSTRAINT numeroTavolo_fk FOREIGN KEY(numeroTavolo) REFERENCES tavoliLocali(numeroTavolo) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE FUNCTION checkTavoloLibero()
RETURNS TRIGGER AS
'	
	BEGIN
		IF EXISTS (SELECT * FROM tavoliLocali WHERE numeroTavolo=NEW.numeroTavolo AND stato<>''Libero'') THEN
			RAISE ''Tavolo già occupato'';
		END IF;
		RETURN NEW;
	END;
'
language 'plpgsql';
CREATE TRIGGER occupaTavolo
BEFORE INSERT OR UPDATE OF numeroTavolo ON tavoli
FOR EACH ROW
	EXECUTE PROCEDURE checkTavoloLibero();


CREATE TABLE dipendenti (
	idDipendente SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	cognome VARCHAR(255) NOT NULL,
	email VARCHAR(320) NOT NULL UNIQUE,
	password VARCHAR(1024) NOT NULL,
	ruolo VARCHAR(30) NOT NULL,
	primoAccesso BOOLEAN DEFAULT TRUE
);

--può esserci un solo amministratore
CREATE FUNCTION amministratoreUnico()
RETURNS TRIGGER AS
'
	BEGIN
		IF NEW.ruolo = ''Amministratore'' AND NEW.idDipendente <> OLD.idDipendente AND EXISTS (SELECT * FROM dipendenti WHERE ruolo = ''Amministratore'') THEN
			RAISE ''Può esistere un solo amministratore'';
		END IF;
		RETURN NEW;
	END;
'
language 'plpgsql';
CREATE TRIGGER adminUnico
BEFORE INSERT OR UPDATE OF ruolo ON dipendenti
FOR EACH ROW
	EXECUTE PROCEDURE amministratoreUnico();
	
--inserimento amministratore
INSERT INTO dipendenti(nome, cognome, email, password, ruolo, primoAccesso) VALUES ('Admin', 'Admin', 'admin@ratatouille.it', '$2a$10$i2TR2PkFvREIeGWWVTOrKeML/b2UP7pAdEC0XWmjKWFLMN2gnXVX2', 'Amministratore', true);

CREATE TABLE ordinazioni (
	idOrdinazione BIGSERIAL PRIMARY KEY,
	orarioOrdinazione TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	idDipendente INTEGER NOT NULL,
	idTavolo BIGINT NOT NULL,
	
	CONSTRAINT idDipendente_fk FOREIGN KEY(idDipendente) REFERENCES dipendenti(idDipendente) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT idTavolo_fk FOREIGN KEY(idTavolo) REFERENCES tavoli(idTavolo) ON DELETE RESTRICT ON UPDATE CASCADE
);

/*
CREATE FUNCTION ordinazioneAddettoSala()
RETURNS TRIGGER AS
'
BEGIN
	IF NOT EXISTS(SELECT * FROM dipendenti WHERE idDipendente = NEW.idDipendente AND ruolo IN(''Addetto alla sala'', ''Amministratore'')) THEN
		RAISE ''Non puoi portare a termine questa operazione. Solo gli addetti alla sala e gli amministratori possono'';
	END IF;
	RETURN NEW;
END;'
language 'plpgsql';
CREATE TRIGGER ordinazioniAddettiSala
BEFORE INSERT ON ordinazioni
FOR EACH ROW
	EXECUTE PROCEDURE ordinazioneAddettoSala();
*/

CREATE TABLE preparazionePiattiOrdinazioni (
	idPreparazionePiattoOrdinazione BIGSERIAL PRIMARY KEY,
	idPiatto BIGINT NOT NULL,
	idOrdinazione BIGINT NOT NULL,
	idDipendente INTEGER DEFAULT NULL,
	statoPreparazione VARCHAR(20) NOT NULL,
	quantita INTEGER NOT NULL DEFAULT 1,
	nota VARCHAR(255),
	
	CONSTRAINT idPiatto_fk FOREIGN KEY(idPiatto) REFERENCES piatti(idPiatto) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT idOrdinazione_fk FOREIGN KEY(idOrdinazione) REFERENCES ordinazioni(idOrdinazione) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT idDipendente_fk FOREIGN KEY(idDipendente) REFERENCES dipendenti(idDipendente) ON DELETE SET NULL ON UPDATE CASCADE
);
/*
CREATE FUNCTION preparazioneAddettoCucina()
RETURNS TRIGGER AS
'
BEGIN
	IF NOT EXISTS(SELECT * FROM dipendenti WHERE idDipendente = NEW.idDipendente AND ruolo IN(''Addetto alla cucina'', ''Amministratore'')) THEN
		RAISE ''Non puoi portare a termine questa operazione. Solo gli addetti alla cucina e gli amministratori possono'';
	END IF;
	RETURN NEW;
END;'
language 'plpgsql';
CREATE TRIGGER preparazioniAddettiCucina
BEFORE UPDATE OF idDipendente ON preparazionePiattiOrdinazioni
FOR EACH ROW
	EXECUTE PROCEDURE preparazioneAddettoCucina();
*/