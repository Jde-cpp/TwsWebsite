source ./env.sh;
moveToDir $clientDir/src/styles;
if [ $link -eq 1 ]; then ln -s $materialDir/styles/* .; else cp -s $materialDir/styles/* .; fi;
cd ../assets
if [ $link -eq 1 ]; then ln -s $materialDir/assets/* .; else cp -s $materialDir/assets/* .; fi;
echo here
cd $appDir;
moveToDir pages;
if [ $link -eq 1 ]; then ln -s $materialDir/lib/pages/material-site .; else cp $materialDir/lib/pages/material-site .; fi;
cd ..;moveToDir shared;
if [ $link -eq 1 ]; then
	moveToDir material-site;
	ln -s $materialDir/lib/shared/material-site/documentation-items .;
	ln -s $materialDir/lib/shared/material-site/footer .;
	ln -s $materialDir/lib/shared/material-site/navigation-focus .;
	ln -s $materialDir/lib/shared/material-site/style-manager .;
	ln -s $materialDir/lib/shared/material-site/svg-viewer .;
	ln -s $materialDir/lib/shared/material-site/theme-picker .;
	ln -s $materialDir/lib/shared/material-site/version .;
	moveToDir navbar;
	ln -s $materialDir/lib/shared/material-site/navbar/* .;
else
	cp $materialDir/lib/shared/material-site .;
fi;
