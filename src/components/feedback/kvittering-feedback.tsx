import React, { useState } from "react";

type ButtonState = "inactive" | "active";

interface FeedbackButtonProps {
    emoji: string;
    isActive: ButtonState;
    onClick: () => void;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ emoji, isActive, onClick }) => (
    <button disabled={isActive === "inactive"} onClick={onClick}>
        {emoji}
    </button>
);

export const KvitteringFeedback: React.FC = () => {
    const [activeButton, setActiveButton] = useState<number | null>(null);
    const [feedbackText, setFeedbackText] = useState("");

    const handleButtonClick = (index: number) => {
        setActiveButton(index);
    };

    const emojis = ["😠", "😡", "😐", "😊", "😁"];

    return (
        <div>
            {emojis.map((emoji, index) => (
                <FeedbackButton
                    key={index}
                    emoji={emoji}
                    isActive={activeButton === index ? "active" : "inactive"}
                    onClick={() => handleButtonClick(index)}
                />
            ))}
            {activeButton !== null && (
                <div>
                    <textarea
                        value={feedbackText}
                        onChange={e => setFeedbackText(e.target.value)}
                        placeholder="Legg til ytterligere kommentarer her..."
                    />
                    <button onClick={() => {/*Handle form submission here*/}}>Send inn</button>
                </div>
            )}
        </div>
    );
};

