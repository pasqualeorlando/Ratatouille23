import { modificaSelezioneCategoria } from "../pages/Categorie/toTest";

describe("Test modificaSelezioneCategoria", () => {
    test("testIdCategoriaPresenteNelVettore()", () => {
      const vecchiaSelezione = [1,2,3,4];
      const idCategoria = 4;
  
      const output = [1,2,3];
  
      expect(modificaSelezioneCategoria(vecchiaSelezione, idCategoria)).toEqual(output);
  
    });

    test("testIdCategoriaNonPresenteNelVettore()", () => {
        const vecchiaSelezione = [1,2,3];
        const idCategoria = 4;
    
        const output = [1,2,3,4];
    
        expect(modificaSelezioneCategoria(vecchiaSelezione, idCategoria)).toEqual(output);
    
    });

    test("testVettoreNull()", () => {
        const vecchiaSelezione = null;
        const idCategoria = 1;
    
        const output = [];
    
        expect(modificaSelezioneCategoria(vecchiaSelezione, idCategoria)).toEqual(output);
    
    });

    test("testVettoreVuoto()", () => {
        const vecchiaSelezione = [];
        const idCategoria = 1;
    
        const output = [1];
    
        expect(modificaSelezioneCategoria(vecchiaSelezione, idCategoria)).toEqual(output);
    
    });

    test("testIdCategoriaMinoreOUgualeZero()", () => {
        const vecchiaSelezione = [];
        const idCategoria = 0;
    
        const output = [];
    
        expect(modificaSelezioneCategoria(vecchiaSelezione, idCategoria)).toEqual(output);
    
    });

    test("testVettoreVecchiaSelezioneNonDefinito()", () => {
        const vecchiaSelezione = undefined;
        const idCategoria = 1;
    
        const output = [];
    
        expect(modificaSelezioneCategoria(vecchiaSelezione, idCategoria)).toEqual(output);
    
    });
});