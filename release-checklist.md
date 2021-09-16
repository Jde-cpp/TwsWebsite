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
    *  Clang - 12
        ```
		mkdir build;cd build;
		cmake -G "Unix Makefiles" -DLLVM_ENABLE_PROJECTS="clang;libcxx;libcxxabi" -DCMAKE_BUILD_TYPE=Release ../llvm
        cmake --build . -j8
        sudo make install
		cd ..;mkdir build-compiler-rt;cd build-compiler-rt
		cmake ../compiler-rt  `pwd`/../build/bin/llvm-config
		make -j;
		sudo make install
		cd lib/linux
		source=`pwd`
		cd /usr/local/lib/clang/12.0.1
		sudo mkdir lib;cd lib;
		sudo mkdir linux;cd linux
		sudo ln -s $REPO_DIR/llvm-project/build-compiler-rt/lib/linux/libclang_rt.asan_cxx-x86_64.a .
		sudo ln -s /home/duffyj/code/libraries/llvm-project/build-compiler-rt/lib/linux/libclang_rt.asan-x86_64.a .
		```
    *  Boost - 1.77
	   ```
       export CXX='clang++';export CXXFLAGS='-std=c++20 -stdlib=libc++';export LDFLAGS='-stdlib=libc++';export CC='clang';
       ./bootstrap.sh --with-toolset=clang

		```
	 *  Protocol buffers - 3.17.3
        ```
		  tput reset;export CXX='clang++';export CXXFLAGS='-std=c++20 -stdlib=libc++';export LDFLAGS='-stdlib=libc++';export CC='clang';./configure;
	     tput reset;make -j7
		  ```
    *  fmt.lib - 8.0.1
	     *  `mkdir build;cd build; cmake -DBUILD_SHARED_LIBS=TRUE  ..`
		  *  `make -j8`
	 *  https://github.com/nlohmann/json - 3.10.1
	 *  https://github.com/gabime/spdlog - 1.9.2
	 	  *  `mkdir build && cd build; cmake .. && make -j`
	 * MySql 8.0.26
	     *  https://dev.mysql.com/downloads/connector/cpp/
		  * https://github.com/mysql/mysql-connector-cpp
			   * mkdir build;cd build;mkdir release;cd release;
            * export CXX='clang++';export CXXFLAGS='-std=c++20 -stdlib=libc++';export LDFLAGS='-stdlib=libc++';export CC='clang';
            * cmake ../..
            * cmake --build . --config release
            * source=`pwd`;cd $JDE_DIR/bin/asan;n -s $source/libmysqlcppconn8.so .;cd ../release;ln -s $source/libmysqlcppconn8.so .
	 *  tws-api - 9.80.03
	     * copy Makefile to /source/cppclient/client
		  * `mkdir .release;mkdir .debug;mkdir .obj;cd .obj;mkdir debug;mkdir release;cd ..`
		  * `make DEBUG=0 -j;make -j`
	 *  https://tukaani.org/xz/ - 5.2.5 (windows only)
	 *  ng update
	 *  npm update
	 *  angular - 10.2.1
	 *  angular material - 10.2.6
*  Add Unit Test
*  Co-routine something.