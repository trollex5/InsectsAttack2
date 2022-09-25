class Utils {


    static serialize(data, object) {
        if(!data) {
            return;
        }

        Object.keys(data).forEach((key) => {
            if(Object.hasOwnProperty(key) && data[key] != undefined) {
                object[key] = data[key];
            }
        });
    }

    static deepClone(obj: any): any {
        if(!obj) {
            return obj;
        }

        const clone = JSON.parse(JSON.stringify(obj));
        return clone;
    }

    static getRandomElement(arr: any[]): any {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}

export default Utils;