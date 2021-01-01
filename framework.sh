#!/bin/bash
#baseDir=`pwd`;
#clientDir=$baseDir/source/ClientApp;

#source common.sh
cd $clientDir;
ng generate library jde-framework;
cd projects/jde-framework;
addHard $frameworkDir package.json
cd src
rm public-api.ts;
addHard $frameworkDir/src projects.ts;
cd lib;
rm *;
addHard $frameworkDir/src/lib jde-framework.module.ts;
moveToDir services;
addHardDir $frameworkDir/src/lib/services/ error;
addHardDir $frameworkDir/src/lib/services/ profile;
cd ..;
moveToDir shared;
addHardDir $frameworkDir/src/lib/shared/ date-range;
addHardDir $frameworkDir/src/lib/shared/ link-select;
addHardDir $frameworkDir/src/lib/shared/ paginator;
addHardDir $frameworkDir/src/lib/shared/ severity-picker;
cd ..
addHardDir $frameworkDir/src/lib/ utilities;

# #cd $baseDir;
# moveToDir proto;
# 	ln -s ../../../AppServer/source/types/proto/FromClient.proto appFromClient.proto;
# 	ln -s ../../../AppServer/source/types/proto/FromServer.proto appFromServer.proto;
# 	cd $clientDir;
# 	npm install protobufjs --save;
# 	npx pbjs -r app_from_client -t static-module -w es6 -o src/app/proto/appFromClient.js ../../proto/appFromClient.proto & npx pbts -o src/app/proto/appFromClient.d.ts src/app/proto/appFromClient.js;
# 	npx pbjs -r app_from_server -t static-module -w es6 -o src/app/proto/appFromServer.js ../../proto/appFromServer.proto & npx pbts -o src/app/proto/appFromServer.d.ts src/app/proto/appFromServer.js;

