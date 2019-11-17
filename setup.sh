#!/bin/bash
dotnet=${1:-0}
link=${2:-1}

baseDir=`pwd`;
clientDir=$baseDir/source/ClientApp;
appDir=$clientDir/src/app;
materialDir=$(dirname $(readlink -e $baseDir/../MaterialSite/source/projects/material-site/src))/src;
frameworkDir=$(dirname $(readlink -e $baseDir/../WebFramework/source/ClientApp/src/app))/app;

source $frameworkDir/../../../common.sh

if [ $dotnet -eq 1 ]; then
	dotnet new angular -o TwsWebsite;
	cd TwsWebsite/;
	cp -r . ../source;
	cd ..;
	rm -r -f TwsWebsite/;
fi
ng new TwsWebsite --routing=false --style=scss;
#chown -R $USER Website
cd TwsWebsite;
cp -r . ../source/ClientApp;
cd ..;
rm -r -f TwsWebsite/
cd $clientDir/src/assets;

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
cd ..;moveToDir services;
if [ $link -eq 1 ]; then ln -s $frameworkDir/services/profile .; else cp $frameworkDir/services/profile .; fi;

if [ $link -eq 1 ]; then 
	cd $clientDir
	addLink $baseDir/baseline/ClientApp angular.json;
	cd src;
	addLink $baseDir/baseline/ClientApp/src main.ts;
	cd app;
	ln -s $baseDir/baseline/ClientApp/src/app/app.* .
	ln -s $baseDir/baseline/ClientApp/src/app/routes.ts .
	moveToDir proto; ln -s $baseDir/baseline/ClientApp/src/app/proto/* .;
	cd ../shared/materia-site/navbar; rm navbar.html; ln -s $baseDir/baseline/ClientApp/src/app/shared/material-site/navbar/navbar.html .
else
	cd $baseDir/baseline
	cp -r . ../source/
fi;
cd $clientDir
npm install @types/long --save;
npm install protobufjs --save;
ng add @angular/material;

npm install
