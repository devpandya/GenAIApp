import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { MasterUIListProps } from './MasterUIListTypes';

const MasterUIList = ({ rows, columns }: MasterUIListProps) => {
  return (
    <div>
      <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
        <DataGrid rows={rows} columns={columns} hideFooter={true} sx={{
          [`& .${gridClasses.menuIconButton}`]: {
            marginRight: "8px"
          }
        }} />
      </div>
    </div>
  );
};
export default MasterUIList;
