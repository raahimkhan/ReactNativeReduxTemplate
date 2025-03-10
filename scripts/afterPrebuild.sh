#!/bin/bash

# navigate to root directory from scripts directory
cd ..

echo ""

echo "Running afterPrebuild automation!"

# copy debug.keystore from android/app directory to root if prebuild first time
# otherwise copy debug.keystore from root to android/app directory
if [ -f "debug.keystore" ]; then
    cp debug.keystore android/app/
else
    cp android/app/debug.keystore .
fi

# copy release.keystore from root to android/app directory
cp release.keystore android/app/

# copy keystore.properties from root to android directory
if [ -f "keystore.properties" ]; then
    cp keystore.properties android/
else
    echo "keystore.properties does not exist. afterPrebuild automation failed!"
    return 1
fi

echo "debug.keystore, release.keystore, and keystore.properties copied successfully!"

echo ""

if [ -f "androidTemp.txt" ]; then
    version_name=$(sed -n '1p' androidTemp.txt)
    version_code=$(sed -n '2p' androidTemp.txt)
    cd android/app/
    awk -v new_ver="$version_code" -v new_name="$version_name" '
    {
        if ($1 == "versionCode") {
            print "\t\tversionCode " new_ver
        } else if ($1 == "versionName") {
            print "\t\tversionName \"" new_name "\""
        } else {
            print $0
        }
    }' build.gradle > build.gradle.tmp && mv build.gradle.tmp build.gradle
    cd .. && cd ..
    echo "Android versionCode and versionName backup restored successfully!"
    echo ""
    rm androidTemp.txt
else
    echo "androidTemp.txt does not exist. Skipping replacing versionCode and versionName for Android."
fi

write_plist_value() {
    local key="$1"
    local value="$2"
    local file="$3"
    if command -v /usr/libexec/PlistBuddy &> /dev/null; then
        /usr/libexec/PlistBuddy -c "Set $key $value" "$file"
    else
        # create a temporary file
        temp_file=$(mktemp)
        # use sed to replace the value and write to temp file
        sed "/<key>$key<\/key>/,/<\/string>/ s/<string>.*<\/string>/<string>$value<\/string>/" "$file" > "$temp_file"
        # move temp file back to original
        mv "$temp_file" "$file"
    fi
}
if [ -f "iosTemp.txt" ]; then
    CFBundleShortVersionString=$(sed -n '1p' iosTemp.txt)
    CFBundleVersion=$(sed -n '2p' iosTemp.txt)
    cd ios/ReactNativeReduxTemplate
    write_plist_value "CFBundleVersion" "$CFBundleVersion" "Info.plist"
    write_plist_value "CFBundleShortVersionString" "$CFBundleShortVersionString" "Info.plist"
    cd .. && cd ..
    echo "iOS CFBundleVersion and CFBundleShortVersionString backup restored successfully!"
    echo ""
    rm iosTemp.txt
else
    echo "iosTemp.txt does not exist. Skipping replacing CFBundleVersion and CFBundleShortVersionString for iOS."
fi

echo ""
echo "afterPrebuild automation completed successfully!"