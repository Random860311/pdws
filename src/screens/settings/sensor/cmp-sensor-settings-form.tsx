import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import equal from "fast-deep-equal";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SensorConfigDto } from "src/api";
import { CmpSwitchField, CmpTextField } from "src/components/form";
import { z } from "zod";

const SensorSettingsSchema = z
    .object({
        value_scaled_max: z.coerce.number().min(0, "Must be ≥ 0"),
        value_scaled_min: z.coerce.number().default(0),
        ai_max: z.coerce.number().int().min(1, "Must be ≥ 0"),
        ai_min: z.coerce.number().int().min(0, "Must be ≥ 0").default(0),
        need_alarm_reset: z.coerce.boolean().default(false),
        alarm_start_delay: z.coerce.number().int().min(0, "Must be ≥ 0").default(0),
        alarm_stop_delay: z.coerce.number().int().min(0, "Must be ≥ 0").default(0),
        alarm_start_high: z.coerce.number().min(0, "Must be ≥ 0").default(0),
        alarm_stop_high: z.coerce.number().min(0, "Must be ≥ 0").default(0),
        alarm_start_high_high: z.coerce.number().min(0, "Must be ≥ 0").default(0),
        alarm_stop_high_high: z.coerce.number().min(0, "Must be ≥ 0").default(0),
        alarm_start_low: z.coerce.number().min(0, "Must be ≥ 0").default(0),
        alarm_stop_low: z.coerce.number().min(0, "Must be ≥ 0").default(0),
        alarm_start_low_low: z.coerce.number().default(0),
        alarm_stop_low_low: z.coerce.number().default(0),
        is_high_high_critical: z.coerce.boolean().default(false),
        is_low_low_critical: z.coerce.boolean().default(false),
        adjustment: z.coerce.number().default(0),
    })
    .loose();

type SensorSettingsInput = z.input<typeof SensorSettingsSchema>;
type SensorSettingsOutput = z.output<typeof SensorSettingsSchema>;

export interface SensorSettingsProps {
    title: string;
    defaultValues?: SensorConfigDto;
    onSubmit: (v: SensorConfigDto) => void;
}

function normalizeSettings(dto?: Partial<SensorConfigDto>): SensorSettingsInput {
    return {
        device_id: dto?.device_id,
        device_name: dto?.device_name,
        has_critical_alarm: dto?.has_critical_alarm,
        has_alarm: dto?.has_alarm,
        value_scaled_max: dto?.value_scaled_max ?? "",
        value_scaled_min: dto?.value_scaled_min ?? "",
        ai_max: dto?.ai_max ?? "",
        ai_min: dto?.ai_min ?? "",
        need_alarm_reset: dto?.need_alarm_reset ?? false,
        alarm_start_delay: dto?.alarm_start_delay ?? "",
        alarm_stop_delay: dto?.alarm_stop_delay ?? "",
        alarm_start_high: dto?.alarm_start_high ?? "",
        alarm_stop_high: dto?.alarm_stop_high ?? "",
        alarm_start_high_high: dto?.alarm_start_high_high ?? "",
        alarm_stop_high_high: dto?.alarm_stop_high_high ?? "",
        alarm_start_low: dto?.alarm_start_low ?? "",
        alarm_stop_low: dto?.alarm_stop_low ?? "",
        alarm_start_low_low: dto?.alarm_start_low_low ?? "",
        alarm_stop_low_low: dto?.alarm_stop_low_low ?? "",
        is_high_high_critical: dto?.is_high_high_critical ?? false,
        is_low_low_critical: dto?.is_low_low_critical ?? false,
        adjustment: dto?.adjustment ?? "",
    };
}

const areEqual = (prev: SensorSettingsProps, next: SensorSettingsProps) => equal(normalizeSettings(prev.defaultValues), normalizeSettings(next.defaultValues));

export const CmpSensorSettingsForm = React.memo(function CmpAppSettingsForm({ title, defaultValues, onSubmit }: SensorSettingsProps) {
    const normalized = React.useMemo(() => normalizeSettings(defaultValues), [defaultValues]);

    const resolver = zodResolver(SensorSettingsSchema);
    const methods = useForm<SensorSettingsInput, any, SensorSettingsOutput>({
        resolver: resolver,
        defaultValues: normalized as SensorSettingsInput,
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;

    React.useEffect(() => {
        console.log("Reset sensor");
        reset(normalized, {
            keepDirtyValues: true,
            keepDirty: true,
            keepTouched: true,
            keepErrors: true,
        });
    }, [normalized, reset]);

    const handleValid = (data: SensorSettingsOutput) => {
        onSubmit({ ...defaultValues, ...data } as SensorConfigDto);
    };

    return (
        <Paper elevation={3} sx={{ p: 2, height: "fit-content" }}>
            <FormProvider {...methods}>
                <Box
                    sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 1 }}
                    component="form"
                    onSubmit={handleSubmit(handleValid)}
                    noValidate
                >
                    <Typography variant="h6" sx={{ paddingBottom: 2 }}>
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: 2,
                        }}
                    >
                        <CmpTextField name="value_scaled_max" label="Max value" type="number" />
                        <CmpTextField name="value_scaled_min" label="Min value" type="number" />
                        <CmpTextField name="ai_max" label="AI max value" type="number" />
                        <CmpTextField name="ai_min" label="AI min value" type="number" />
                        <CmpTextField name="alarm_start_delay" label="Alarm start delay" type="number" />
                        <CmpTextField name="alarm_stop_delay" label="Alarm stop delay" type="number" />
                        <CmpTextField name="alarm_start_high" label="Start High" type="number" />
                        <CmpTextField name="alarm_stop_high" label="Stop High" type="number" />
                        <CmpTextField name="alarm_start_high_high" label="Start High High" type="number" />
                        <CmpTextField name="alarm_stop_high_high" label="Stop High High" type="number" />
                        <CmpTextField name="alarm_start_low" label="Start Low" type="number" />
                        <CmpTextField name="alarm_stop_low" label="Stop Low" type="number" />
                        <CmpTextField name="alarm_start_low_low" label="Start Low Low" type="number" />
                        <CmpTextField name="alarm_stop_low_low" label="Stop Low Low" type="number" />
                        <CmpTextField name="adjustment" label="Adjustment" type="number" />
                        <CmpSwitchField name="need_alarm_reset" label="Need reset" />
                        <CmpSwitchField name="is_high_high_critical" label="Is HH critical" />
                        <CmpSwitchField name="is_low_low_critical" label="Is LL critical" />
                    </Box>
                    <Button type="submit" disabled={isSubmitting} sx={{ width: "fit-content", alignSelf: "end" }}>
                        {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </Box>
            </FormProvider>
        </Paper>
    );
}, areEqual);
