export const formatDuration = (seconds: number) => {
    const pad = (num: number) => num.toString().padStart(2, "0");

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${pad(minutes)}:${pad(remainingSeconds)}`;
};