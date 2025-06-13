export class AdMgr {
    static data: adData;
    static max = 10;

    static Load() {
        let data = Laya.LocalStorage.getItem("ad");
        if (data) {
            this.data = JSON.parse(data);
            let now = Date.now();
            let timeDifference = now - this.data.time; // 获取时间差，单位是毫秒

            // 将毫秒转换为天数
            // 1秒 = 1000毫秒
            // 1分钟 = 60秒
            // 1小时 = 60分钟
            // 1天 = 24小时
            const millisecondsPerDay = 1000 * 60 * 60 * 24;
            let days = Math.floor(timeDifference / millisecondsPerDay); // 向下取整，确保只有完整的天数才算作一天

            if (days > 0) {
                this.data.time = now;
                this.data.count = 10;
                this.Save();
            }
        } else {
            this.data = {
                time: Date.now(),
                count: 10
            };
            this.Save();
        }
    }

    static Save() {
        const jsonData = JSON.stringify(this.data);
        Laya.LocalStorage.setItem("ad", jsonData);
    }
}

interface adData {
    time: number,
    count: number
}