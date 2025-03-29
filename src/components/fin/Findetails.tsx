import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from "@mui/material";
import { formatCurrency } from "./utils";
import { useState } from "react";

const Findetails = ({ total, paid }: { total: number; paid: number }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={show}
                onChange={() => setShow(!show)}
                name="gilad"
              />
            }
            label="Show Interest Info"
          />
        </FormGroup>
      </FormControl>
      {show && (
        <Box
          sx={{
            color: "#483d8b",
            fontStyle: "italic",
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          <p>Interest earned so far: {formatCurrency(total)}</p>
          <p>
            Interest paid so far:
            {formatCurrency(paid)}
          </p>
          <p>
            Interest remaining:
            {formatCurrency(total - paid)}
          </p>
        </Box>
      )}
    </>
  );
};

export default Findetails;
