

export default class IoError {

    private message: string;
    private type: string;
    private statusCode: number | null;

    constructor(message: string, type: string, statusCode: number | null){
        this.message = message;
        this.type = type;
        this.statusCode = statusCode;
     
    }
    

    public getMessage(): string {
        return this.message;
    }

    public setMessage(message: string): void {
        this.message = message;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getStatusCode(): number | null {
        return this.statusCode;
    }

}