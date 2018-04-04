import {fs} from "file-system";

export class fileUtils{
    public static saveStringToFile = (filePath : string, fileContent : string) : void => {
        fs.writeFileSync(filePath, fileContent, (err) => {
            if (err) {
                console.error(err);
                throw err;
            };
        });
    }

    public static saveObjectToFile = (filePath : string, object : any) : void => {
        fs.writeFileSync(filePath, JSON.stringify(object, null, 4), (err) => {
            if (err) {
                console.error("error in writeFileSync: " + err);
                throw err;
            };
        });
    }

    public static loadObjectFromFile = (filePath : string) : any => {
        let obj;
        let data = fs.readFileSync(filePath);
        obj = JSON.parse(data);
        return obj;
    }

    public static loadTextFromFile = (filePath : string) : string => {
        let fileText : string;
        let binary;
        // Read the file, and pass it to your callback
        fileText = fs.readFileSync(filePath, 'utf8');
        return fileText;
    }

    public static deleteFile = (filePath : string) : void => {
        fs.unlinkSync(filePath, (err) => {
            if (err) {
                console.error(err);
                throw err;
            };
        });
    }
}