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
if (( $buildPrivate == 1 )); then
	../WebFramework/create-workspace.sh my-workspace true MaterialSite WebFramework TwsWebsite WebBlockly;
else
	../WebFramework/create-workspace.sh my-workspace true MaterialSite WebFramework TwsWebsite;
fi;
ng build
ng build --configuration production
