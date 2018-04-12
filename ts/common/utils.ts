export class utils {
    public static createGuid = () : string => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    public static randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1));
     }

     public static indexesOfMax(arr) : Array<number> {
        let maxIndexes = new Array<number>();
        if (arr.length === 0) {
            return maxIndexes;
        }
        let max = arr[0];
        maxIndexes = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > max && arr[i] >0) {
                maxIndexes = [i];
                max = arr[i];
            }
            else if(arr[i] == max && arr[i] > 0){
                maxIndexes.push(i);
            }
        }
        return maxIndexes;
    }
}