#!/bin/bash

# function to read plist values
read_plist_value() {
    local key="$1"
    local file="$2"
    # try using PlistBuddy (for macOS)
    if command -v /usr/libexec/PlistBuddy &> /dev/null; then
        /usr/libexec/PlistBuddy -c "Print $key" "$file" 2>/dev/null
    else
        # fallback to grep and sed (for Linux or if PlistBuddy is not available)
        grep -A1 "<key>$key</key>" "$file" | tail -n1 | sed -n 's/.*<string>\(.*\)<\/string>.*/\1/p'
    fi
}

# function to write plist values
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

# navigate to ios directory and check if Info.plist file exists
cd ../ios/ReactNativeReduxTemplate
if [ ! -f "Info.plist" ]; then
    echo "Error: Info.plist file not found"
    exit 1
fi

# read values
CFBundleVersion=$(read_plist_value "CFBundleVersion" "Info.plist")
CFBundleShortVersionString=$(read_plist_value "CFBundleShortVersionString" "Info.plist")

# check if values were successfully read
if [ -z "$CFBundleVersion" ] || [ -z "$CFBundleShortVersionString" ]; then
    echo "Error: Failed to read one or more values from Info.plist"
    exit 1
fi

# print the values in the desired format
echo "Current CFBundleVersion in Info.plist: $CFBundleVersion"
echo "Current CFBundleShortVersionString in Info.plist: $CFBundleShortVersionString"

echo ""

# prompt user for CFBundleShortVersionString input
echo "Please enter the incremented CFBundleShortVersionString as per the criteria defined below."
echo "Let's assume current version string is 1.0.0 for example."
echo "Then you can increment the versionName as follows:"
echo "patch -> 1.0.1"
echo "minor -> 1.1.0"
echo "major -> 2.0.0"
echo "prepatch -> 1.0.1-0"
echo "preminor -> 1.1.0-0"
echo "premajor -> 2.0.0-0"
echo "prerelease -> 1.0.1-0"
echo ""
read -p "Please enter new CFBundleShortVersionString: " new_version_name

echo ""

# increment the CFBundleVersion
new_version_code=$((CFBundleVersion + 1))

# write the new values back to the file
write_plist_value "CFBundleVersion" "$new_version_code" "Info.plist"
write_plist_value "CFBundleShortVersionString" "$new_version_name" "Info.plist"

# read the updated values
updated_CFBundleVersion=$(read_plist_value "CFBundleVersion" "Info.plist")
updated_CFBundleShortVersionString=$(read_plist_value "CFBundleShortVersionString" "Info.plist")

# print the updated values
echo "Updated CFBundleVersion: $updated_CFBundleVersion"
echo "Updated CFBundleShortVersionString: $updated_CFBundleShortVersionString"

echo ""

cd .. && cd .. && cd scripts

echo "CFBundleVersion and CFBundleShortVersionString updated successfully for iOS!"
