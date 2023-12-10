export function calcolaPiattiEvasi(preparazioni, dataInizio, dataFine) {
  let piattiEvasi = 0;
  const dataI = new Date(dataInizio);
  const dataF = new Date(dataFine);

  if (!dataInizio || dataInizio === "" || !dataFine || dataFine === "")
    return 0;

  try {
    let tmp = dataInizio === new Date(dataInizio).toISOString().substring(0, 10) && dataFine === new Date(dataFine).toISOString().substring(0, 10);
    if (!tmp) 
      return 0;
  } catch (error) {
    return 0;
  }

  const dataFinale = new Date();
  dataFinale.setDate(dataF.getDate() + 1);
  dataFinale.setHours(0, 0, 0, 0);

  let dataOrd = null;
  if (preparazioni)
    for (let i = 0; i < preparazioni.length; i++) {
      dataOrd = new Date(preparazioni[i].ordinazione.orarioOrdinazione);
      if (
        dataOrd.getTime() >= dataI.getTime() &&
        dataOrd.getTime() <= dataFinale.getTime()
      )
        if (preparazioni[i].statoPreparazione === "Evaso")
          piattiEvasi += preparazioni[i].quantita;
    }
  return piattiEvasi;
}
