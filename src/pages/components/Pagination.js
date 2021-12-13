import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination(props) {
    const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);

  return (
    <Stack spacing={2}>
         
      <Pagination count={totalPages} color="primary" onChange={(e, value) => props.onChange(value)} />
        
    </Stack>
  );
}