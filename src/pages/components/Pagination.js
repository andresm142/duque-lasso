import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Paginacion(props) {
    let totalPages = Math.ceil(props.totalItems / props.itemsPerPage);
    // const totalPages = 20;  // Para pruebas
    if (totalPages<=0) {
      totalPages = 1;
    }

  return (
    <Stack spacing={2}>
         
      <Pagination count={totalPages} variant="outlined" onChange={(e, value) => props.onChange(value)} />
        
    </Stack>
  );
}