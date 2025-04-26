declare global {
    interface Window {
        Android: any;
        changeData: (data: any) => void;
    }
}

export function isAndroid() {
    return typeof window.Android !== 'undefined';
}
