import React, { useState, useEffect } from 'react'
import GestioneMenuView from './GestioneMenuView'
import { eliminaMenu, ottieniMenu } from '../../services/MenuService';

const GestioneMenuContainer = () => {
  const [menu, setMenu] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  const eliminaMenuSelezionati = () => {
    selectionModel.forEach(async (idMenu) => {
      let response = await eliminaMenu(idMenu);
      if(response.status === 200)
        setMenu((menu) => menu.filter((m) => m.idMenu !== idMenu));
    });
    setSelectionModel([]);
  }

  useEffect(() => {
    const fetchData = async () => {
        try {
            const menu = await ottieniMenu();

            return menu;
        } catch (error) {
            console.log(error);
        }
    }

    fetchData().then(m => {
        setMenu(m);
    }).catch(error => console.log(error));
  }, []);

  return (
    <GestioneMenuView rows={menu} setMenus={setMenu} selectionModel={selectionModel} setSelectionModel={setSelectionModel} eliminaMenuSelezionati={eliminaMenuSelezionati}></GestioneMenuView>
  )
}

export default GestioneMenuContainer