export class AppErrors extends Error{
    constructor(message:string, public statusCode:number){
        super(message);
        this.name = "AppError";
        // Esto asegura que mantengamos el Stack Trace nativo de V8/Node.js
        Object.setPrototypeOf(this, new.target.prototype);
    }
}