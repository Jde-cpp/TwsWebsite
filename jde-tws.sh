#!/bin/bash
scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source $scriptDir/../../Framework/common.sh
pushd `pwd` > /dev/null;

if [ ! -d node_modules/blockly ]; then npm install blockly --save; fi;
#npm install google-closure-library --save
if [ ! -d node_modules/highcharts ]; then npm install highcharts --save; fi;
if [ ! -d node_modules/highcharts-angular ]; then npm install highcharts-angular --save; fi;
cd src;
addHard styles.scss $scriptDir/baseline/ClientApp/src;
addHard index.html $scriptDir/baseline/ClientApp/src;
addHard favicon.ico $scriptDir/baseline/ClientApp/src;
cd assets/img;
addHard wall-street-bets.png ../../../projects/jde-tws/src/assets/img
addHard twitter_social_icons_circle_blue.svg ../../../projects/jde-tws/src/assets/img
addHard outline_emoji_people_black_24dp.png ../../../projects/jde-tws/src/assets/img

cd ../../app;
echo `pwd`;
addHard app.module.ts $scriptDir;
addHard app.component.scss $scriptDir/baseline/ClientApp/src/app;
addHard app.component.html $scriptDir/baseline/ClientApp/src/app;
addHard app.component.ts $scriptDir/baseline/ClientApp/src/app;

popd > /dev/null;