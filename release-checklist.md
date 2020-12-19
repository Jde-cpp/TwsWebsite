*  Update binary versions.   If necessary. 
*  Build all
    * Improve Build Doc.
*  Package Setup.exe
    * Sanity Check.
*  Branch/Tag.
    *  TwsWebsite
	 *  Materialsite
	 *  WebFramework
	 *  Framework
	 *  XZ
	 *  MarketLibrary
	 *  TwsWebSocket
*  Upload msi.
    *  Broadcast
*  Refresh Libraries
    *  Clang - 10
        ```
		cmake -G "Unix Makefiles" -DLLVM_ENABLE_PROJECTS="clang;libcxx;libcxxabi" -DCMAKE_BUILD_TYPE=Release ../llvm
        cmake --build . -j4
        sudo make install
		mkdir build-compiler-rt;cd build-compiler-rt
		cmake ../compiler-rt  `pwd`/../build/bin/llvm-config
		make -j;
		sudo make install
		cd lib/linux
		source=`pwd`
		cd /usr/local/lib/clang/11.0.1
		sudo mkdir lib;cd lib;
		sudo mkdir linux;cd linux
		sudo ln -s /home/duffyj/code/libraries/llvm-project/build-compiler-rt/lib/linux/libclang_rt.asan_cxx-x86_64.a .
		sudo ln -s /home/duffyj/code/libraries/llvm-project/build-compiler-rt/lib/linux/libclang_rt.asan-x86_64.a .
		```

	 *  Protocol buffers - 3.13
        ```
		  tput reset;export CXX='clang++';export CXXFLAGS='-std=c++20 -stdlib=libc++';export LDFLAGS='-stdlib=libc++';export CC='clang';./configure;
	     tput reset;make -j7
		  ```
    *  fmt.lib - 7.1.0
	     *  `mkdir build;cd build; cmake -DBUILD_SHARED_LIBS=TRUE  ..`
		  *  `make -j8`
	 *  https://github.com/nlohmann/json - 3.9.1
	 *  https://github.com/gabime/spdlog - 1.8.1
	 	  *  `mkdir build && cd build; cmake .. && make -j`
	 *  tws-api - 9.80.03
	     * copy [Makefile](https://raw.githubusercontent.com/johnduffynh/tws-api/master/source/cppclient/client/Makefile?token=ACSJSEN4UNO7HQI5DY3PQOK7VEDJK) to /source/cppclient/client
		  * `mkdir .release;mkdir .debug;mkdir .obj;cd .obj;mkdir debug;mkdir release;cd ..`
		  * `make DEBUG=0 -j;make -j`
	 *  https://tukaani.org/xz/ - 5.2.5 (windows only)
	 *  ng update
	 *  npm update
	 *  angular - 10.2.1
	 *  angular material - 10.2.6
*  Add Unit Test
*  Co-routine something.