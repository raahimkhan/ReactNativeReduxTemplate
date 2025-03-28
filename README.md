# React Native Redux Template

## Overview
This boilerplate provides a clean and modern starting point for React Native apps using Expo, Redux Toolkit, and TypeScript. It includes a minimal setup with essential features and best practices. The project uses the latest library and SDK versions for React, React Native, Expo, Expo Router, etc., as of March 10, 2025, and has the new architecture enabled.

## Features
- **Expo Router**: For smooth navigation, deep linking, and notifications handling.
- **Redux Toolkit**: For state management with slices.
- **Expo SecureStore**: For secure local storage.
- **TypeScript**: For type safety and better developer experience.
- **ESLint**: For specifying naming conventions and code style for files, directories, types, etc.
- **Theming**: Global theme context for consistent styling.
- **Modular Structure**: Organized by feature for scalability.

## Directory Structure
- **/app**: Expo Router setup with stack and tab navigation.
- **/src**: Main source code.
  - **assets/**: Project assets.
  - **blue-prints/**: TypeScript interfaces and types.
  - **global-store/**: Redux setup with slices.
  - **hooks/**: Custom hooks.
  - **local-store/**: SecureStore implementation.
  - **screens/**: Screen components.
  - **theme/**: Colors and styling.
- **/scripts**: Contains automation scripts for linting folder names, prebuild and postbuild processes, such as managing keystores and versioning.

## Configuration Files
- **app.json**: Project-specific configurations can be changed here as per requirements.
- **tsconfig.json**: TypeScript-related configurations.
- **eas.json**: Configuration for EAS builds.
- **eslint.config.mjs**: ESLint configuration with naming conventions and code style rules.

## Naming Conventions
- **Component Names**: PascalCase (e.g., `LandingPage`)
- **Types/Interfaces**: PascalCase (e.g., `UserInterface`)
- **Files**: 
  - Inside `screens/`: PascalCase to match component names (e.g., `Landing.tsx`, `TabOne.tsx`)
  - All other files: kebab-case (e.g., `user-slice.ts`)
  - Special cases: `_layout.tsx` and `+not-found.tsx` for Expo Router
- **Directories**: kebab-case (e.g., `global-store`)
- **Functions/Variables**: camelCase (e.g., `updateUserName`)

## Getting Started
1. **Clone the repository and navigate to the project directory**
   ```bash
   git clone <repository-url>
   cd react-native-redux-template
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a development build**
   
   Since this template includes packages with native code, a development build is required. The template supports both EAS and local builds.

   ### Using EAS (Recommended)
   1. Initialize EAS if you haven't:
      ```bash
      eas init
      ```
   2. Create development build:
      ```bash
      # For both platforms
      eas build --profile development --platform all
      
      # For Android only
      eas build --profile development --platform android
      
      # For iOS only
      eas build --profile development --platform ios
      ```
   3. Download and install the generated `.apk` (Android) or `.ipa` (iOS) files from Expo servers

   ### Building Locally
   > **Note:** Requires React Native development environment setup as per the [official documentation](https://reactnative.dev/docs/0.70/environment-setup?guide=native)
   
   1. Generate native projects:
      ```bash
      npm run prebuild
      ```
      This creates:
      - `android` and `ios` directories
      - Installs iOS pod files
      - Creates a `backup` folder with keystore files (keep this safe, do not commit)
   
   2. Build for your platform:
      ```bash
      # For Android
      npm run android
      
      # For iOS
      npm run ios
      ```

4. **Run the app**
   - Once the development build is installed, use `npm run start` and press `a` for Android or `i` for iOS.

## Customization
- **Add new screens**: Place them in `/src/screens`.
- **Add new stack routes**: Modify `/app/_layout.tsx`.
- **Add new tab routes**: Modify `/app/(tabs)/_layout.tsx`.
- **Add font and image files**: Place them in `/src/assets`.
- **Add types and interfaces**: Place them in `/src/blue-prints`.
- **Add global initial states and Redux slices**: Modify `/src/global-store`.
- **Configure local storage**: Modify `/src/local-store`.
- **Add fonts to be loaded**: Modify `/src/hooks/useLoadFonts.ts`.
- **Add custom hooks**: Place them in `/src/hooks`.
- **Add new themes or modify existing**: Modify `/src/theme`.
- **Add linting specific conventions and rules**: Modify `/eslint.config.mjs`.

**Note:** Usage of the theme context has been demonstrated in `/app/(tabs)/_layout.tsx`, which can be used as a reference for implementing the global theme provider.

## Environment Variables
- **.env**: Don't forget to add `.env` to `.gitignore`. It's included in the boilerplate for demonstration purposes, but should be ignored in production.

## ESLint Configuration
The project uses ESLint with TypeScript and React Native specific rules to enforce consistent code style:

### Naming Conventions
- **Files**: 
  - Inside `screens/`: Must be PascalCase (required by EAS build)
  - All other files: Must be kebab-case
  - Exceptions: `_layout.tsx` and `+not-found.tsx` for Expo Router
- **Directories**: kebab-case
- **Types/Interfaces**: PascalCase

### Linting Commands
```bash
# Run ESLint and directory name checks
npm run lint

# Fix the linting errors
npm run lint:fix
```

## Scripts
- **Scripts Directory**: Contains automation scripts for linting folder names, prebuild and postbuild processes, such as managing keystores and versioning.
- **Package.json Scripts**: Includes commands for building, running, and managing the app lifecycle.

## Cursor Editor
- This project includes Cursor rules specific to React Native, TypeScript, and mobile app development for users of the Cursor editor. 

## Contributing
Feel free to submit issues or pull requests for improvements and new features.
