export const ottieniInfoPiatto = (descrizione, allergeni) => {
    let messaggio = "";
    let allergeniList = '';

    if(!allergeni || allergeni.length === 0)
      allergeniList = 'Nessuno';
    else
      allergeniList = allergeni.join(', ');

    messaggio = descrizione ? descrizione : "Nessuna descrizione specificata";
    messaggio = messaggio.concat("\nAllergeni: ", allergeniList);
    
    return messaggio;
}