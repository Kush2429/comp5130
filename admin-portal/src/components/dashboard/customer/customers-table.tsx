'use client';

import * as React from 'react';
import { Button, Chip, ChipProps } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import dayjs from 'dayjs';

import { User } from '@/types/user';
import { makeRequest } from '@/lib/services/base-api';
import { statusColors } from '@/styles/theme/color-schemes';

import { CustomersFilters } from './customers-filters';

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
}

export interface Customer {
  avatar: string | undefined;
  city: string;
  state: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  subscriptionStatus: string;
  numberOfPosts: number;
  _id: string;
}

export function CustomersTable(): React.JSX.Element {
  const [shouldRefetch, setShouldRefetch] = React.useState(false);
  const [customers, setCustomers] = React.useState([] as Customer[]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState(0);

  const fetchCustomers = async () => {
    const res: Customer[] = await makeRequest('users', {}, 'GET');
    setCustomers(res);
    setCount(res.length); // Update the count with the total number of customers
    setShouldRefetch(false); // Reset shouldRefetch to false
  };

  React.useEffect(() => {
    fetchCustomers();
  }, [page, rowsPerPage, shouldRefetch]);

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  const rowIds = React.useMemo(() => {
    return paginatedCustomers.map((customer) => customer._id);
  }, [paginatedCustomers]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const searchCustomers = async ({ searchQuery, searchCriteria }: { searchQuery: string; searchCriteria: string }) => {
    const res: Customer[] = await makeRequest('users', { [searchCriteria]: searchQuery }, 'GET');
    setCustomers(res);
    setCount(res.length); // Update the count with the total number of customers
  };

  const deleteCustomer = async (customerId: string) => {
    await makeRequest('users/' + customerId, {}, 'DELETE');
    setShouldRefetch(true);
  };

  return (
    <>
      <CustomersFilters searchCustomers={searchCustomers} />
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>No. of Posts</TableCell>
                <TableCell>Subscription Status</TableCell>
                <TableCell>Signed Up</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((row) => {
                return (
                  <TableRow hover key={row._id} selected={rowIds.includes(row._id)}>
                    <TableCell>
                      <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                        <Avatar src={row?.avatar} />
                        <Typography variant="subtitle2">{row.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row?.city && row.state ? `${row.city}, ${row.state}, USA` : 'USA'}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.numberOfPosts}</TableCell>
                    <TableCell>
                      <Chip
                        color={statusColors[row.subscriptionStatus as keyof typeof statusColors] as ChipProps['color']}
                        label={row.subscriptionStatus === 'active' ? 'Active' : 'Inactive'}
                      />
                    </TableCell>
                    <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          color="inherit"
                          startIcon={<TrashIcon fontSize="var(--icon-fontSize-md)" />}
                          onClick={() => {
                            deleteCustomer(row._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Divider />
        <TablePagination
          component="div"
          count={count}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
}
