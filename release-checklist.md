*  Update binary versions.   If necessary. 
*  Build all
*  Package Setup.exe
*  Branch
    *  TwsWebsite
	 *  Materialsite
	 *  WebFramework
	 *  Framework
	 *  XZ
	 *  MarketLibrary
	 *  TwsWebSocket
*  Upload msi.
*  Refresh Libraries
    *  Clang - 10
	 *  Protocol buffers - 3.13
	     *  `tput reset;export CXX='clang++';export CXXFLAGS='-std=c++20 -stdlib=libc++';export LDFLAGS='-stdlib=libc++';export CC='clang';./configure;`
		  `tput reset;make`
    *  https://github.com/nlohmann/json - 3.9.1
	 *  https://github.com/gabime/spdlog - 1.8.1
	 *  tws-api
	 *  https://tukaani.org/xz/ - 5.2.5
	 *  ng update
	 *  angular - 10.0.2
	 *  angular material - 10.x