.PHONY: rc beta alpha minor major patch tag removeTag

rc :
	. ./.scripts/updateVersion.sh

beta :
	. ./.scripts/updateVersion.sh

alpha :
	. ./.scripts/updateVersion.sh

minor :
	. ./.scripts/updateVersion.sh minor

major :
	. ./.scripts/updateVersion.sh major

patch :
	. ./.scripts/updateVersion.sh patch

tag :
	. ./.scripts/addTag.sh

removeTag :
	git tag -d $NEW_APP_VERSION
