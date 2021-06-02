import { Observable } from 'rxjs';

export class ObservableUtilities
{
	// @dynamic
	static toPromise<T>( fnctn:()=>Observable<T>, expectEmpty=false ):Promise<T[]>
	{
		return new Promise<T[]>( (resolve,reject)=>
		{
			let results = new Array<T>();
			fnctn().subscribe(
			{
				next: value=>{ results.push(value); },
				complete: ()=>{ if( !results.length && !expectEmpty) reject( {results: results, error:"no results"} ); else resolve(results); },
				error: e=>{ reject( {results: results, error:e} ); }
			});
		});
	}
	static toPromiseSingle<T>( fnctn:()=>Observable<T>, expectNull:boolean=true ):Promise<T>
	{
		return new Promise<T>( (resolve,reject)=>
		{
			this.toPromise( fnctn, expectNull ).then( (results)=>
			{
				if( results.length==1 )
					resolve( results[0] );
				else
					reject( {results: results, error:null} );
			}).catch( (e)=>reject(e) );
		});
	}
}