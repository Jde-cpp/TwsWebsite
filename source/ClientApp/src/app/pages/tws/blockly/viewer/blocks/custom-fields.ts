import * as BlocklyNs from 'blockly';
"use strict";

export class BlocklyTick extends BlocklyNs.Field
{
	constructor( opt_value=null, opt_validator=null )
	{
		super( opt_value, opt_validator );
		opt_value = this["doClassValidation_"]( opt_value );
		console.log( "Tick.constructor" );
	}
	init = ()=>
	{
		console.log( "Tick.init" );
		super.init();
	}
	fromJson = (options)=>
	{
		console.log( "Tick.fromJson" );
		const value = BlocklyNs.utils.replaceMessageReferences( options['value'] );
		return new BlocklyTick( value );
	};

	getText = function()
	{
		console.log( "Tick.getText" );
		return "Tick.getText";
	};
}

export class BlocklyOrder extends BlocklyNs.Field
{
	constructor( opt_value=null, opt_validator=null )
	{
		super( opt_value, opt_validator );
		opt_value = this["doClassValidation_"]( opt_value );
		console.log( "Order.constructor" );
	}
	init = ()=>
	{
		console.log( "Order.init" );
		super.init();
	}
	fromJson = (options)=>
	{
		console.log( "Order.fromJson" );
		const value = BlocklyNs.utils.replaceMessageReferences( options['value'] );
		return new BlocklyOrder( value );
	};

	getText = function()
	{
		console.log( "Order.getText" );
		return "Order.getText";
	};
}

export class DateTimeReadOnly extends BlocklyNs.Field
{
	constructor( opt_value=null, opt_validator=null )
	{
		super( opt_value, opt_validator );
		opt_value = this["doClassValidation_"]( opt_value );
		console.log( "DateTimeReadOnly.constructor" );
	}
	init = ()=>
	{
		console.log( "DateTimeReadOnly.init" );
		super.init();
	}
	fromJson = (options)=>
	{
		console.log( "DateTimeReadOnly.fromJson" );
		const value = BlocklyNs.utils.replaceMessageReferences( options['value'] );
		return new DateTimeReadOnly( value );
	};

	getText = function()
	{
		console.log( "DateTimeReadOnly.getText" );
		return "DateTimeReadOnly.getText";
	};
}

export class ReadOnlyFieldVariable extends BlocklyNs.FieldVariable
{
	constructor(varName: string, opt_validator?: Function, opt_variableTypes?: string[], opt_defaultType?: string, opt_config?: Object)
	{
		super( varName, opt_validator, opt_variableTypes, opt_defaultType, opt_config );
		super.menuGenerator_ = this.dropdownCreate;
		console.log( "ReadOnlyFieldVariable.constructor" );
	}
	dropdownCreate():any[][]
	{
		let options:any[][] = [ ["none","none"] ];
		try
		{
			options = BlocklyNs.FieldVariable.dropdownCreate.call( this );
			const i = options.findIndex( (x)=>x[0]==Blockly.Msg['RENAME_VARIABLE'] );
			if( i!=-1 )
				options.splice( i, 1 );
		}
		catch
		{}
		return options;
	}
}

