import { calcolaPiattiEvasi } from "../pages/Statistiche cucina/toTest";

describe("Test calcolaPiattiEvasi", () => {
  test("testDataInizioNull()", () => {
    const dataInizio = null;
    const dataFine = "2023-06-29";
    const preparazioni = [
      {
        idPreparazionePiattoOrdinazione: 9,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 9,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 3,
        nota: "",
        ordinazione: {
          idOrdinazione: 9,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
    ];

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataInizioUndefined()", () => {
    const dataInizio = undefined;
    const dataFine = "2023-01-22";
    const preparazioni = [
      {
        idPreparazionePiattoOrdinazione: 9,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 9,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 3,
        nota: "",
        ordinazione: {
          idOrdinazione: 9,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
    ];

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataInizioVuota()", () => {
    const dataInizio = "";
    const dataFine = "2023-01-22";
    const preparazioni = [
      {
        idPreparazionePiattoOrdinazione: 9,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 9,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 3,
        nota: "",
        ordinazione: {
          idOrdinazione: 9,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
    ];

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataInizioNonRappresentativa()", () => {
    const dataInizio = "ciao";
    const dataFine = "2023-01-22";
    const preparazioni = [
      {
        idPreparazionePiattoOrdinazione: 9,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 9,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 3,
        nota: "",
        ordinazione: {
          idOrdinazione: 9,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
    ];

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataInizioInesistente()", () => {
    const dataInizio = "2023-02-31"; //diventa 2023-03-03
    const dataFine = "2023-06-22";
    const preparazioni = [
      {
        idPreparazionePiattoOrdinazione: 9,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 9,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 3,
        nota: "",
        ordinazione: {
          idOrdinazione: 9,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
    ];

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataFineNull()", () => {
    const dataInizio = "2023-01-22";
    const dataFine = null;
    const preparazioni = [
      {
        idPreparazionePiattoOrdinazione: 9,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 9,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 3,
        nota: "",
        ordinazione: {
          idOrdinazione: 9,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
    ];

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataFineUndefined()", () => {
    const dataInizio = "2023-01-22";
    const dataFine = undefined;
    const preparazioni = [
      {
        idPreparazionePiattoOrdinazione: 9,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 9,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 3,
        nota: "",
        ordinazione: {
          idOrdinazione: 9,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
    ];

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataFineVuota()", () => {
    const dataInizio = "2023-01-22";
    const dataFine = "";
    const preparazioni = [
      {
        idPreparazionePiattoOrdinazione: 9,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 9,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 3,
        nota: "",
        ordinazione: {
          idOrdinazione: 9,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
    ];

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataFineNonRappresentativa()", () => {
    const dataInizio = "2023-01-22";
    const dataFine = "ciao";
    const preparazioni = [
      {
        idPreparazionePiattoOrdinazione: 9,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 9,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 3,
        nota: "",
        ordinazione: {
          idOrdinazione: 9,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
    ];

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataFineInesistente()", () => {
    const dataInizio = "2023-06-01";
    const dataFine = "2023-06-31"; //diventa 2023-07-01
    const preparazioni = [
      {
        idPreparazionePiattoOrdinazione: 9,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 9,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 3,
        nota: "",
        ordinazione: {
          idOrdinazione: 9,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
    ];

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDataFineAntecedenteDataInizio()", () => {
    const dataInizio = "2023-06-16";
    const dataFine = "2023-06-12";
    const preparazioni = [
      {
        idPreparazionePiattoOrdinazione: 9,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 9,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 3,
        nota: "",
        ordinazione: {
          idOrdinazione: 9,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
    ];

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDateCorretteVettoreNull()", () => {
    const dataInizio = "2023-06-12";
    const dataFine = "2023-06-16";
    const preparazioni = null;

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDateCorretteVettoreUndefined()", () => {
    const dataInizio = "2023-06-12";
    const dataFine = "2023-06-16";
    const preparazioni = undefined;

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDateCorretteVettoreVuoto()", () => {
    const dataInizio = "2023-06-12";
    const dataFine = "2023-06-16";
    const preparazioni = [];

    const output = 0;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });

  test("testDateCorretteVettorePieno()", () => {
    const dataInizio = "2023-06-12";
    const dataFine = "2023-06-16";
    const preparazioni = [
      {
        idPreparazionePiattoOrdinazione: 9,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 9,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 3,
        nota: "",
        ordinazione: {
          idOrdinazione: 9,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
      {
        idPreparazionePiattoOrdinazione: 10,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 10,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 2,
        nota: "",
        ordinazione: {
          idOrdinazione: 10,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
      {
        idPreparazionePiattoOrdinazione: 11,
        piatto: {
          idPiatto: 1,
          nome: "TestPiatto",
          costo: 10,
          descrizione: "Descrizione",
          posizionePiatto: 1,
          categoria: "CategoriaTest",
          idCategoria: 18,
          allergeni: ["Arachidi", "Frutta a guscio"],
          attivo: true,
        },
        idOrdinazione: 11,
        idDipendente: 2,
        statoPreparazione: "Evaso",
        quantita: 1,
        nota: "",
        ordinazione: {
          idOrdinazione: 11,
          orarioOrdinazione: "2023-06-14T15:38:52",
          idDipendente: 1,
          idTavolo: 2,
        },
      },
    ];

    const output = 6;

    expect(calcolaPiattiEvasi(preparazioni, dataInizio, dataFine)).toEqual(output);
  });
});
