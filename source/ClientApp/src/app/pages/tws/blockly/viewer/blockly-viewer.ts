import { OnDestroy, Component, AfterViewInit, Inject, ViewChild, OnInit, ElementRef } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { IProfile } from 'src/app/services/profile/IProfile';
import * as BlocklyNs from 'blockly';
import { BlocklyService } from 'src/app/services/blockly/blockly.service.js';
//import { filter, map, mergeMap, tap } from 'rxjs/operators';
import * as myBlockly2 from 'src/app/proto/blockly'; import Proto = myBlockly2.Jde.Blockly.Proto;
import { BlocklyTick, BlocklyOrder, ReadOnlyFieldVariable } from './blocks/custom-fields';
//import { inherits } from 'util';

declare var Blockly: any;

class Settings
{
	foo:string[]=[];
}
declare const toolboxXml:string;
declare let goog;

@Component({selector: 'blockly',styleUrls: ['blockly-viewer.scss'],templateUrl: './blockly-viewer.html'})
export class BlocklyViewerComponent implements OnInit, AfterViewInit, OnDestroy
{
	constructor( private activatedRoute: ActivatedRoute, private router: Router, private blockly: BlocklyService,  @Inject('IProfile') private profileService: IProfile )
	{}
	public ngOnInit()
	{
		console.log( "ngOnInit" );
		console.log( this.router.url );
		this.blockly.load( this.router.url.substring(this.router.url.lastIndexOf('/')+1) ).then( (x)=>
		{
			this.item = x;
			/******/
			goog.provide('CustomFields.Tick');
			let myField = new BlocklyTick();
			BlocklyNs.fieldRegistry.register( 'field_tick', myField );
			BlocklyNs.Blocks['field_tick'] =
			{
				init: function()
				{
				  this.appendDummyInput().appendField('field tick');
				  this.appendDummyInput().setAlign(BlocklyNs.ALIGN_CENTRE).appendField( new BlocklyTick(), 'Tick' );
				  this.setStyle('loop_blocks');
				  this.setCommentText('Demonstrates a Tick.');
				}
			};
			goog.provide('CustomFields.Order');
			let myField2 = new BlocklyOrder();
			BlocklyNs.fieldRegistry.register( 'field_order', myField2 );
			BlocklyNs.Blocks['field_order'] =
			{
				init: function()
				{
				  this.appendDummyInput().appendField('field order');
				  this.appendDummyInput().setAlign(BlocklyNs.ALIGN_CENTRE).appendField( new BlocklyTick(), 'Order' );
				  this.setStyle('loop_blocks');
				  this.setCommentText('Demonstrates a Order.');
				}
			};
			BlocklyNs.Blocks['variables_get_now'] =
			{
				init: function()
				{
				  this.appendDummyInput().appendField( new ReadOnlyFieldVariable( "now", null, ['DateTime'], 'DateTime'), "FIELD_NAME" );
				  this.setOutput( true, 'DateTime' );
				}
			};
			this.inject();
			let xx = ()=>
			{
			/*
			goog.provide('CustomFields.GenericField');
			//goog.require('BlocklyNs.Field');
			let field = goog.global["CustomFields"]["GenericField"];
			field = function(opt_value, opt_validator)
			{
				opt_value = this.doClassValidation_(opt_value);
				if (opt_value === null)
					opt_value = field.DEFAULT_VALUE;

				field.superClass_.constructor.call( this, opt_value, opt_validator );
			};
			goog.inherits(field, BlocklyNs.Field);
			field.fromJson = function(options)
			{
				var value = BlocklyNs.utils.replaceMessageReferences( options['value'] );
				return new field( value );
			};
			field.name_ = "field_generic";
			field.getText = function()
			{
				var text = this.value_.turtleName + ' wearing a ' + this.value_.hat;
				if( this.value_.hat == 'Stovepipe' || this.value_.hat == 'Propeller' )
					text += ' hat';
				return text;
			};
			//Blockly["Blocks"] = { field_generic: field };
			//let blocks = goog.global["Blockly"]["Blocks"];
			BlocklyNs.fieldRegistry.register( 'field_generic', field );//BlocklyNs.Blocks?
			//BlocklyNs.Blocks["field_generic"] = field;
			BlocklyNs.Blocks['field_generic'] =
			{
				init: function()
				{
				  this.appendDummyInput().appendField('simple turtle');
				  this.appendDummyInput().setAlign(BlocklyNs.ALIGN_CENTRE).appendField( new field(), 'TURTLE' );
				  this.setStyle('loop_blocks');
				  this.setCommentText('Demonstrates a turtle field with no validator.');
				}
			};
			//import( './blocks/custom-fields.js' )
*/			};
		}).catch( (x)=>console.error(x) );
	}
	public ngAfterViewInit()
	{
		console.log("ngAfterViewInit");
	}

	inject( recursive=false )
	{
		console.log( "inject" );
		const blocklyDiv = document.getElementById('blocklyDiv');
		if( !blocklyDiv && !recursive )
		{
			setTimeout( ()=>this.inject(true), 0 );
			return;
		}
		if( !BlocklyNs.registry.getObject( 'Theme', 'tws') )
		{
			BlocklyNs["Themes"].Tws = BlocklyNs.Theme.defineTheme('tws',
			{
				'base': BlocklyNs["Themes"].Classic,
				'componentStyles': { 'workspaceBackgroundColour': '#000000' },
				'startHats': true
			});
		}
		import( './blocks/default.js' ).then( ()=>
		{
			var toolbox = document.getElementById('toolbox');
			this.workspace = BlocklyNs.inject( blocklyDiv,
			{
				readOnly: false, media: 'media/', trashcan: true, move: { scrollbars: true, drag: true, wheel: true }, toolbox: toolboxXml, theme: BlocklyNs["Themes"].Tws
			} as BlocklyNs.BlocklyOptions );
			this.workspace.addChangeListener( this.onChange );
			if( this.item.xml )
			{
				var xml = BlocklyNs.Xml.textToDom( this.item.xml );
				BlocklyNs.Xml.domToWorkspace( xml, this.workspace );
			}
			let blocks = goog.global["Blockly"]["Blocks"];
		});
	}
	changeTimeout;
	onChange = (e:BlocklyNs.Events.CommentBase)=>
	{
		if( !e.recordUndo )
			return;
		if( this.changeTimeout )
			clearTimeout( this.changeTimeout );
		this.changeTimeout = setTimeout( ()=>
		{
			this.changeTimeout = undefined;
			var xml = BlocklyNs.Xml.workspaceToDom( this.workspace );
			let newXml = BlocklyNs.Xml.domToPrettyText( xml );
			if( newXml!=this.item.xml )
			{
				this.item.xml = newXml;
				this.blockly.save( this.item ).then( ()=>console.log("saved") ).catch( (e)=>console.log(e) );
			}
			//TODO save...
		}, 5000 );
	}
	ngOnDestroy(){}

	afterSettingsLoaded()
	{}

	get settings(){return this._settings || (this.settings=new Settings());} set settings(value){ this._settings = value;} private _settings:Settings;
	viewPromise:Promise<boolean>;
	workspace:BlocklyNs.WorkspaceSvg;
	item:Proto.IFunction;
	//xml:string;
	@ViewChild('blocklyDiv2') set blocklyDiv( x:ElementRef ){ console.log("blocklyDiv"); this._blocklyDiv = x; }; _blocklyDiv;
	//@ViewChild(RouterOutlet) public outlet: RouterOutlet;
	private static profileKey="BlocklyViewerComponent";
	//field:GnrcFld = new GnrcFld();
}
