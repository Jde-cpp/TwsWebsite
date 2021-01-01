#!/bin/bash
dotnet=${1:-0}
link=${2:-1}
#from TwsWebsite
baseDir=`pwd`;
clientDir=$baseDir/source/ClientApp;
appDir=$clientDir/src/app;
materialDir=$(dirname $(readlink -e $baseDir/../MaterialSite/control))/control;
frameworkDir=$(dirname $(readlink -e $baseDir/../WebFramework/control))/control;
marketProtoDir=$(dirname $(readlink -e $baseDir/../../MarketLibrary/source/types/proto))/proto;
blocklyProtoDir=$(dirname $(readlink -e $baseDir/../../Blockly/source/types/proto))/proto;
blocklyDir=$(dirname $(readlink -e $baseDir/../WebBlockly/control))/control;
source $baseDir/../WebFramework/common.sh
