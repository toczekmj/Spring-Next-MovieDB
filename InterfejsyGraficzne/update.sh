# shellcheck disable=SC2034
MAIN_BRANCH="main"
RUN_PATH="./run.sh"
UPDATE_PATH="./update.sh"
CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null)

if [ "$CURRENT_BRANCH" != "$MAIN_BRANCH" ]; then
  echo "This script is designed to run in MAIN branch only."
  echo "Please switch to MAIN branch and then execute this script."
  exit 1;
else
    if [ "$(git rev-list HEAD...origin/$MAIN_BRANCH --count)" -eq 0 ]; then
        echo "Directory is up to date with the '$MAIN_BRANCH' branch."
    else
        echo "Directory is outdated with the '$MAIN_BRANCH' branch."
        echo "UPDATING..."
        git pull;
        sudo chmod +x $RUN_PATH
        sudo chmod +x $UPDATE_PATH
        sh "$RUN_PATH UPDATE"
    fi
fi



