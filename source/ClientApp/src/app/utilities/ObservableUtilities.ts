import { Observable } from 'rxjs';

export class ObservableUtilities
{
	static toPromise<T>( fnctn:()=>Observable<T>, expectNull:boolean=true, expectSingle:boolean=true ):Promise<T>
	{
		return new Promise<T>( (resolve,reject)=>
		{
			let results = new Array<T>();
			fnctn().subscribe(
			{
				next: value=>{ results.push(value); },
				complete: ()=>
				{
					if( results.length==0 )
					{
						if( expectNull )
							resolve( null );
						else
							reject( {results: null, error:"no results returned."} );
					}
					if( expectSingle && results.length==1 )
						resolve( results[0] );
					else
						reject( {results: results, error:null} );
				},
				error: e=>{ reject( {results: results, error:e} ); }
			});
		});
	}
}