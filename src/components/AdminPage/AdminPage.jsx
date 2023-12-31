import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminPage.css';


// Set list order by 'salary', default largest to smallest (desc)
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Set list order asc or desc, default desc
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Set table headCells attributes
const headCells = [
  {
    id: 'username',
    numeric: false,
    disablePadding: false,
    label: 'Username',
  },
  {
    id: 'user_id',
    numeric: true,
    disablePadding: false,
    label: 'User ID',
  },
  {
    id: 'job_title',
    numeric: false,
    disablePadding: false,
    label: 'Job Title',
  },
  {
    id: 'salary',
    numeric: true,
    disablePadding: false,
    label: 'Salary',
  },
  {
    id: 'bonus',
    numeric: true,
    disablePadding: false,
    label: 'Bonus',
  }
];

// Table head component
function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ margin: 4 }}>
      <TableRow >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontSize: "20px" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// Validate data used in Table Head
EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


// AdminPage component
function AdminPage() {

  const dispatch = useDispatch();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('salary');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Bring in our list of job entries from store/admin reducer
  const jobList = useSelector(store => store.admin);

  // Dispatch to fetch all job entries
  const fetchAllJobEntries = () => {
    dispatch({
      type: 'FETCH_ALL_JOBS',
    })
  };

  // Fetch all job entries on page load
  useEffect(() => {
    fetchAllJobEntries();
  }, []);

  // Delete selected job entry, fetch new JobList
  const handleDeleteJobRow = (event, jobId) => {
    dispatch({
      type: 'DELETE_JOB_ROW',
      payload: jobId
    });
    fetchAllJobEntries();
  };

  // Handle changes to how job list is displayed
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  // Handle change page user action, default Page is 0
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change of how many rows displayed per page user action.
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle change table density (Table row padding) user action.
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - jobList?.length) : 0;

  // Save the state of the listed variables to cache so that it persists 
  // between re-renders. useMemo will only run if state changes. 
  const visibleRows = useMemo(
    () =>
      stableSort(jobList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, jobList],
  );

  // Render Table to DOM.
  return (
    <div className="admin-container">
      <Box margin={5}>
        {/* <Paper sx={{ width: '100%', m: 5 }}> */}
        <Paper sx={{ m: 5 }} >

          <Typography
            sx={{ flex: '1 1 100%', fontWeight: "bold", textAlign: "center" }}
            variant="h5"
            id="tableTitle"
            component="div"
          >
            Job Entries
          </Typography>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={jobList?.length}
              />
              <TableBody>
                {visibleRows.map((job, index) => {
                  const labelId = `enhanced-table-${index}`;

                  return (
                    <TableRow
                      hover
                      role="table"
                      tabIndex={-1}
                      key={job?.job_id}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        width="1"

                      >
                        {job?.username}
                      </TableCell>
                      <TableCell align="center">{job?.user_id}</TableCell>
                      <TableCell align="left">{job?.job_title}</TableCell>
                      <TableCell align="right">{job?.salary}</TableCell>
                      <TableCell align="right">{job?.total_yearly_bonus}</TableCell>
                      <TableCell>
                        <IconButton 
                        onClick={(event) => handleDeleteJobRow(event, job?.job_id)}
                        sx={{}}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={jobList?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
};

export default AdminPage;
