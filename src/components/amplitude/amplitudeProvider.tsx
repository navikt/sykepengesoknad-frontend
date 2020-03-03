import React from "react";
import { useAmplitudeInstance } from "./amplitude";

interface AmplitudeProps {
    children: React.ReactNode;
}

export const Amplitude = (props: AmplitudeProps) => {
    return (
        <useAmplitudeInstance.Provider>
            { props.children }
        </useAmplitudeInstance.Provider>
    )
};
