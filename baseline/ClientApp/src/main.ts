import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as protobuf from 'protobufjs/minimal';
import * as Long from 'long';

if (environment.production)
{
  enableProdMode();
}

protobuf.util.Long = Long;
protobuf.configure();

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
