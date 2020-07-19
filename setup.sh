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

moveToDir styles;
if [ $link -eq 1 ]; then ln -s $materialDir/styles/* .; else cp -s $materialDir/styles/* .; fi;
cd ../assets
if [ $link -eq 1 ]; then ln -s $materialDir/assets/* .; else cp -s $materialDir/assets/* .; fi;
cd $appDir;
if [ $dotnet -eq 1 ]; then
	rm -r -f counter;
	rm -r -f fetch-data/;
	rm -r -f home;
	rm -r -f nav-menu/;
fi;
rm  app.*

moveToDir pages;
if [ $link -eq 1 ]; then ln -s $materialDir/lib/pages/material-site .; else cp $materialDir/lib/pages/material-site .; fi;
cd ..;moveToDir shared;
	if [ $link -eq 1 ]; then
		moveToDir material-site;
		ln -s $materialDir/lib/shared/material-site/documentation-items .;
		ln -s $materialDir/lib/shared/material-site/footer .;
		ln -s $materialDir/lib/shared/material-site/navigation-focus .;
		ln -s $materialDir/lib/shared/material-site/style-manager .;
		ln -s $materialDir/lib/shared/material-site/svg-viewer .;
		ln -s $materialDir/lib/shared/material-site/theme-picker .;
		ln -s $materialDir/lib/shared/material-site/version .;
		moveToDir navbar;
		ln -s $materialDir/lib/shared/material-site/navbar/* .;
	else
		cp $materialDir/lib/shared/material-site .;
	fi;
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
	cd app;
	ln -s $baseDir/baseline/ClientApp/src/app/app.* .
	ln -s $baseDir/baseline/ClientApp/src/app/routes.ts .
	#moveToDir proto; ln -s $baseDir/baseline/ClientApp/src/app/proto/* .;
	cd shared/material-site/navbar; rm navbar.html; ln -s $baseDir/baseline/ClientApp/src/app/shared/material-site/navbar/navbar.html .
else
	cd $baseDir/baseline
	cp -r . ../source/
fi;
npm install protobufjs --save;
source ./proto.sh;

npm install @types/long --save;
npm install highcharts --save;
npm install highcharts-angular
ng add @angular/material;

npm install
