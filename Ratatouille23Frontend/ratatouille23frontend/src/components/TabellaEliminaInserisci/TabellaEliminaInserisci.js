import React from 'react';
import { Tooltip, Button } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { GRID_DEFAULT_LOCALE_TEXT } from '../../config/TraduzioneDataGrid';
import useAuth from '../../hooks/useAuth';

export default function TabellaEliminaInserisci(props) {
  const theme = useTheme();
  const { auth } = useAuth();

  const {headCells, rows, selectionModel, setSelectionModel} = props;
  
  /*const onDelete = () => {
    setRows((rows) => rows.filter((row) => !selectionModel.includes(row.idDipendente)));
  };*/

  return (
    <>
      {selectionModel?.length > 0 ? (
        <Tooltip title="Elimina selezionato/i">
          <Button
          sx={{ borderRadius: 3, color:theme.palette.white.main, backgroundColor:theme.palette.fourtiary.main }}
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={props.handleOpenModaleEliminazione}
        >
          Elimina selezionato/i
        </Button>
        </Tooltip>
      ) : (
        <></>
      )}
        <DataGrid checkboxSelection={true}
          disableSelectionOnClick 
          disableColumnMenu 
          disableColumnFilter 
          columns={headCells} 
          rows={rows} 
          getRowId={(row) => row.id}
          autoPageSize pagination
          localeText={GRID_DEFAULT_LOCALE_TEXT}
          onSelectionModelChange={setSelectionModel}
          selectionModel={selectionModel}
          isRowSelectable={(params) => (headCells.find(e => e.field === 'ruolo') && params.row.id !== auth.dipendente.idDipendente) || !headCells.find(e => e.field === 'ruolo')}
          //sortModel={sortModel}
          //onSortModelChange={(model) => setSortModel(model)}
          sx={{ width: '100%', height: '50%', paddingTop: '25px', paddingBottom: '25px', borderRadius: '30px', backgroundColor: theme.palette.white.main, boxShadow: '0px 3px 7px', '&.MuiDataGrid-columnHeader': {backgroundColor: theme.palette.white.main} }}
        />
    </>
  );
}