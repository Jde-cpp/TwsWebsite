#!/bin/bash
dotnet=${1:-0}
link=${2:-1}
#from TwsWebsite
baseDir=`pwd`;
clientDir=$baseDir/source/ClientApp;
appDir=$clientDir/src/app;
materialDir=$(dirname $(readlink -e $baseDir/../MaterialSite/source/projects/material-site/src))/src;
frameworkDir=$(dirname $(readlink -e $baseDir/../WebFramework/source/ClientApp/src/app))/app;
marketProtoDir=$(dirname $(readlink -e $baseDir/../../MarketLibrary/source/types/proto))/proto;

source $baseDir/../WebFramework/common.sh

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
		addHardDir $frameworkDir/shared/framework paginator
		addHardDir $frameworkDir/shared/framework severity-picker
	else
		cp $frameworkDir/shared/framework .;
	fi;
cd $appDir;moveToDir services;
	if [ $link -eq 1 ]; then addHardDir $frameworkDir/services profile .; else cp $frameworkDir/services/profile .; fi;
	if [ $link -eq 1 ]; then addHardDir $frameworkDir/services error; else cp $frameworkDir/services/error .; fi;

cd $appDir; moveToDir utilities;
	addHard $frameworkDir/utilities dateUtilities.ts;
	addHard $frameworkDir/utilities protoUtilities.ts;


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
cd $clientDir
	ln -s $marketProtoDir/ib.proto .;
	ln -s $marketProtoDir/requests.proto .;
	ln -s $marketProtoDir/results.proto .;
	npx pbjs -r ib_root -t static-module -w es6 -o src/app/proto/ib.js ib.proto & npx pbts -o src/app/proto/ib.d.ts src/app/proto/ib.js
	npx pbjs -r ib_root -t static-module -w es6 -o src/app/proto/ib.js ib.proto & npx pbts -o src/app/proto/ib.d.ts src/app/proto/ib.js
	npx pbjs -r request_root -t static-module -w es6 -o src/app/proto/requests.js requests.proto & npx pbts -o src/app/proto/requests.d.ts src/app/proto/requests.js;
	npx pbjs -r request_root -t static-module -w es6 -o src/app/proto/requests.js requests.proto & npx pbts -o src/app/proto/requests.d.ts src/app/proto/requests.js;
	npx pbjs -r result_root -t static-module -w es6 -o src/app/proto/results.js results.proto & npx pbts -o src/app/proto/results.d.ts src/app/proto/results.js;
	npx pbjs -r result_root -t static-module -w es6 -o src/app/proto/results.js results.proto & npx pbts -o src/app/proto/results.d.ts src/app/proto/results.js;
	rm ib.proto;
	rm requests.proto;
	rm results.proto;



npm install @types/long --save;
npm install protobufjs --save;
npm install highcharts --save;
ng add @angular/material;

npm install
