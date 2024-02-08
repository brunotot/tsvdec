rm -rf libs
mkdir libs
mkdir libs/@tsvdec
mkdir libs/@tsvdec/core
mkdir libs/@tsvdec/react
cp ../../../core/package.json libs/@tsvdec/core/package.json
cp ../../../react/package.json libs/@tsvdec/react/package.json
cp -r ../../../core/src libs/@tsvdec/core/src
cp -r ../../../react/src libs/@tsvdec/react/src
rm -rf node_modules/.vite
npm i --silent --force