source ./env.sh;
cd $clientDir/projects/jde-tws-assets/src;
npm install protobufjs --save;
moveToDir assets
moveToDir proto

	ln -s $marketProtoDir/ib.proto .;
	ln -s $marketProtoDir/requests.proto .;
	ln -s $marketProtoDir/results.proto .;
	ln -s $marketProtoDir/watch.proto .;
	ln -s $blocklyProtoDir/blockly.proto .;
	npx pbjs -r ib_root -t static-module -w es6 -o ib.js ib.proto; npx pbts -o ib.d.ts ib.js
	npx pbjs -r request_root -t static-module -w es6 -o requests.js requests.proto;npx pbts -o requests.d.ts requests.js;
	npx pbjs -r result_root -t static-module -w es6 -o results.js results.proto;npx pbts -o results.d.ts results.js;
	npx pbjs -r watch_root -t static-module -w es6 -o watch.js watch.proto;npx pbts -o watch.d.ts watch.js;

	rm ib.proto;
	rm requests.proto;
	rm results.proto;
	rm watch.proto;
	rm blockly.proto;