// Function to pad numbers with leading zeros
const padWithTwoDigits = (num: number) => num.toString().padStart(2, "0");

// Check if the input is negative
export const formatDuration = (seconds: number) => {
    // Check if the input is negative
    const isNegative = seconds < 0;

    // If negative, convert to positive for calculation
    if (isNegative) {
        seconds = Math.abs(seconds);
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Format the output, adding a '-' if the input was negative
    return `${isNegative ? '-' : ''}${hours}:${padWithTwoDigits(minutes)}:${padWithTwoDigits(remainingSeconds)}`;
};