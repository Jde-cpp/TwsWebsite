import { TestBed, async } from '@angular/core/testing';
import { TwsService } from './tws.service';

import {IErrorService,ErrorService} from '../error/IErrorService'
import * as ib2 from '../../proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbWatch from '../../proto/watch';
import Watch = IbWatch.Jde.Markets.Proto.Watch;

describe('TwsServiceTest', () =>
{
	//beforeEach(async(() => { TestBed.configureTestingModule( {declarations: [TwsService]} ).compileComponents(); }));
	let service: TwsService;
	let cnsl:IErrorService;

	beforeEach(() =>
	{
		console.log( 'beforeEach' );
		//const cnsl2:IErrorService =  new ErrorService();

		TestBed.configureTestingModule({
		  // Provide both the service-to-test and its (spy) dependency
		  //providers: [TwsService, { provide:IErrorService, useValue: cnsl2 } ]
		});
		// Inject both the service-to-test and its (spy) dependency
		service = TestBed.inject(TwsService);
		//cnsl = TestBed.inject<IErrorService>( ErrorService );
	});
	it('should create the service', () =>
	{
    	expect(service).toBeTruthy();
  	});

	it('should create the watch list', () =>
	{
		const tws = TestBed.createComponent( TwsService ).componentInstance;
		let file = new Watch.File();
		file.name = "test";
		file.currencies.push( {currency: IB.Currencies.UsDollar, amount: 50} );
		file.securities.push( {contractId: 756733} );
		file.securities.push( {contractId: 320227571} );
		file.securities.push( null );
		file.securities.push( {contractId: 76792991} );

		tws.editWatch( file ).then( (value)=>{ expect(value).toBeTruthy() } ).catch( (e)=>fail(e) );
	});
});
