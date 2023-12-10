export const modificaSelezioneCategoria = (vecchiaSelezione, idCategoria) => {
    let nuovaSelezione = [];

    if(!vecchiaSelezione)
      return nuovaSelezione;

    if(idCategoria <= 0)
      return vecchiaSelezione;

    const indiceSelezionato = vecchiaSelezione.indexOf(idCategoria);

    if (indiceSelezionato === -1) {
      nuovaSelezione = nuovaSelezione.concat(vecchiaSelezione, idCategoria);
    } else if (indiceSelezionato === 0) {
      nuovaSelezione = nuovaSelezione.concat(vecchiaSelezione.slice(1));
    } else if (indiceSelezionato === vecchiaSelezione.length - 1) {
      nuovaSelezione = nuovaSelezione.concat(vecchiaSelezione.slice(0, -1));
    } else if (indiceSelezionato > 0) {
      nuovaSelezione = nuovaSelezione.concat(
        vecchiaSelezione.slice(0, indiceSelezionato),
        vecchiaSelezione.slice(indiceSelezionato + 1),
      );
    }

    return nuovaSelezione;
}