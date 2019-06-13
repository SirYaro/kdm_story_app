# <img src="https://dl.dropboxusercontent.com/s/vr69eaqnvvm0kip/git_icon.png" width="24"> KDM 1.5 Story app



The repository contains source code for the Kingdom Death: Monster companion story app.

More info and release downloads: https://kdm-story.site

Current release version is **2.5**:

See changelog at: https://kdm-story.site/changelog

# How to work with the source

## Preparations

To build the app one needs to:

1. Install npm: https://www.npmjs.com/get-npm
2. Install git lfs (it is used to handle large files): https://git-lfs.github.com
> \>\> git lfs install
3. Clone the repository: 
> \>\> git clone git@github.com:prikhodkop/kdm_story_app.git
4. Install required node_modules:
> \>\> npm install

## Building

### For dev builds:

On Windows:

> \>\> electron-packager ./ "Kingdom Death 1.5 Story" --platform win32 --icon ./icon.icns --overwrite --arch=x64 --verbose --prune=true --out=\<path to build\>

On Mac:

> \>\> electron-packager ./ "Kingdom Death 1.5 Story" --platform darwin --icon ./icon.icns --overwrite --arch=x64 --verbose --prune=true --out=\<path to build\>

### For release build:

On windows and mac:

> \>\> yarn dist

Build artefacts would be put into ./dist folder.
  
## Contributions

To have your work added to master branch (from which release builds are eventually created), please submit pull request.

https://help.github.com/en/articles/creating-a-pull-request
