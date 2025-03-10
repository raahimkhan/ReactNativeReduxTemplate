#!/bin/bash

# navigate to root directory from scripts directory
cd ..

# navigate to app level android directory and check if build.gradle file exists
cd android/app/
if [ ! -f "build.gradle" ]; then
    echo "Error: build.gradle file not found"
    exit 1
fi

# extract and echo the current versionName
current_version_name=$(awk -F'"' '$1 ~ /versionName/ {print $2}' build.gradle | tr -d '[:space:]')
if [ -n "$current_version_name" ]; then
    echo "Current versionName: $current_version_name"
else
    echo "versionName not found in build.gradle"
    exit 1
fi

echo ""

# prompt user for versionName input
echo "Please enter the incremented versionName as per the criteria defined below."
echo "Let's assume current version is 1.0.0 for example."
echo "Then you can increment the versionName as follows:"
echo "patch -> 1.0.1"
echo "minor -> 1.1.0"
echo "major -> 2.0.0"
echo "prepatch -> 1.0.1-0"
echo "preminor -> 1.1.0-0"
echo "premajor -> 2.0.0-0"
echo "prerelease -> 1.0.1-0"
echo ""
read -p "Please enter new versionName: " new_version_name

echo ""

# extract and echo the current versionCode
current_version=$(awk '$1 == "versionCode" {print $2}' build.gradle)
if [ -n "$current_version" ]; then
    echo "Current versionCode: $current_version"
else
    echo "versionCode not found in build.gradle"
    exit 1
fi

# increment the version code
new_version_code=$((current_version + 1))

# Use awk to replace both versionCode and versionName
awk -v new_ver="$new_version_code" -v new_name="$new_version_name" '
{
    if ($1 == "versionCode") {
        print "\t\tversionCode " new_ver
    } else if ($1 == "versionName") {
        print "\t\tversionName \"" new_name "\""
    } else {
        print $0
    }
}' build.gradle > build.gradle.tmp && mv build.gradle.tmp build.gradle

echo ""

# check if the replacements were successful
if grep -q "versionCode $new_version_code" build.gradle && grep -q "versionName \"$new_version_name\"" build.gradle; then
    echo "Successfully updated versionCode to $new_version_code and versionName to $new_version_name in build.gradle file"
else
    echo "Failed to update versionCode or versionName in build.gradle file"
    exit 1
fi

echo ""

cd .. && cd ..

echo "versionCode and versionName updated successfully for Android!"
