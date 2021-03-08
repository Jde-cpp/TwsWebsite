
export class StringUtils
{
	static capitalize( value:string )//https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
	{
		return value.charAt(0).toUpperCase()+value.slice(1);
	}
}