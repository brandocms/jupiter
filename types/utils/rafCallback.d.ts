export default function rafCallback(callback: any, fps?: number): {
    (...latest: any[]): void;
    cancel(): void;
};
