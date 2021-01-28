//import * as um2 from 'src/app/proto/UserManagement'; import UM = um2.Jde.UM;

export interface IGraphQL
{
	Query<T>( query:string ):Promise<T[]>;
	Mutate( query:string ):Promise<number>;
}
/*export interface IRest<T>
{
	Get():Promise<T[]>;
	GetKey( key:string ):Promise<T>;
	GetId( id:number ):Promise<T>;
	Put( T ):Promise<number>;
	Patch( T ):Promise<void>;
	Delete( T ):Promise<void>;
}
export interface IUserManagement
{
	UserRest:IRest<UM.IUser>;
	GroupRest:IRest<UM.IGroup>;
	RoleRest:IRest<UM.IGroup>;
}*/