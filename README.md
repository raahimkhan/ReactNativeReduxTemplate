# React Native Redux Template

## Overview
This boilerplate provides a clean and modern starting point for React Native apps using Expo, Redux, and TypeScript. It includes a minimal setup with essential features and best practices.

## Features
- **Expo Router**: For smooth navigation and deep linking.
- **Redux Toolkit**: For state management with slices.
- **Expo SecureStore**: For secure local storage.
- **TypeScript**: For type safety and better developer experience.
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

## Naming Conventions
- **Components**: PascalCase (e.g., `LandingPage.tsx`)
- **Files/Directories**: kebab-case (e.g., `user-slice.ts`)
- **Functions/Variables**: camelCase (e.g., `updateUserName`)

## Getting Started
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-native-redux-template
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the app**
   ```bash
   npx expo start
   ```

## Customization
- **Add new screens**: Place them in `/src/screens`.
- **Add new Redux slices**: Place them in `/src/global-store/slices`.
- **Add new hooks**: Place them in `/src/hooks`.
- **Update theme**: Modify `/src/theme/colors.ts` and `/src/theme/theme-context.tsx`.

## Contributing
Feel free to submit issues or pull requests for improvements and new features.

## License
This project is licensed under the MIT License. 