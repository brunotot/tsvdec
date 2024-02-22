rm -rf libs
mkdir libs
mkdir libs/@tsvdec
mkdir libs/@tsvdec/core
mkdir libs/@tsvdec/react
cp ../../../@tsvdec-core/package.json libs/@tsvdec/core/package.json
cp ../../../@tsvdec-react/package.json libs/@tsvdec/react/package.json
cp -r ../../../@tsvdec-core/src libs/@tsvdec/core/src
cp -r ../../../@tsvdec-react/src libs/@tsvdec/react/src
rm -rf node_modules/.vite
npm i --silent --force