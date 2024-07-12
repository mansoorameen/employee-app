## Setup

1. Clone the repository:

```bash
git clone https://github.com/mansoorameen/employee-app.git
cd EmployeeApp
```

### Install dependencies:

```bash
# using npm
npm install

# OR using Yarn
yarn
```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

install CocoaPods dependencies:
```bash
cd ios
pod install
cd ..
```
Then

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

### Features:

-View list of employees

-Search and filter employees

-View employee details

-Caching mechanism for improved performance
