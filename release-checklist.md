Update binary versions.   If necessary. 
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
    *  Clang - 16
        ```
		mv llvm-project llvm-projectx
		git clone https://github.com/llvm/llvm-project.git
		cd llvm-project;git checkout release/16.x
		mkdir build;cd build;
		cmake -G "Unix Makefiles" -DLLVM_ENABLE_PROJECTS="clang" -DLLVM_ENABLE_RUNTIMES="libcxx;libcxxabi" -DCMAKE_BUILD_TYPE=Release ../llvm
		#initial - GCC_PREFIX=/usr;cmake -G "Unix Makefiles" -DLLVM_ENABLE_PROJECTS="clang" -DLLVM_ENABLE_RUNTIMES="libcxx;libcxxabi" -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_COMPILER=${GCC_PREFIX}/bin/gcc-12 -DCMAKE_CXX_COMPILER=${GCC_PREFIX}/bin/g++-12 ../llvm
        cmake --build . -j8
        sudo make install
		cd ..;mkdir build-compiler-rt;cd build-compiler-rt
		cmake -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++ ../compiler-rt  `pwd`/../build/bin/llvm-config
		make -j;
		sudo make install;
		cd lib/linux;
		source=`pwd`
		cd /usr/local/lib/clang/16
		sudo mkdir lib;cd lib;
		sudo mkdir linux;cd linux
		sudo ln -s $REPO_DIR/llvm-project/build-compiler-rt/lib/linux/libclang_rt.asan_static-x86_64.a .
		sudo ln -s $REPO_DIR/llvm-project/build-compiler-rt/lib/linux/libclang_rt.asan_cxx-x86_64.a .
		sudo ln -s /home/duffyj/code/libraries/llvm-project/build-compiler-rt/lib/linux/libclang_rt.asan-x86_64.a .
		```
    *  Boost - 1.79
	   ```
       export CXX='clang++';export CXXFLAGS='-std=c++20 -stdlib=libc++';export LDFLAGS='-stdlib=libc++';export CC='clang';
       ./bootstrap.sh --with-toolset=clang

		```
	 *  Protocol buffers - 3.17.3
        ```
	          ./autogen.sh;
		  tput reset;export CXX='clang++';export CXXFLAGS='-std=c++20 -stdlib=libc++';export LDFLAGS='-stdlib=libc++';export CC='clang';./configure;
	     tput reset;make -j7
		  ```
    *  fmt.lib - 8.0.1
	     *  `mkdir build;cd build; cmake -DBUILD_SHARED_LIBS=TRUE  ..`
		  *  `make -j8`
	 *  https://github.com/nlohmann/json - release/3.10.5
	 *  https://github.com/gabime/spdlog - v1.10.0
	 	  *  `mkdir build && cd build; cmake .. && make -j`
	 * MySql 8.0.26
	     *  https://dev.mysql.com/downloads/connector/cpp/
	     * https://github.com/mysql/mysql-connector-cpp
             ```
             mkdir build;cd build;mkdir release;cd release;cd ..;mkdir debug;cd debug;
             export CXX='clang++';export CXXFLAGS='-std=c++20 -Wno-deprecated-declarations -stdlib=libc++';export LDFLAGS='-stdlib=libc++';export CC='clang';
             cmake ../..;cd ../release;cmake ../..;
             cmake --build . --config release;cd ../debug;cmake --build . --config debug; cd ..;
             source=`pwd`;cd $JDE_DIR/bin/asan;ln -s $source/debug/libmysqlcppconn8.so .;cd ../RelWithDebInfo;ln -s $source/release/libmysqlcppconn8.so .
             ```
	 *  tws-api - 9.80.03
	     * copy Makefile to /source/cppclient/client
		  * `mkdir .release;mkdir .debug;mkdir .obj;cd .obj;mkdir debug;mkdir release;cd ..`
		  * `make DEBUG=0 -j;make -j`
	 *  https://tukaani.org/xz/ - 5.2.5 (windows only)
	 *  ng update  #npm i @angular/cli
	 *  npm update  #sudo apt install npm
	 *  #angular - 10.2.1
	 *  #angular material - 10.2.6
