#!/bin/bash
#dotnet=${1:-0}
#link=${2:-1}
#from TwsWebsite
baseDir=`pwd`;
clientDir=$baseDir/source/ClientApp;
appDir=$clientDir/src/app;
materialDir=$(dirname $(readlink -e $baseDir/../MaterialSite/control))/control;
frameworkDir=$(dirname $(readlink -e $baseDir/../WebFramework/control))/control;
marketProtoDir=$(dirname $(readlink -e $baseDir/../../MarketLibrary/source/types/proto))/proto;
#echo blocklyProtoDir=$blocklyProtoDir;
blocklyDir=$(dirname $(readlink -e $baseDir/../WebBlockly/control))/control;
#echo blocklyDir=$blocklyDir;
appProtoDir=$(dirname $(readlink -e $baseDir/../../AppServer/source/types/proto))/proto;
#echo appProtoDir=$appProtoDir;
blocklyProtoDir=$(dirname $(readlink -e $baseDir/../../Public/jde/blockly/types/proto))/proto;
publicMarketsProtoDir=$(dirname $(readlink -e $baseDir/../../Public/jde/markets/types/proto))/proto; if [ $? -ne 0 ]; then echo publicMarketsProtoDir failed!; exit 1; fi;
#echo edgarProtoDir=$edgarProtoDir;
source $baseDir/../../Framework/common.sh
#echo common done;