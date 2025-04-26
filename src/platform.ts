declare global {
    interface Window {
        Android: any;
        changeData: (data: any) => void;
    }
}

export function loaded() {
    if (isAndroid()) {
        window.Android.loaded();
    }
}

export function isAndroid() {
    return typeof window.Android !== 'undefined';
}
