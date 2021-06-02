source ./env.sh;
cd $clientDir
ng generate library jde-material;
cd $clientDir/projects/jde-material/
addHard $materialDir ng-package.json;
cd src;
rm public-api.ts;
addHard $materialDir/src projects.ts;

moveToDir assets;
addHard $materialDir/src/assets deeppurple-amber.css
addHard $materialDir/src/assets pink-bluegrey.css
addHard $materialDir/src/assets purple-green.css
moveToDir img
addHard $materialDir/src/assets/img theme-demo-icon.svg
addHardDir $materialDir/src/assets/img homepage
cd ..
moveToDir pages
addHardDir $materialDir/src/assets/pages component-category-list
addHardDir $materialDir/src/assets/pages component-sidenav
cd ..;
moveToDir shared;
addHardDir $materialDir/src/assets/shared footer
addHardDir $materialDir/src/assets/shared navbar

cd ../..;
moveToDir styles;
addHardDir $materialDir/src/styles custom-themes
addHard $materialDir/src/styles _api.scss
addHard $materialDir/src/styles _api-theme.scss
addHard $materialDir/src/styles _constants.scss
addHard $materialDir/src/styles _general.scss
addHard $materialDir/src/styles _markdown.scss
addHard $materialDir/src/styles _markdown-theme.scss
addHard $materialDir/src/styles _svg-theme.scss
addHard $materialDir/src/styles _tables.scss
addHard $materialDir/src/styles _tables-theme.scss

cd ../lib
addHard $materialDir/src/lib jde-material.module.ts

moveToDir shared
addHardDir $materialDir/src/lib/shared documentation-items
addHardDir $materialDir/src/lib/shared footer
addHardDir $materialDir/src/lib/shared navbar
addHardDir $materialDir/src/lib/shared navigation-focus
addHardDir $materialDir/src/lib/shared style-manager
addHardDir $materialDir/src/lib/shared svg-viewer
addHardDir $materialDir/src/lib/shared version

moveToDir theme-picker
addHard $materialDir/src/lib/shared/theme-picker index.ts
addHard $materialDir/src/lib/shared/theme-picker theme-picker.html
addHard $materialDir/src/lib/shared/theme-picker theme-picker.scss
addHard $materialDir/src/lib/shared/theme-picker theme-picker.ts
addHardDir $materialDir/src/lib/shared/theme-picker theme-storage

cd ../..
moveToDir pages
addHardDir $materialDir/src/lib/pages component-category-list
addHardDir $materialDir/src/lib/pages component-page-header
addHardDir $materialDir/src/lib/pages component-sidenav
addHardDir $materialDir/src/lib/pages page-title

# moveToDir $clientDir/src/styles;
# if [ $link -eq 1 ]; then ln -s $materialDir/styles/* .; else cp -s $materialDir/styles/* .; fi;
# cd ../assets
# if [ $link -eq 1 ]; then ln -s $materialDir/assets/* .; else cp -s $materialDir/assets/* .; fi;
# echo here
# cd $appDir;
# moveToDir pages;
# if [ $link -eq 1 ]; then ln -s $materialDir/lib/pages/material-site .; else cp $materialDir/lib/pages/material-site .; fi;
# cd ..;moveToDir shared;
# if [ $link -eq 1 ]; then
# 	moveToDir material-site;
# 	ln -s $materialDir/lib/shared/material-site/documentation-items .;
# 	ln -s $materialDir/lib/shared/material-site/footer .;
# 	ln -s $materialDir/lib/shared/material-site/navigation-focus .;
# 	ln -s $materialDir/lib/shared/material-site/style-manager .;
# 	ln -s $materialDir/lib/shared/material-site/svg-viewer .;
# 	ln -s $materialDir/lib/shared/material-site/theme-picker .;
# 	ln -s $materialDir/lib/shared/material-site/version .;
# 	moveToDir navbar;
# 	ln -s $materialDir/lib/shared/material-site/navbar/* .;
# else
# 	cp $materialDir/lib/shared/material-site .;
# fi;
