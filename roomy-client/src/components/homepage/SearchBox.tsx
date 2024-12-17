// SearchBox.js
"use client";
import React from "react";
import { TextField, Button, Grid } from "@mui/material";

const SearchBox = ({
  value,
  onChange,
  onSearch,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TextField label="Search Address" variant="outlined" value={value} onChange={onChange} />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={onSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBox;
