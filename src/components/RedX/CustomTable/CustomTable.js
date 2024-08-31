import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import React ,{useState} from 'react'
import { Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CustomTable = ({rows,handleCustomModal,access}) => {
   
    const [tableData,setTableData]=useState(rows)
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleChangePage = (event, newPage) => {
      // console.log(event);
      // console.log(newPage);
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
      const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelected = rows.map((n) => n);
          setSelected(newSelected);
          return;
        }
        setSelected([]);
      };
      
      
      
      const handleClick = (event, row) => {
        const selectedIndex = selected.findIndex((selectedRow) => selectedRow.id === row.id);
        let newSelected = [];
      
        if (selectedIndex === -1) {
          // Add the selected row
          newSelected = [...selected, row];
        } else {
          // Remove the selected row
          newSelected = selected.filter((selectedRow) => selectedRow.id !== row.id);
        }
      
        setSelected(newSelected);
      };
      
      const isSelected = (row) => selected.some((selectedRow) => selectedRow.id === row.id);
      console.log(selected)
      
      
      
      
      
  return (
    <div>
        <div>
    <TableContainer component={Paper} >
      <Table size='small' aria-label="simple table" >
        <TableHead>
          <TableRow>
          <TableCell style={{fontWeight:"bold"}} >
            <Checkbox
                        color="primary"
                        onChange={handleSelectAllClick}
                      
                      />
                      </TableCell>
            <TableCell style={{fontWeight:"bold"}} >Cust Name </TableCell>
            <TableCell style={{fontWeight:"bold"}}>id</TableCell>
            <TableCell style={{fontWeight:"bold"}} >cap</TableCell>
            <TableCell style={{fontWeight:"bold"}} >Red X</TableCell>
            <TableCell style={{fontWeight:"bold"}} >Item Code</TableCell>
            <TableCell style={{fontWeight:"bold"}} >Date</TableCell>

            <TableCell style={{fontWeight:"bold"}} >Cust Name </TableCell>
            <TableCell style={{fontWeight:"bold"}}>id</TableCell>
            <TableCell style={{fontWeight:"bold"}} >cap</TableCell>
            <TableCell style={{fontWeight:"bold"}} >Red X</TableCell>
            <TableCell style={{fontWeight:"bold"}} >Item Code</TableCell>
            <TableCell style={{fontWeight:"bold"}} >Date</TableCell>

            <TableCell style={{fontWeight:"bold"}} >Cust Name </TableCell>
            <TableCell style={{fontWeight:"bold"}}>id</TableCell>
            <TableCell style={{fontWeight:"bold"}} >cap</TableCell>
            <TableCell style={{fontWeight:"bold"}} >Red X</TableCell>
            <TableCell style={{fontWeight:"bold"}} >Item Code</TableCell>
            <TableCell style={{fontWeight:"bold"}} >Date</TableCell>

            <TableCell style={{fontWeight:"bold"}} >Cust Name </TableCell>
            <TableCell style={{fontWeight:"bold"}}>id</TableCell>
            <TableCell style={{fontWeight:"bold"}} >cap</TableCell>
            <TableCell style={{fontWeight:"bold"}} >Red X</TableCell>
            <TableCell style={{fontWeight:"bold"}} >Item Code</TableCell>
            <TableCell style={{fontWeight:"bold"}} >Date</TableCell>

            <TableCell style={{fontWeight:"bold"}} >Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => 
          {
            const isItemSelected = isSelected(row);
            console.log(isItemSelected)
            const labelId = `enhanced-table-checkbox-${index}`;
          return(
            <TableRow
             
              hover
               onClick={(event) => handleClick(event, row)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell><Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row)}
                         checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      /></TableCell>
             <TableCell >{row.name}</TableCell>
              <TableCell >{row.id}</TableCell>
              <TableCell  >{row.cap}</TableCell>
              <TableCell >{row.num}</TableCell>
              <TableCell >{row.num2}</TableCell>
              <TableCell >{row.date}</TableCell>
              <TableCell >
                {row.name}
              </TableCell>
              <TableCell >{row.id}</TableCell>
              <TableCell  >{row.cap}</TableCell>
              <TableCell >{row.num}</TableCell>
              <TableCell >{row.num2}</TableCell>
              <TableCell >{row.date}</TableCell>
              <TableCell >{row.name}</TableCell>
              <TableCell >{row.id}</TableCell>
              <TableCell  >{row.cap}</TableCell>
              <TableCell >{row.num}</TableCell>
              <TableCell >{row.num2}</TableCell>
              <TableCell >{row.date}</TableCell>
              <TableCell >{row.name}</TableCell>
              <TableCell >{row.id}</TableCell>
              <TableCell  >{row.cap}</TableCell>
              <TableCell >{row.num}</TableCell>
              <TableCell >{row.num2}</TableCell>
              <TableCell >{row.date}</TableCell>
              
             
              <TableCell ><div><div>Yes</div><div style={{visibility:`${access!=="write"?"hidden":""}`}}><EditIcon onClick={handleCustomModal}/></div></div></TableCell>
            </TableRow>
          )
          }
        )

        }
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
    </div>
    </div>
  )
}

export default CustomTable