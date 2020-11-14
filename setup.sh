#!/bin/bash
source ./env.sh;

if [ $dotnet -eq 1 ]; then
	dotnet new angular -o TwsWebsite;
	cd TwsWebsite/;
	cp -r . ../source;
	cd ..;
	rm -r -f TwsWebsite/;
fi
#npm i -g @angular/cli@latest
ng new TwsWebsite --routing=false --style=scss;
#chown -R $USER Website
cd TwsWebsite;
cp -r . ../source/ClientApp;
cd ..;
rm -r -f TwsWebsite/
cd $clientDir/src;

cd $appDir;
if [ $dotnet -eq 1 ]; then
	rm -r -f counter;
	rm -r -f fetch-data/;
	rm -r -f home;
	rm -r -f nav-menu/;
fi;
rm  app.*

cd $appDir/shared;
	if [ $link -eq 1 ]; then
		moveToDir framework;
		addHardDir $frameworkDir/shared/framework date-range
		addHardDir $frameworkDir/shared/framework link-select
		addHardDir $frameworkDir/shared/framework paginator
		addHardDir $frameworkDir/shared/framework severity-picker
	else
		cp $frameworkDir/shared/framework .;
	fi;
cd $appDir;moveToDir services;
	if [ $link -eq 1 ]; then addHardDir $frameworkDir/services profile .; else cp $frameworkDir/services/profile .; fi;
	if [ $link -eq 1 ]; then addHardDir $frameworkDir/services error; else cp $frameworkDir/services/error .; fi;

cd $appDir; moveToDir utilities;
	addHard $frameworkDir/utilities collections.ts;
	addHard $frameworkDir/utilities dateUtilities.ts;
	addHard $frameworkDir/utilities mathUtilities.ts;
	addHard $frameworkDir/utilities ProgressObservable.ts;
	addHard $frameworkDir/utilities protoUtilities.ts;
	addHard $frameworkDir/utilities settings.ts;
	addHard $frameworkDir/utilities stl.ts;

cd $appDir; moveToDir proto;

if [ $link -eq 1 ]; then
	cd $clientDir
	addLink $baseDir/baseline/ClientApp angular.json;
	cd src;
	addLink $baseDir/baseline/ClientApp/src main.ts;
	addLink $baseDir/baseline/ClientApp/src styles.scss;
	addLink $baseDir/baseline/ClientApp/src _app-theme.scss;
	cd app;
	ln -s $baseDir/baseline/ClientApp/src/app/app.* .
	ln -s $baseDir/baseline/ClientApp/src/app/routes.ts .
	#moveToDir proto; ln -s $baseDir/baseline/ClientApp/src/app/proto/* .;
	cd shared/material-site/navbar; rm navbar.html; ln -s $baseDir/baseline/ClientApp/src/app/shared/material-site/navbar/navbar.html .
else
	cd $baseDir/baseline
	cp -r . ../source/
fi;
./material.sh
npm install protobufjs --save;
./proto.sh;

npm install @types/long --save;
npm install highcharts --save;
npm install highcharts-angular
ng add @angular/material;

npm install
