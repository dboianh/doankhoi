import { styled, TextField } from "@mui/material";
import React from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    border: "2px solid",
    borderColor:
      theme.palette.mode === "light"
        ? theme.palette.secondary[300]
        : theme.palette.divider,
  },
  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.secondary[300],
  },
}));

const LightTextField = (props) => {
  return <StyledTextField {...props} />;
};

export default LightTextField;