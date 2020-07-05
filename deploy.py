#!/usr/bin/env python

from os import listdir, path, remove, chdir, system
from shutil import rmtree, copytree, copyfile

deploy = "~/codebase/mofdeploy"
dev = "~/codebase/moffit-scheduler"

for f in listdir(path.expanduser(deploy + "/server")):
    if f != ".git":
        full_path = path.expanduser(deploy + "/server/" + f)
        if path.isdir(full_path):
            rmtree(full_path)
        else:
            remove(full_path)

print("Deleted old files from deploy folder")

chdir(path.expanduser(dev + "/client"))
system("npm run build >/dev/null 2>&1")

print("Built the frontend")

build_dest = path.expanduser(dev + "/server/build")
if path.isdir(build_dest):
    rmtree(build_dest)
copytree(path.expanduser(dev + "/client/build"), build_dest)

print("Copied frontend build to server directory")

for f in listdir(path.expanduser(dev + "/server")):
    if f != ".git":
        src_path = path.expanduser(dev + "/server/" + f)
        dest_path = path.expanduser(deploy + "/server/" + f)
        if path.isdir(src_path):
            copytree(src_path, dest_path)
        else:
            copyfile(src_path, dest_path)

print("Copied new files to deploy folder")

chdir(path.expanduser(deploy + "/server"))
system("git add -A")
system('git commit -m "Release"')
system("git push")