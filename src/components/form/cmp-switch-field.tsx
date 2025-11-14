import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControlLabel, FormHelperText, Switch } from "@mui/material";

type CmpSwitchProps = {
    name: string;
    label: string;
};

export const CmpSwitchField: React.FC<CmpSwitchProps> = ({ name, label }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <FormControlLabel control={<Switch checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />} label={label} />
                    {!!fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
                </>
            )}
        />
    );
};
