const { withAppBuildGradle } = require('@expo/config-plugins');

const androidBuildOptimizations = (config) => {
    return withAppBuildGradle(config, (config) => {
        let buildGradle = config.modResults.contents;
        const targetLine = `def enableProguardInReleaseBuilds = (findProperty('android.enableProguardInReleaseBuilds') ?: false).toBoolean()`;
        if (buildGradle.includes(targetLine)) {
            buildGradle = buildGradle.replace(targetLine, `def enableProguardInReleaseBuilds = true`);
        }
        else {
            throw new Error(`Target line '${targetLine}' not found in build.gradle. Make sure it exists.`);
        }
        const targetLine2 = `def jscFlavor = 'org.webkit:android-jsc:+'`;
        if (buildGradle.includes(targetLine2)) {
            buildGradle = buildGradle.replace(targetLine2, `${targetLine2}\ndef keystorePropertiesFile = rootProject.file("keystore.properties")\ndef keystoreProperties = new Properties()\nkeystoreProperties.load(new FileInputStream(keystorePropertiesFile))`);
        }
        else {
            throw new Error(`Target line '${targetLine2}' not found in build.gradle. Make sure it exists.`);
        }
        const targetLine3 = `compileSdk rootProject.ext.compileSdkVersion`;
        if (buildGradle.includes(targetLine3)) {
            buildGradle = buildGradle.replace(targetLine3, `${targetLine3}\n\n// please follow the convention below while updating versionName\n// let's assume current version is 1.0.0 for example\n// patch -> 1.0.1\n// minor -> 1.1.0\n// major -> 2.0.0\n// prepatch -> 1.0.1-0\n// preminor -> 1.1.0-0\n// premajor -> 2.0.0-0\n// prerelease -> 1.0.1-0`);
        }
        else {
            throw new Error(`Target line '${targetLine3}' not found in build.gradle. Make sure it exists.`);
        }
        const debugBlock = `debug {\n            storeFile file('debug.keystore')\n            storePassword 'android'\n            keyAlias 'androiddebugkey'\n            keyPassword 'android'\n        }`;
        const releaseBlock = `release {\n            storeFile file(keystoreProperties['KEYSTORE_FILE'])\n            storePassword keystoreProperties['KEYSTORE_PASSWORD']\n            keyAlias keystoreProperties['KEY_ALIAS']\n            keyPassword keystoreProperties['KEY_PASSWORD']\n        }`;
        const debugBlockIndex = buildGradle.indexOf(debugBlock);
        if (debugBlockIndex !== -1) {
            const insertPosition = debugBlockIndex + debugBlock.length;
            buildGradle = [
                buildGradle.slice(0, insertPosition),
                `\n\n${releaseBlock}`,
                buildGradle.slice(insertPosition),
            ].join('');
        }
        else {
            throw new Error(`Target debug block not found in build.gradle. Make sure it exists.`);
        }
        const oldReleaseBlock = `release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug
            shrinkResources (findProperty('android.enableShrinkResourcesInReleaseBuilds')?.toBoolean() ?: false)
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            crunchPngs (findProperty('android.enablePngCrunchInReleaseBuilds')?.toBoolean() ?: true)
        }`;
        const newReleaseBlock = `release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.release
            shrinkResources true
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            crunchPngs true
        }`;
        if (buildGradle.includes(oldReleaseBlock)) {
            buildGradle = buildGradle.replace(oldReleaseBlock, newReleaseBlock);
        }
        else {
            throw new Error(`Target release block not found in build.gradle. Make sure it exists.`);
        }
        const oldLine = `useLegacyPackaging (findProperty('expo.useLegacyPackaging')?.toBoolean() ?: false)`;
        const newLine = `useLegacyPackaging true`;
        if (buildGradle.includes(oldLine)) {
            buildGradle = buildGradle.replace(oldLine, newLine);
        }
        else {
            throw new Error(`Target line '${oldLine}' not found in build.gradle. Make sure it exists.`);
        }
        config.modResults.contents = buildGradle;
        return config;
    });
};

module.exports = androidBuildOptimizations;
