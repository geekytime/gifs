#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# clear and re-create the out directory
rm -rf gh-pages || exit 0;
mkdir gh-pages;

# go to the output directory and create a *new* Git repo
cd gh-pages
git init

# Move the newly built artifacts into gh-pages
cp ../index.json index.json
cp -r ../gifs gifs

# inside this git repo we'll pretend to be a new user
git config user.name "Geekytime via Travis CI"
git config user.email "chris@jaynes.me"

echo Git configured.

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit -m "Deploy to GitHub Pages"

echo Git commited.

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
