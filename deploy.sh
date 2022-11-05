read_var() {
  if [ -z "$1" ]; then
    echo "environment variable name is required"
    return 1
  fi

  local ENV_FILE='.env.production'
  if [ ! -z "$2" ]; then
    ENV_FILE="$2"
  fi

  local VAR=$(grep $1 "$ENV_FILE" | xargs)
  IFS="=" read -ra VAR <<< "$VAR"
  echo ${VAR[1]}
}

endpoint=$(read_var REGISTRY)
sed -i -e "3 s/VUE_APP_VERSION=.*/VUE_APP_VERSION=$(date '+%Y.%m.%d.%H.%M')/" ./.env.production
cat ./.env.production
echo "Building and pushing dockerfile to $endpoint..."
npm run build && docker build -t $endpoint . && docker push $endpoint
