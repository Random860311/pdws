import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, SxProps } from "@mui/material";
import { Theme } from "@emotion/react";

export interface CustomRadioGroupProps {
    title?: string;
    labels: string[];
    selectedIndex: number;
    row?: boolean; // Optional: allow horizontal layout
    sx?: SxProps<Theme>;
    onChange: (index: number) => void;
}

export const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({ title, labels, selectedIndex, onChange, sx, row = true }) => {
    return (
        <FormControl component="fieldset" sx={sx}>
            {title && <FormLabel component="legend">{title}</FormLabel>}

            <RadioGroup row={row} value={String(selectedIndex)} onChange={(e) => onChange(Number(e.target.value))}>
                {labels.map((label, index) => (
                    <FormControlLabel key={index} value={String(index)} control={<Radio />} label={label} />
                ))}
            </RadioGroup>
        </FormControl>
    );
};
