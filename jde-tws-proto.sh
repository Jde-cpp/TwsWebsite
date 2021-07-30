#!/bin/bash
echo 'jde-tws-proto.sh';
pushd `pwd` > /dev/null;
pushd `pwd` > /dev/null;
baseDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )";
$baseDir/../WebFramework/jde-framework-proto.sh
cd $baseDir;
jdeRoot=$baseDir/../..;
if ! source ./env.sh; then exit 1; fi;
popd > /dev/null;
if [ ! -d node_modules ]; then echo must run from angular dir; exit 1; fi;
cd node_modules;
moveToDir jde-cpp;

function create
{
	dir=$1;
	local -n files=$2;
	for i in "${!files[@]}"; do
		ln -s $dir/$i.proto .;
	done
	for i in "${!files[@]}"; do
		npx pbjs -r ${files[$i]} -t static-module -w es6 -o $i.js $i.proto;npx pbts -o $i.d.ts $i.js;
	done
	for i in "${!files[@]}"; do
		rm $i.proto;
	done
}
declare -A publicMarket;
if test ! -f edgar.d.ts; then publicMarket[edgar]=edgar_root; fi;
if test ! -f ib.d.ts; then publicMarket[ib]=ib_root; fi;
if test ! -f requests.d.ts; then publicMarket[requests]=request_root; fi;
if test ! -f results.d.ts; then publicMarket[results]=result_root; fi;
if test ! -f watch.d.ts; then publicMarket[watch]=watch_root; fi;
create $publicMarketsProtoDir publicMarket;

declare -A blockly;
if test ! -f blockly.d.ts; then blockly[blockly]=blockly_root; fi;
create $blocklyProtoDir blockly;

popd > /dev/null;