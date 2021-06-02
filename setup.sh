#!/bin/bash
source ./env.sh;

# if [ $dotnet -eq 1 ]; then
# 	dotnet new angular -o TwsWebsite;
# 	cd TwsWebsite/;
# 	cp -r . ../source;
# 	cd ..;
# 	rm -r -f TwsWebsite/;
# fi
#npm install -g @angular/cli@latest
ng new TwsWebsite --routing=false --style=scss;
#chown -R $USER Website
cd TwsWebsite;
cp -r . ../source/ClientApp;
cd ..;
rm -r -f TwsWebsite/
#cd $clientDir/src;

cd $appDir;
# if [ $dotnet -eq 1 ]; then
# 	rm -r -f counter;
# 	rm -r -f fetch-data/;
# 	rm -r -f home;
# 	rm -r -f nav-menu/;
# fi;
rm  app.*

# cd $appDir/shared;
	# if [ $link -eq 1 ]; then
	# 	moveToDir framework;
	# 	addHardDir $frameworkDir/shared/framework date-range
	# 	addHardDir $frameworkDir/shared/framework link-select
	# 	addHardDir $frameworkDir/shared/framework paginator
	# 	addHardDir $frameworkDir/shared/framework severity-picker
	# else
	# 	cp $frameworkDir/shared/framework .;
	# fi;
# cd $appDir;moveToDir services;
# 	if [ $link -eq 1 ]; then addHardDir $frameworkDir/services profile .; else cp $frameworkDir/services/profile .; fi;
# 	if [ $link -eq 1 ]; then addHardDir $frameworkDir/services error; else cp $frameworkDir/services/error .; fi;

# cd $appDir; moveToDir utilities;
# 	addHard $frameworkDir/utilities collections.ts;
# 	addHard $frameworkDir/utilities dateUtilities.ts;
# 	addHard $frameworkDir/utilities mathUtilities.ts;
# 	addHard $frameworkDir/utilities ProgressObservable.ts;
# 	addHard $frameworkDir/utilities protoUtilities.ts;
# 	addHard $frameworkDir/utilities settings.ts;
# 	addHard $frameworkDir/utilities stl.ts;

#moveToDir proto;

if [ $link -eq 1 ]; then
	cd $clientDir/src;
	addLink $baseDir/baseline/ClientApp/src main.ts;
	addLink $baseDir/baseline/ClientApp/src styles.scss;
	addLink $baseDir/baseline/ClientApp/src _app-theme.scss;
	cd app;
	addLink $baseDir/baseline/ClientApp/src/app app.component.html
	addLink $baseDir/baseline/ClientApp/src/app app.component.scss
	addLink $baseDir/baseline/ClientApp/src/app app.component.spec.ts
	addLink $baseDir/baseline/ClientApp/src/app app.component.ts
	addLink $baseDir/baseline/ClientApp/src/app app.module.ts
	#addLink $baseDir/baseline/ClientApp/src/app routes.ts
	#moveToDir proto; ln -s $baseDir/baseline/ClientApp/src/app/proto/* .;
	#cd shared/material-site/navbar; rm navbar.html; ln -s $baseDir/baseline/ClientApp/src/app/shared/material-site/navbar/navbar.html .
else
	cd $baseDir/baseline
	cp -r . ../source/
fi;
cd $baseDir
mv setup.sh TwsWebsite.sh

addLink ../WebFramework setup.sh
mv setup.sh WebFramework.sh
./WebFramework.sh

addLink ../MaterialSite setup.sh
mv setup.sh MaterialSite.sh
./MaterialSite.sh

cd $clientDir/projects/
rm -r -f jde-tws
ng generate library jde-tws

addLink ../WebBlockly blockly.sh;
./blockly.sh;

cd $baseDir
mv TwsWebsite.sh setup.sh

./proto.sh;
# ng build jde-framework;
# ng build jde-framework


# moveToDir assets;
# addHardDir $blocklyDir/src/lib/pages/viewer blocks;
# moveToDir proto;
# ln -s $blocklyProtoDir/blockly.proto .;
# npx pbjs -r blockly_root -t static-module -w es6 -o blockly.js blockly.proto;npx pbts -o blockly.d.ts blockly.js;
# rm blockly.proto

if [ $link -eq 1 ]; then
	cd $clientDir
#addLink $baseDir/baseline/ClientApp angular.json; TODO after libraries

npm install blockly --save
npm install google-closure-library --save
#npm install @types/long --save;
npm install highcharts --save;
npm install highcharts-angular --save
#npm install material-design-icons
#ng add @angular/material;

npm install

cd $clientApp
ng build jde-framework
ng build jde-material;
ng build jde-blockly;
ng build jde-tws;
