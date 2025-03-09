#!/bin/bash

# function to generate release keystore and keystore.properties
# if not already exists
function createKeystore() {
    # check if release keystore and keystore.properties exists or not
    if [ -f "release.keystore" -a -f "keystore.properties" ]; then
        echo "release.keystore and keystore.properties exists. Skipping creation!"
        return 0
    else
        echo "release.keystore and keystore.properties does not exist. Creating now!"
    fi

    echo ""

    # release keystore name
    keystoreName="release.keystore"
    # random alias (18 chars, upper and lower case alphabets only)
    aliasName=$(openssl rand -base64 18 | tr -dc 'a-zA-Z' | fold -w 18 | head -n 1)
    # strong password (15 chars: upper, lower, numerics, special chars)
    keystorePassword=$(openssl rand -base64 15 | tr -dc 'a-zA-Z0-9!@#$%^&*()_+' | head -c 15)

    # keytool command with input redirection in below order
    # keystore password
    # re-enter keystore password
    # first and last name
    # organizational unit
    # organization name
    # city or locality name
    # state or province name
    # two-letter country code
    # confirm credentials
    keytool -genkeypair -v -keystore "$keystoreName" -alias "$aliasName" -keyalg RSA -keysize 2048 -validity 10000 <<-EOF
$keystorePassword
$keystorePassword
Muhammad Raahim Khan
Upwork
Upwork
Lahore
Punjab
PK
yes
EOF

    # create the keystore.properties file
    echo "KEYSTORE_FILE=$keystoreName" > keystore.properties
    echo "KEYSTORE_PASSWORD=$keystorePassword" >> keystore.properties
    echo "KEY_ALIAS=$aliasName" >> keystore.properties
    echo "KEY_PASSWORD=$keystorePassword" >> keystore.properties

    echo ""

    echo "release.keystore and keystore.properties created!"
    echo "Please do not commit keystore.properties and keep it safe locally!"

    echo ""
}

echo "Running beforePrebuild automation!"

echo ""

createKeystore

echo ""

# take backup of versionCode and versionName for Android
if [ -f "androidTemp.txt" ]; then
    rm androidTemp.txt
fi
if [ -d "android/app" ]; then
    cd android/app/
    version_code=$(awk '$1 == "versionCode" {print $2}' build.gradle)
    version_name=$(awk -F'"' '$1 ~ /versionName/ {print $2}' build.gradle | tr -d '[:space:]')
    cd .. && cd ..
    echo "$version_name" > androidTemp.txt
    echo -n "$version_code" >> androidTemp.txt
    echo "versionCode and versionName backup for Android done!"
    echo ""
else
    echo "Android directory does not exist! versionCode and versionName Backup not required."
    echo ""
fi

# take backup of CFBundleVersion and CFBundleShortVersionString for iOS
read_plist_value() {
    local key="$1"
    local file="$2"
    if command -v /usr/libexec/PlistBuddy &> /dev/null; then
        /usr/libexec/PlistBuddy -c "Print $key" "$file" 2>/dev/null
    else
        grep -A1 "<key>$key</key>" "$file" | tail -n1 | sed -n 's/.*<string>\(.*\)<\/string>.*/\1/p'
    fi
}
if [ -f "iosTemp.txt" ]; then
    rm iosTemp.txt
fi
if [ -d "ios/ReactNativeReduxTemplate" ]; then
    cd ios/ReactNativeReduxTemplate
    CFBundleVersion=$(read_plist_value "CFBundleVersion" "Info.plist")
    CFBundleShortVersionString=$(read_plist_value "CFBundleShortVersionString" "Info.plist")
    cd .. && cd ..
    echo "$CFBundleShortVersionString" > iosTemp.txt
    echo -n "$CFBundleVersion" >> iosTemp.txt
    echo "CFBundleVersion and CFBundleShortVersionString backup for iOS done!"
    echo ""
else
    echo "iOS directory does not exist! CFBundleVersion and CFBundleShortVersionString backup not required."
fi

echo ""
echo "beforePrebuild automation completed successfully!"
