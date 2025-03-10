#!/bin/bash

echo ""

echo "Running afterPrebuild automation!"

# copy debug.keystore from android/app directory to backup folder in root if prebuild first time
# otherwise copy debug.keystore from root to android/app directory
if [ -f "../backup/debug.keystore" ]; then
    cp ../backup/debug.keystore ../android/app/
else
    cp ../android/app/debug.keystore ../backup/
fi

# copy release.keystore from backup folder in root to android/app directory
cp ../backup/release.keystore ../android/app/

# copy keystore.properties from root to android directory
if [ -f "../backup/keystore.properties" ]; then
    cp ../backup/keystore.properties ../android/
else
    echo "keystore.properties does not exist. afterPrebuild automation failed!"
    return 1
fi

echo "debug.keystore, release.keystore, and keystore.properties copied successfully!"

echo ""

if [ -f "../backup/androidTemp.txt" ]; then
    version_name=$(sed -n '1p' ../backup/androidTemp.txt)
    version_code=$(sed -n '2p' ../backup/androidTemp.txt)
    cd ../android/app/
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
    cd .. && cd .. # back to root
    echo "Android versionCode and versionName backup restored successfully!"
    echo ""
    rm backup/androidTemp.txt
    cd scripts # go back to scripts directory
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
if [ -f "../backup/iosTemp.txt" ]; then
    CFBundleShortVersionString=$(sed -n '1p' ../backup/iosTemp.txt)
    CFBundleVersion=$(sed -n '2p' ../backup/iosTemp.txt)
    cd ../ios/ReactNativeReduxTemplate
    write_plist_value "CFBundleVersion" "$CFBundleVersion" "Info.plist"
    write_plist_value "CFBundleShortVersionString" "$CFBundleShortVersionString" "Info.plist"
    cd .. && cd .. # back to root
    echo "iOS CFBundleVersion and CFBundleShortVersionString backup restored successfully!"
    echo ""
    rm backup/iosTemp.txt
    cd scripts # go back to scripts directory
else
    echo "iosTemp.txt does not exist. Skipping replacing CFBundleVersion and CFBundleShortVersionString for iOS."
fi

echo ""
echo "afterPrebuild automation completed successfully!"