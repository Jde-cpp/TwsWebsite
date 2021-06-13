#!/bin/bash
scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source $scriptDir/../../Framework/common.sh
pushd `pwd` > /dev/null;

if [ ! -d node_modules/blockly ]; then npm install blockly --save; fi;
#npm install google-closure-library --save
if [ ! -d node_modules/highcharts ]; then npm install highcharts --save; fi;
if [ ! -d node_modules/highcharts-angular ]; then npm install highcharts-angular --save; fi;
cd src/app;
addHard app.module.ts $scriptDir;

popd > /dev/null;