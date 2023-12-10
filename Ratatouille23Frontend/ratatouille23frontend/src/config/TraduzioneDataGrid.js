export const GRID_DEFAULT_LOCALE_TEXT= {
  // Root
  noRowsLabel: 'Nessuna riga',
  noResultsOverlayLabel: 'Nessun risultato trovato',

  // Density selector toolbar button text
  toolbarDensity: 'Densità',
  toolbarDensityLabel: 'Densa',
  toolbarDensityCompact: 'Compatta',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Spaziosa',

  // Columns selector toolbar button text
  toolbarColumns: 'Colonne',
  toolbarColumnsLabel: 'Seleziona colonne',

  // Filters toolbar button text
  toolbarFilters: 'Filtri',
  toolbarFiltersLabel: 'Mostra filtri',
  toolbarFiltersTooltipHide: 'Nascondi filtri',
  toolbarFiltersTooltipShow: 'Mostra filtri',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtri attivi` : `${count} filtri attivi`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Cerca...',
  toolbarQuickFilterLabel: 'Cerca',
  toolbarQuickFilterDeleteIconLabel: 'Azzera',

  // Export selector toolbar button text
  toolbarExport: 'Esporta',
  toolbarExportLabel: 'Esporta',
  toolbarExportCSV: 'Scarica come CSV',
  toolbarExportPrint: 'Stampa',
  toolbarExportExcel: 'Scarica come Excel',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Trova colonna',
  columnsPanelTextFieldPlaceholder: 'Titolo colonna',
  columnsPanelDragIconLabel: 'Ordina colonna',
  columnsPanelShowAllButton: 'Mostra tutte',
  columnsPanelHideAllButton: 'Nascondi tutte',

  // Filter panel text
  filterPanelAddFilter: 'Aggiungi filtro',
  filterPanelDeleteIconLabel: 'Elimina',
  filterPanelLogicOperator: 'Logic operator',
  filterPanelOperator: 'Operatore',
  filterPanelOperatorAnd: 'E',
  filterPanelOperatorOr: 'Oppure',
  filterPanelColumns: 'Colonne',
  filterPanelInputLabel: 'Valore',
  filterPanelInputPlaceholder: 'Valore filtro',

  // Filter operators text
  filterOperatorContains: 'contiene',
  filterOperatorEquals: 'è uguale',
  filterOperatorStartsWith: 'inizia con',
  filterOperatorEndsWith: 'termina con',
  filterOperatorIs: 'è',
  filterOperatorNot: 'non è',
  filterOperatorAfter: 'è dopo',
  filterOperatorOnOrAfter: 'is on or after',
  filterOperatorBefore: 'è prima',
  filterOperatorOnOrBefore: 'is on or before',
  filterOperatorIsEmpty: 'è vuoto',
  filterOperatorIsNotEmpty: 'non è vuoto',
  filterOperatorIsAnyOf: 'è uno tra',

  // Filter values text
  filterValueAny: 'qualsiasi',
  filterValueTrue: 'vero',
  filterValueFalse: 'falso',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostra colonne',
  columnMenuManageColumns: 'Gestisci colonne',
  columnMenuFilter: 'Filtri',
  columnMenuHideColumn: 'Nascondi colonne',
  columnMenuUnsort: 'Disattiva ordinamento',
  columnMenuSortAsc: 'Ordina ascendente',
  columnMenuSortDesc: 'Ordina discendente',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtri attivi` : `${count} filtri attivi`,
  columnHeaderFiltersLabel: 'Mostra filtri',
  columnHeaderSortIconLabel: 'Ordina',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} righe selezionate`
      : `${count.toLocaleString()} riga selezionata`,

  // Total row amount footer text
  footerTotalRows: 'Righe Totali:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Seleziona',
  checkboxSelectionSelectAllRows: 'Seleziona tutte le righe',
  checkboxSelectionUnselectAllRows: 'Deseleziona tutte le righe',
  checkboxSelectionSelectRow: 'Seleziona riga',
  checkboxSelectionUnselectRow: 'Deseleziona riga',

  // Boolean cell text
  booleanCellTrueLabel: 'sì',
  booleanCellFalseLabel: 'no',

  // Actions cell more text
  actionsCellMore: 'più',

  // Column pinning text
  pinToLeft: 'Blocca a sinistra',
  pinToRight: 'Blocca a destra',
  unpin: 'Sblocca',

  // Tree Data
  treeDataGroupingHeaderName: 'Raggruppa',
  treeDataExpand: 'mostra figli',
  treeDataCollapse: 'nascondi figli',

  // Grouping columns
  groupingColumnHeaderName: 'Raggruppa',
  groupColumn: (name) => `Raggruppa per ${name}`,
  unGroupColumn: (name) => `Non raggruppare per ${name}`,

  // Master/detail
  detailPanelToggle: 'Interruttore pannello di dettaglio',
  expandDetailPanel: 'Espandi',
  collapseDetailPanel: 'Collassa',

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: 'Riordinamento righe',

  // Aggregation
  aggregationMenuItemHeader: 'Aggregazione',
  aggregationFunctionLabelSum: 'somma',
  aggregationFunctionLabelAvg: 'media',
  aggregationFunctionLabelMin: 'minimo',
  aggregationFunctionLabelMax: 'massimo',
  aggregationFunctionLabelSize: 'grandezza',
};