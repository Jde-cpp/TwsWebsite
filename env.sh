#!/bin/bash
dotnet=${1:-0}
link=${2:-1}
#from TwsWebsite
baseDir=`pwd`;
clientDir=$baseDir/source/ClientApp;
appDir=$clientDir/src/app;
materialDir=$(dirname $(readlink -e $baseDir/../MaterialSite/source/projects/material-site/src))/src;
frameworkDir=$(dirname $(readlink -e $baseDir/../WebFramework/source/ClientApp/src/app))/app;
marketProtoDir=$(dirname $(readlink -e $baseDir/../../MarketLibrary/source/types/proto))/proto;
source $baseDir/../WebFramework/common.sh
