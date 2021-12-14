import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination(props) {
    const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);
    // const totalPages = 20;  // Para pruebas

  return (
    <Stack spacing={2}>
         
      <Pagination count={totalPages} variant="outlined" onChange={(e, value) => props.onChange(value)} />
        
    </Stack>
  );
}