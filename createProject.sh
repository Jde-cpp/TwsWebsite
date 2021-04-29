library=${1};  #jde-blockly
dir=${2}; #WebBlockly
controlDir=$(dirname $(readlink -e $baseDir/../$dir/control))/control;
cd $clientDir
ng generate library $library;
cd projects/$library
addHard $controlDir ng-package.json;
cd src;
addHard $controlDir/src public-api.ts;
cd lib;
addHard $controlDir/src/lib $library.module.ts;

