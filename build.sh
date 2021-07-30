#!/bin/bash
workspace=${1:-my-workspace};
if [ ! -d dist ]; then echo 'run from angular site dir'; exit 1; fi;
ng build;
source ../../../Framework/common.sh;
cd dist/$workspace;
moveToDir assets;
mklink purple-green.css ../../../assets;
moveToDir img;
mklink theme-demo-icon.svg ../../../../assets/img;
mklink twitter_social_icons_circle_blue.svg ../../../../../control/src/assets/img;
mklink outline_emoji_people_black_24dp.png ../../../../../control/src/assets/img;
