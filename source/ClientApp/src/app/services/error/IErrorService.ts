
export abstract class IErrorService
{
	abstract error( message:string, error?: any ):void;
	abstract assert( condition:boolean ):void;
	abstract warn( message: string ):void;
	abstract info( message:string):void;
}

export class ErrorService implements IErrorService
{
	error( message:string, error: any ):void{}
	assert( condition:boolean ):void{}
	warn( message: string ):void{}
	info( message:string):void{}
}