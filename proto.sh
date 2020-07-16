source ./env.sh;
cd $clientDir
	ln -s $marketProtoDir/ib.proto .;
	ln -s $marketProtoDir/requests.proto .;
	ln -s $marketProtoDir/results.proto .;
	npx pbjs -r ib_root -t static-module -w es6 -o src/app/proto/ib.js ib.proto & npx pbts -o src/app/proto/ib.d.ts src/app/proto/ib.js
	npx pbjs -r ib_root -t static-module -w es6 -o src/app/proto/ib.js ib.proto & npx pbts -o src/app/proto/ib.d.ts src/app/proto/ib.js
	npx pbjs -r request_root -t static-module -w es6 -o src/app/proto/requests.js requests.proto & npx pbts -o src/app/proto/requests.d.ts src/app/proto/requests.js;
	npx pbjs -r request_root -t static-module -w es6 -o src/app/proto/requests.js requests.proto & npx pbts -o src/app/proto/requests.d.ts src/app/proto/requests.js;
	npx pbjs -r result_root -t static-module -w es6 -o src/app/proto/results.js results.proto & npx pbts -o src/app/proto/results.d.ts src/app/proto/results.js;
	npx pbjs -r result_root -t static-module -w es6 -o src/app/proto/results.js results.proto & npx pbts -o src/app/proto/results.d.ts src/app/proto/results.js;
	rm ib.proto;
	rm requests.proto;
	rm results.proto;