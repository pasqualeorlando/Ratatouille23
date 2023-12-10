import React from 'react'
import CategorieView from './CategorieView'
import { useState, useEffect } from 'react';
import { eliminaCategoria, ottieniCategorie } from '../../services/CategoriaService';
import { ottieniPiattiAttiviDaIdCategoria } from '../../services/PiattoService';
import { ottieniMenu } from '../../services/MenuService';


const CategorieContainer = () => {
  const [categorie, setCategorie] = useState([]);
  const [menu, setMenu] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  const eliminaCategorieSelezionate = () => {
    selectionModel.forEach(async (id) => {
      let response = await eliminaCategoria(id);
      if(response.status === 200)
        setCategorie((categorie) => categorie.filter((categoria) => categoria.idCategoria !== id));
    });
    setSelectionModel([]);
  }

  useEffect(() => {
    const fetchData = async () => {
        try {
            const categorie = await ottieniCategorie();
            const menu = await ottieniMenu();

            categorie.forEach(async (categoria) => {
                const piatti = await ottieniPiattiAttiviDaIdCategoria(categoria.idCategoria);

                categoria.piatti = piatti;
            })

            return {categorie, menu};
        } catch (error) {
            console.log(error);
        }
    }

    fetchData().then(({categorie, menu}) => {
        setCategorie(categorie);
        setMenu(menu);
    }).catch(error => console.log(error));
  }, []);


  return (
    <CategorieView rows={categorie} 
      setCategorie={setCategorie}
      selectionModel={selectionModel}
      setSelectionModel={setSelectionModel}
      menus={menu}
      eliminaCategorieSelezionate={eliminaCategorieSelezionate}>
    </CategorieView>
  )
}

export default CategorieContainer