import React, { useState, useEffect } from 'react'
import { ottieniMenu } from '../../services/MenuService';
import { ottieniPiattiAttiviDaIdCategoria } from '../../services/PiattoService';
import { ottieniCategorieMenuDaIdMenu } from '../../services/CategoriaMenuService';
import EffettuaOrdinazioneView from './EffettuaOrdinazioneView';
import useAuth from '../../hooks/useAuth';

const EffettuaOrdinazioneContainer = (props) => {
  const {tavolo, handleCloseNuovaOrdinazione} = props;
  const [menus, setMenus] = useState([]);
  const [preparazioni, setPreparazioni] = useState([]);
  const {auth} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const menus = await ottieniMenu();

            for(const menu of menus) {
                const categorieMenu = await ottieniCategorieMenuDaIdMenu(menu.idMenu);

                for(const catMenu of categorieMenu) {
                    const piatti = await ottieniPiattiAttiviDaIdCategoria(catMenu.idCategoria);

                    piatti.sort((a,b) => a.posizionePiatto - b.posizionePiatto);
                    catMenu.piatti = piatti;
                }
                if(categorieMenu)
                    categorieMenu.sort((a,b) => a.posizioneCategoria - b.posizioneCategoria);
                menu.categorie = categorieMenu;
            }

            return menus;
        } catch (error) {
            console.log(error);
        }
    }

    fetchData().then(menus => {
        setMenus(menus);
    }).catch(error => console.log(error));
  }, [tavolo]);
 
  return (
    <EffettuaOrdinazioneView tavolo={tavolo} 
        menu={menus}
        preparazioni={preparazioni}
        setPreparazioni={setPreparazioni}
        idDipendente={auth.dipendente.idDipendente}
        handleCloseNuovaOrdinazione={handleCloseNuovaOrdinazione}/>
  )
}

export default EffettuaOrdinazioneContainer