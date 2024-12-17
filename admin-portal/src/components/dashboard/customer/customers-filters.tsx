'use client';

import * as React from 'react';
import { MenuItem, Select } from '@mui/material';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Stack } from '@mui/system';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export function CustomersFilters({
  searchCustomers,
}: {
  searchCustomers: (params: { searchQuery: string; searchCriteria: string }) => void;
}): React.ReactElement {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchCriteria, setSearchCriteria] = React.useState('name');

  return (
    <Card sx={{ p: 2 }}>
      <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={1} direction="row" alignItems="center" sx={{ width: '50%' }}>
          <Select
            value={searchCriteria}
            onChange={(e) => {
              setSearchCriteria(e.target.value);
              searchCustomers({ searchQuery, searchCriteria: e.target.value });
            }}
            displayEmpty
            sx={{ minWidth: '150px' }} // Set a minimum width for the select dropdown
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
              </InputAdornment>
            }
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchCustomers({ searchQuery: e.target.value, searchCriteria });
            }}
            sx={{ width: 'calc(100% - 120px)' }} // Calculate width based on select dropdown width
          />
        </Stack>
      </Stack>
    </Card>
  );
}
