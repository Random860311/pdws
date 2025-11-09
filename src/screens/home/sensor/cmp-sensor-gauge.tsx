import { Box } from "@mui/material";
import React from "react";
import { SensorDto } from "src/api/dto";
import { ValueLabel, VerticalFillGauge } from "src/components";

export interface SensorGaugeProps {
    sensor: SensorDto;
}

export const CmpGaugeSensor: React.FC<SensorGaugeProps> = ({ sensor }) => {
    const showStartHH = (sensor?.alarm_start_high_high ?? 0) > 0;
    const showStopHH = (sensor?.alarm_stop_high_high ?? 0) > 0;
    const showStartH = (sensor?.alarm_start_high ?? 0) > 0;
    const showStopH = (sensor?.alarm_stop_high ?? 0) > 0;
    const showStartLL = (sensor?.alarm_start_low_low ?? 0) > 0;
    const showStopLL = (sensor?.alarm_stop_low_low ?? 0) > 0;
    const showStartL = (sensor?.alarm_start_low ?? 0) > 0;
    const showStopL = (sensor?.alarm_stop_low ?? 0) > 0;

    const paramsRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState(220);

    React.useLayoutEffect(() => {
        const element = paramsRef.current;
        if (!element) return;
        const ro = new ResizeObserver(([e]) => setHeight(e.contentRect.height));
        ro.observe(element);
        setHeight(element.clientHeight);

        return () => ro.disconnect();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                height: "fit-content",
            }}
        >
            <VerticalFillGauge value={sensor.value_scaled} max={sensor.value_scaled_max} min={sensor.value_scaled_min} height={height} />
            <Box
                ref={paramsRef}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    height: "fit-content",
                }}
            >
                <ValueLabel label="Max" value={String(sensor.value_scaled_max) + " psi"} />
                {showStartHH && (
                    <ValueLabel label="Start HH" value={String(sensor.alarm_start_high_high) + " psi"} color={sensor.is_high_high_active ? "red" : undefined} />
                )}
                {showStopHH && <ValueLabel label="Stop HH" value={String(sensor.alarm_stop_high_high) + " psi"} />}
                {showStartH && <ValueLabel label="Start H" value={String(sensor.alarm_start_high) + " psi"} color={sensor.is_high_active ? "red" : undefined} />}
                {showStopH && <ValueLabel label="Stop H" value={String(sensor.alarm_stop_high) + " psi"} />}
                {showStopL && <ValueLabel label="Stop L" value={String(sensor.alarm_stop_low) + " psi"} />}
                {showStartL && <ValueLabel label="Start L" value={String(sensor.alarm_start_low) + " psi"} color={sensor.is_low_active ? "red" : undefined} />}
                {showStopLL && <ValueLabel label="Stop LL" value={String(sensor.alarm_stop_low_low) + " psi"} />}
                {showStartLL && <ValueLabel label="Start LL" value={String(sensor.alarm_start_low_low) + " psi"} color={sensor.is_low_low_active ? "red" : undefined} />}
                <ValueLabel label="Min" value={String(sensor.value_scaled_min) + " psi"} />
            </Box>
        </Box>
    );
};
