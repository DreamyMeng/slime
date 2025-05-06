export class OfflineManager {
    static saveLeaveTime() {
        localStorage.setItem("lastLeaveTime", Date.now().toString());
    }

    static checkOfflineTime(): number {
        const last = parseInt(localStorage.getItem("lastLeaveTime")) || Date.now();
        const now = Date.now();
        const seconds = Math.floor((now - last) / 1000);
        return seconds;
    }
}