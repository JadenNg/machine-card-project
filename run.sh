sed -i -e "3 s/VUE_APP_VERSION=.*/VUE_APP_VERSION=$(date '+%Y.%m.%d.%H.%M')/" ./.env
npm run dev
