
export interface IErrorService
{
	error( message:string, error: any ):void;
	assert( condition:boolean ):void;
	warn( message: string ):void;
	info( message:string):void;
}
