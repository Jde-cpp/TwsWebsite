#!/bin/bash
clean=${1:-0};
shouldFetch=${2:-1};
buildPrivate=${3:-0};

setupDir=`pwd`;
#source ./env.sh;
cd ..;
source ../Framework/common.sh;
fetchDir WebFramework $shouldFetch;
fetchDir MaterialSite $shouldFetch;
if (( $buildPrivate == 1 )); then fetchDir WebBlockly $shouldFetch; fi;
cd $setupDir;

cmd="../WebFramework/create-workspace.sh my-workspace MaterialSite WebFramework TwsWebsite";
if (( buildPrivate == 1 )); then cmd="$cmd WebBlockly"; fi;
echo $cmd
$cmd; if [ $? -ne 0 ]; then echo `pwd`; echo $cmd; exit 1; fi;
echo `pwd`;
cd my-workspace;
#ng build --output-hashing=none --sourceMap=true;
#cd dist/my-workspace;
moveToDir src;
moveToDir assets; moveToDir img;
addHard twitter_social_icons_circle_blue.svg ../../../projects/jde-tws/src/assets/img;
addHard outline_emoji_people_black_24dp.png ../../../projects/jde-tws/src/assets/img;
addHard theme-demo-icon.svg ../../../projects/jde-material/src/assets/img;
cd ..;
addHard deeppurple-amber.css ../../projects/jde-material/src/assets;
addHard pink-bluegrey.css ../../projects/jde-material/src/assets;
addHard purple-green.css ../../projects/jde-material/src/assets;

echo "not ios_saf 15.2-15.3" >> .browserslistrc;
echo "not safari 15.2-15.3" >> .browserslistrc;  #todo remove at some point.
ng build --output-hashing=none --sourceMap=true;