export function calcolaOrdiniDipendente(ordinazioni, dataInizio, dataFine) {
    let ordini = 0;
    const dataI = new Date(dataInizio);
    const dataF = new Date(dataFine);

    if (!dataInizio || dataInizio === "" || !dataFine || dataFine === "")
        return 0;

    try {
        let tmp = dataInizio === new Date(dataInizio).toISOString().substring(0, 10) && dataFine === new Date(dataFine).toISOString().substring(0, 10);
        if (!tmp) return 0;
    } catch (error) {
        return 0;
    }

    const dataFinale = new Date();
    dataFinale.setDate(dataF.getDate() + 1);
    dataFinale.setHours(0, 0, 0, 0);
    let dataOrd = null;

    if(ordinazioni) {
      for(let i = 0; i < ordinazioni.length; i++) {
        dataOrd = new Date(ordinazioni[i].orarioOrdinazione);
        if(dataOrd.getTime() >= dataI.getTime() && dataOrd.getTime() <= dataFinale.getTime())
          ordini++;
      }
    }
    return ordini;
}