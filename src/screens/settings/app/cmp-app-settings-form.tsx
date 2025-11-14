import equal from "fast-deep-equal";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AppSettingsDto } from "src/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { CmpTextField } from "src/components/form";

const AppSettingsSchema = z
    .object({
        level_set_point: z.coerce.number().min(0, "Must be ≥ 0"),
        level_offset: z.coerce.number(),
        system_count: z.coerce.number().int().min(1, "At least 1 system"),
        start_pump_delay: z.coerce.number().int().min(0, "Must be ≥ 0"),
        stop_pump_delay: z.coerce.number().int().min(0, "Must be ≥ 0"),
    })
    .loose();

type AppSettingsInput = z.input<typeof AppSettingsSchema>; // before parse (strings | numbers)
type AppSettingsOutput = z.output<typeof AppSettingsSchema>;

export interface AppSettingsProps {
    defaultValues?: AppSettingsDto;
    onSubmit: (v: AppSettingsDto) => void;
}

function normalizeSettings(dto?: Partial<AppSettingsDto>): AppSettingsInput {
    return {
        level_set_point: dto?.level_set_point ?? "",
        level_offset: dto?.level_offset ?? "",
        system_count: dto?.system_count ?? "",
        start_pump_delay: dto?.start_pump_delay ?? "",
        stop_pump_delay: dto?.stop_pump_delay ?? "",
    };
}

const areEqual = (prev: AppSettingsProps, next: AppSettingsProps) => equal(prev.defaultValues, next.defaultValues);

export const CmpAppSettingsForm = React.memo(function CmpAppSettingsForm({ defaultValues, onSubmit }: AppSettingsProps) {
    const normalized = React.useMemo(() => normalizeSettings(defaultValues), [defaultValues]);

    const resolver = zodResolver(AppSettingsSchema);
    const methods = useForm<AppSettingsInput, any, AppSettingsOutput>({ resolver: resolver, defaultValues: normalized as AppSettingsInput });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;

    React.useEffect(() => {
        console.log("Reset app");
        reset(normalized, {
            keepDirty: true, // set true to keep user edits
            keepTouched: true, // set true to keep touched state
            keepErrors: true, // set true if you want to keep errors
        });
    }, [normalized, reset]);

    const handleValid = (data: AppSettingsOutput) => {
        console.log("Handle Valid");
        // data is already parsed (numbers). Your onSubmit expects AppSettingsDto (same shape).
        onSubmit(data as AppSettingsDto);
    };

    return (
        <Paper elevation={3} sx={{ p: 2, height: "fit-content" }}>
            <FormProvider {...methods}>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(handleValid)}
                    sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 1, mt: 1 }}
                >
                    <Typography variant="h6" sx={{ paddingBottom: 2 }}>
                        Application Settings
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: 2,
                        }}
                    >
                        {/* Names MUST match the schema keys */}
                        <CmpTextField name="level_set_point" label="Level Set Point" type="number" />
                        <CmpTextField name="level_offset" label="Level Offset" type="number" />
                        <CmpTextField name="system_count" label="System Count" type="number" />
                        <CmpTextField name="start_pump_delay" label="Start Pump Delay" type="number" />
                        <CmpTextField name="stop_pump_delay" label="Stop Pump Delay" type="number" />
                    </Box>
                    <Button type="submit" disabled={isSubmitting} sx={{ width: "fit-content", alignSelf: "end" }}>
                        {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </Box>
            </FormProvider>
        </Paper>
    );
}, areEqual);
