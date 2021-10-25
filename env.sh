#!/bin/bash
baseDir=`pwd`;
clientDir=$baseDir/source/ClientApp;
appDir=$clientDir/src/app;
materialDir=$(dirname $(readlink -e $baseDir/../MaterialSite/control))/control;
frameworkDir=$(dirname $(readlink -e $baseDir/../WebFramework/control))/control;
marketProtoDir=$(dirname $(readlink -e $baseDir/../../MarketLibrary/source/types/proto))/proto;
blocklyDir=$(dirname $(readlink -e $baseDir/../WebBlockly/control))/control;
blocklyProtoDir=$(dirname $(readlink -e $baseDir/../../Public/jde/blockly/types/proto))/proto;
publicMarketsProtoDir=$(dirname $(readlink -e $baseDir/../../Public/jde/markets/types/proto))/proto; if [ $? -ne 0 ]; then echo publicMarketsProtoDir failed!; exit 1; fi;
source $baseDir/../../Framework/common.sh