import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

export interface TextFieldProps {
    name: string;
    label: string;
    type?: React.InputHTMLAttributes<unknown>["type"];
    autoComplete?: string;
    fullWidth?: boolean;
}

export const CmpTextField: React.FC<TextFieldProps> = ({ name, label, type = "text", autoComplete, fullWidth = true }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    type={type}
                    label={label}
                    autoComplete={autoComplete}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth={fullWidth}
                    size="small"
                />
            )}
        />
    );
};
/*
sx={{
                        "& .MuiOutlinedInput-input": { padding: "6px 8px" },
                        "& .MuiInputLabel-root": { top: -2 }, // optional: nudge label if it feels off
                    }}*/
