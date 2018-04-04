export class dateTimeUtil{

    public static getCurrentDateTime = () : string => {
        let date = new Date(Date.now());
        console.log(date);
        return dateTimeUtil.toStringLocal(date);
    }

    public static toStringLocal(date : Date) : string {
        function z(n){return (n<10?'0':'') + n}
        return date.getFullYear() + '-' + z(date.getMonth()+1) + '-' +
               z(date.getDate()) + 'T' + z(date.getHours()) + '.' +
               z(date.getMinutes());
                
      }
}