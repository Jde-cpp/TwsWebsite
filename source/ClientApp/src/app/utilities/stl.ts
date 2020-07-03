

export class std
{
	static accumulate( input: number[], initial:number, fnctn: (sum:number,element:number) => number ):number
	{
		let acc:number = initial;
		for (const element of input)
			acc = fnctn( acc, element );

		return acc
	}
}