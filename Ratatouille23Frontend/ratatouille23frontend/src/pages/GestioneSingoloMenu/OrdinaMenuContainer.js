import React, { useState } from 'react'
import { ottieniCategoriaDaId } from '../../services/CategoriaService';
import { ottieniPiattiAttiviDaIdCategoria } from '../../services/PiattoService';
import { ottieniCategorieMenuDaIdMenu } from '../../services/CategoriaMenuService';
import { useEffect } from 'react';
import OrdinaMenuView from './OrdinaMenuView'

const OrdinaMenuContainer = (props) => {

  const {menu, setMenu} = props;
  const [categorieMenu, setCategorieMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const categorieMenu = await ottieniCategorieMenuDaIdMenu(menu.idMenu);
            for(const categoriaMenu of categorieMenu) {
              const categoria = await ottieniCategoriaDaId(categoriaMenu.idCategoria);
              const piattiCategoria = await ottieniPiattiAttiviDaIdCategoria(categoria.idCategoria);

              piattiCategoria?.sort((a,b) => a.posizionePiatto - b.posizionePiatto);

              categoria.piatti = piattiCategoria;
              categoriaMenu.categoria = categoria;
            }

            if(categorieMenu)
              categorieMenu.sort((a,b) => a.posizioneCategoria - b.posizioneCategoria);

            return categorieMenu;
        } catch (error) {
            console.log(error);
        }
    }

    fetchData().then(cm => {
        setCategorieMenu(cm);
    }).catch(error => console.log(error));
  }, [menu]);

  return (
    <OrdinaMenuView key={menu} menu={menu} setMenu={setMenu} categorieMenu={categorieMenu}></OrdinaMenuView>
  )
}

export default OrdinaMenuContainer