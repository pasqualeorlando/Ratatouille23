import { ottieniInfoPiatto } from "../pages/EffettuaOrdinazione/toTest";

describe("Test ottieniInfoPiatto", () => {
    test("testDescrizioneEAllergeniNull()", () => {
      const descrizione = null;
      const allergeni = null;
  
      const output = "Nessuna descrizione specificata\nAllergeni: Nessuno";
  
      expect(ottieniInfoPiatto(descrizione, allergeni)).toEqual(output);
  
    });

    test("testDescrizioneEAllergeniUndefined()", () => {
        const descrizione = undefined;
        const allergeni = undefined;
    
        const output = "Nessuna descrizione specificata\nAllergeni: Nessuno";
    
        expect(ottieniInfoPiatto(descrizione, allergeni)).toEqual(output);
    
    });

    test("testDescrizioneVuotaENessunAllergene()", () => {
        const descrizione = "";
        const allergeni = [];
    
        const output = "Nessuna descrizione specificata\nAllergeni: Nessuno";
    
        expect(ottieniInfoPiatto(descrizione, allergeni)).toEqual(output);
    
    });

    test("testDescrizioneEAllergeniPresenti()", () => {
        const descrizione = "Descrizione di prova";
        const allergeni = ["Glutine", "Molluschi"];
    
        const output = "Descrizione di prova\nAllergeni: Glutine, Molluschi";
    
        expect(ottieniInfoPiatto(descrizione, allergeni)).toEqual(output);
    });
});