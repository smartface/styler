rc :
	. ./.scripts/version.sh

beta :
	.scripts/version.sh

alpha :
	.scripts/version.sh

minor :
	.scripts/version.sh minor

major :
	.scripts/version.sh major

patch :
	.scripts/version.sh patch

tag :
	. ./.scripts/addTag.sh

removeTag :
	git tag -d $NEW_APP_VERSION
