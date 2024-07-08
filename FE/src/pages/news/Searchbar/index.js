import React, { useState } from 'react';
import { Input } from "antd";
import { Stack } from "@mui/material";

const { Search } = Input;


function SearchBar({ onSearch }) {

  const handleSearch = (value) => {
    onSearch(value);
  };

  return (
    <div>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="flex-end">
            <Search placeholder="Tìm kiếm chủ đề tin tức..." 
                size="large" 
                allowClear
                onSearch={handleSearch}
                style={{ width: 400 }}
                className="custom-input"
            />
        </Stack>
    </div>
  );
}

export default SearchBar;
