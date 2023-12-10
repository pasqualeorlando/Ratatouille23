import { calcolaOrdiniDipendente } from "../pages/Statistiche Sala/toTest";

describe("Test calcolaOrdiniDipendente", () => {
  test("testDataInizioNull()", () => {
    const dataInizio = null;
    const dataFine = "2023-06-29";
    const ordinazioni = [
        {
        "idOrdinazione": 3,
        "orarioOrdinazione": "2023-06-15T11:52:18",
        "idDipendente": 3,
        "idTavolo": 2,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    }];

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataInizioUndefined()", () => {
    const dataInizio = undefined;
    const dataFine = "2023-01-22";
    const ordinazioni = [
        {
        "idOrdinazione": 3,
        "orarioOrdinazione": "2023-06-15T11:52:18",
        "idDipendente": 3,
        "idTavolo": 2,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    }];

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataInizioVuota()", () => {
    const dataInizio = "";
    const dataFine = "2023-01-22";
    const ordinazioni = [
        {
        "idOrdinazione": 3,
        "orarioOrdinazione": "2023-06-15T11:52:18",
        "idDipendente": 3,
        "idTavolo": 2,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    }];

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataInizioNonRappresentativa()", () => {
    const dataInizio = "ciao";
    const dataFine = "2023-01-22";
    const ordinazioni = [
        {
        "idOrdinazione": 3,
        "orarioOrdinazione": "2023-06-15T11:52:18",
        "idDipendente": 3,
        "idTavolo": 2,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    }];

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataInizioInesistente()", () => {
    const dataInizio = "2023-02-31"; //diventa 2023-03-03
    const dataFine = "2023-06-22";
    const ordinazioni = [
        {
        "idOrdinazione": 3,
        "orarioOrdinazione": "2023-06-15T11:52:18",
        "idDipendente": 3,
        "idTavolo": 2,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    }];

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataFineNull()", () => {
    const dataInizio = "2023-01-22";
    const dataFine = null;
    const ordinazioni = [
        {
        "idOrdinazione": 3,
        "orarioOrdinazione": "2023-06-15T11:52:18",
        "idDipendente": 3,
        "idTavolo": 2,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    }];

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataFineUndefined()", () => {
    const dataInizio = "2023-01-22";
    const dataFine = undefined;
    const ordinazioni = [
        {
        "idOrdinazione": 3,
        "orarioOrdinazione": "2023-06-15T11:52:18",
        "idDipendente": 3,
        "idTavolo": 2,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    }];

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataFineVuota()", () => {
    const dataInizio = "2023-01-22";
    const dataFine = "";
    const ordinazioni = [
        {
        "idOrdinazione": 3,
        "orarioOrdinazione": "2023-06-15T11:52:18",
        "idDipendente": 3,
        "idTavolo": 2,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    }];

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataFineNonRappresentativa()", () => {
    const dataInizio = "2023-01-22";
    const dataFine = "ciao";
    const ordinazioni = [
        {
        "idOrdinazione": 3,
        "orarioOrdinazione": "2023-06-15T11:52:18",
        "idDipendente": 3,
        "idTavolo": 2,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    }];

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataFineInesistente()", () => {
    const dataInizio = "2023-06-01";
    const dataFine = "2023-06-31"; //diventa 2023-07-01
    const ordinazioni = [
        {
        "idOrdinazione": 3,
        "orarioOrdinazione": "2023-06-15T11:52:18",
        "idDipendente": 3,
        "idTavolo": 2,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    }];

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataFineAntecedenteDataInizio()", () => {
    const dataInizio = "2023-06-16";
    const dataFine = "2023-06-12";
    const ordinazioni = [
        {
        "idOrdinazione": 3,
        "orarioOrdinazione": "2023-06-15T11:52:18",
        "idDipendente": 3,
        "idTavolo": 2,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    }];

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDateCorretteVettoreNull()", () => {
    const dataInizio = "2023-06-12";
    const dataFine = "2023-06-16";
    const ordinazioni = null;

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDateCorretteVettoreUndefined()", () => {
    const dataInizio = "2023-06-12";
    const dataFine = "2023-06-16";
    const ordinazioni = undefined;

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDateCorretteVettoreVuoto()", () => {
    const dataInizio = "2023-06-12";
    const dataFine = "2023-06-16";
    const ordinazioni = [];

    const output = 0;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDateCorretteVettorePieno()", () => {
    const dataInizio = "2023-06-12";
    const dataFine = "2023-06-16";
    const ordinazioni = [
        {
        "idOrdinazione": 3,
        "orarioOrdinazione": "2023-06-15T11:52:18",
        "idDipendente": 3,
        "idTavolo": 2,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    },
    {
        "idOrdinazione": 4,
        "orarioOrdinazione": "2023-06-13T11:52:18",
        "idDipendente": 3,
        "idTavolo": 4,
        "preparazioni": [
            {
                "idPreparazionePiattoOrdinazione": 4,
                "piatto": {
                    "idPiatto": 1,
                    "nome": "TestPiatto",
                    "costo": 10,
                    "descrizione": "Descrizione",
                    "posizionePiatto": 1,
                    "categoria": "TestCategoria",
                    "idCategoria": 1,
                    "allergeni": [
                        "Frutta a guscio"
                    ],
                    "attivo": true
                },
                "idOrdinazione": 3,
                "idDipendente": 2,
                "statoPreparazione": "Evaso",
                "quantita": 3,
                "nota": "Troppo buono"
            }
        ],
        "tavolo": {
            "idTavolo": 2,
            "numeroTavolo": 2,
            "numeroOspiti": 1
        }
    }];

    const output = 2;

    expect(calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine)).toEqual(output);
  });
});
