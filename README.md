# 🍔 BurgerHub – React Native Food Ordering App

<div align="center">

![BurgerHub](https://img.shields.io/badge/BurgerHub-v1.0.0-orange?style=for-the-badge&logo=react)
![React Native](https://img.shields.io/badge/React%20Native-CLI-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux)
![Platforms](https://img.shields.io/badge/Platforms-iOS%20%7C%20Android-green?style=for-the-badge)

**A production-style burger listing and ordering app built with React Native, TypeScript, Redux, and AsyncStorage.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Project Structure](#-project-structure) • [Key Features](#-key-features)

</div>

---

## ✨ Features

### 🏠 Home Screen (Burger List)
- 📜 Browse 50+ delicious burgers from **TheMealDB API**
- 🔍 Real-time search functionality with instant filtering
- ♾️ Infinite scrolling with smooth pagination
- 🔄 Pull-to-refresh to reload latest burgers
- ⚡ Load and error states with user-friendly messages
- 💾 Cached data for instant app launch

### 🍔 Detail Screen
- 📸 High-quality burger images with progressive loading
- 📋 Detailed description and cooking instructions
- 🥘 Complete list of ingredients
- 🌍 Category and region information
- 🛒 One-tap add to cart functionality
- ✅ Success confirmation with action options

### 🛒 Cart Management
- ➕ Increase/decrease item quantities
- 🗑️ Remove individual items
- 💰 Real-time total price calculation
- 📊 Item count with smart badge (9+ indicator)
- 🎯 Checkout functionality
- 🔄 Continue shopping button

### 💾 Data Persistence
- 📱 Offline access with cached burger list
- 💿 Persistent pagination state
- 🔄 Auto-save on app backgrounding
- ⚙️ App lifecycle handling (foreground, background, killed)

### 🎯 Advanced Features
- 🔒 Type-safe Redux state management
- 📐 Responsive design for all screen sizes
- 🌈 Consistent design language throughout
- 🎨 Beautiful UI with custom components
- ♿ Accessible navigation and interactions

---

## 🛠️ Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | React Native (CLI) | Latest |
| **Language** | TypeScript | 5.0+ |
| **State Management** | Redux Toolkit | Latest |
| **Navigation** | React Navigation | 6.x |
| **Storage** | AsyncStorage | Latest |
| **API** | TheMealDB | REST API |
| **UI Components** | React Native Core | Native |
| **Build Tool** | Metro Bundler | Built-in |

---

## 📋 Requirements

Before you begin, ensure you have the following installed:

### macOS (for iOS)
- **Node.js** 14+ (`node --version`)
- **npm** 6+ (`npm --version`)
- **Watchman** (for file watching)
  ```bash
  brew install watchman
  ```
- **Xcode** 12+ with Command Line Tools
- **CocoaPods**
  ```bash
  sudo gem install cocoapods
  ```

### Windows/macOS (for Android)
- **Java Development Kit (JDK)** 11 or higher
- **Android Studio** with SDK installed
- **Android SDK** (API 21+)
- **Android Virtual Device** or physical phone

---

## 🚀 Installation

### Step 1: Clone/Create Project
```bash
# If creating new project
npx react-native init BurgerHub --template typescript

# Or clone from GitHub
git clone [<your-repo-url>](https://github.com/OSSM-0224)
cd burgerhub
```

### Step 2: Install Dependencies
```bash
# Install npm packages
npm install

# Install iOS pods (macOS only)
cd ios
pod install
cd ..
```

### Step 3: Verify Installation
```bash
# Check React Native setup
npx react-native doctor

# Install Metro CLI if needed
npm install --save-dev @react-native-community/cli-metro
```

---

## 📱 Running the App

### Android
```bash
# Run on Android emulator
npm run android

# Or using npx
npx react-native run-android

# With specific device
adb devices  # List devices
npx react-native run-android --deviceId=<device-id>
```

### iOS
```bash
# Run on iOS simulator
npm run ios

# Or using npx
npx react-native run-ios

# Specific simulator
npx react-native run-ios --simulator="iPhone 15"
npx react-native run-ios --simulator="iPhone 14 Pro"
npx react-native run-ios --simulator="iPhone SE"

# Physical device
npx react-native run-ios --device
```

### Development Mode
```bash
# Start Metro bundler (runs automatically with npm run)
npm start

# Then in another terminal:
npm run android
# or
npm run ios
```

---

## 📂 Project Structure

```
BurgerHub/
├── src/
│   ├── api/
│   │   └── burgersApi.ts              # 🌐 API calls to TheMealDB
│   │
│   ├── components/
│   │   ├── BurgerCard.tsx             # 🎨 Burger card with image
│   │   └── SearchBar.tsx              # 🔍 Search input component
│   │
│   ├── navigation/
│   │   ├── AppNavigator.tsx           # 🗺️ Stack navigator setup
│   │   └── types.ts                   # 📝 Navigation types
│   │
│   ├── redux/
│   │   ├── store.ts                   # 🏪 Redux store config
│   │   ├── burgersSlice.ts            # 🍔 Burgers state management
│   │   └── cartSlice.ts               # 🛒 Cart state management
│   │
│   ├── screens/
│   │   ├── BurgerListScreen.tsx       # 🏠 Home screen with list
│   │   ├── BurgerDetailScreen.tsx     # 📄 Burger details screen
│   │   └── CartScreen.tsx             # 🛒 Shopping cart screen
│   │
│   ├── storage/
│   │   └── persist.ts                 # 💾 AsyncStorage helpers
│   │
│   ├── types/
│   │   ├── burger.ts                  # 📋 Burger interfaces
│   │   └── index.ts                   # 🔄 Type exports
│   │
│   └── App.tsx                        # 🎬 Root component
│
├── ios/                               # 🍎 iOS native code
├── android/                           # 🤖 Android native code
├── package.json                       # 📦 Dependencies
├── tsconfig.json                      # ⚙️ TypeScript config
└── README.md                          # 📖 This file
```

---

## 🧠 Redux State Architecture

### Burgers State
```typescript
{
  burgers: Burger[],              // All fetched burgers
  filteredBurgers: Burger[],      // Search filtered results
  currentPage: number,            // Current pagination page
  loading: boolean,               // API loading state
  error: string | null,           // Error messages
  searchQuery: string,            // Current search text
  pageSize: number                // Items per page (10)
}
```

### Cart State
```typescript
{
  items: CartItem[],              // Items in cart
                                  // (extends Burger + quantity)
}
```

---

## 🔄 App Flow & Lifecycle

```
┌─────────────────────────────────────────────┐
│ 1. APP LAUNCH                               │
├─────────────────────────────────────────────┤
│ ✓ Load cached burgers from AsyncStorage    │
│ ✓ Display cached data (instant UI)         │
│ ✓ Fetch fresh data from API (async)        │
│ ✓ Update Redux store on success            │
│ ✓ Re-cache updated data                    │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│ 2. USER INTERACTION                         │
├─────────────────────────────────────────────┤
│ • Search burgers (client-side filtering)   │
│ • Infinite scroll (load more pages)        │
│ • Tap burger → View details                │
│ • Add to cart → Update Redux               │
│ • View cart → Browse & checkout            │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│ 3. APP BACKGROUNDING                        │
├─────────────────────────────────────────────┤
│ • AppState listener triggers                │
│ • Save current page to AsyncStorage        │
│ • Save cart items (optional)               │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│ 4. APP FOREGROUND (Resume)                  │
├─────────────────────────────────────────────┤
│ • Restore cached data instantly            │
│ • Restore pagination state                 │
│ • User resumes from where they left off    │
└─────────────────────────────────────────────┘
```

---

## 🎯 Key Technical Decisions

### 1. **Redux over Context API**
Why Redux? 
- ✅ Scales for complex state
- ✅ Redux DevTools for debugging
- ✅ Easy time-travel debugging
- ✅ Middleware support
- ✅ Industry standard

### 2. **Client-Side Pagination**
Why not server-side?
- ✅ TheMealDB doesn't support pagination params
- ✅ Fetch all burgers once (50 items is fine)
- ✅ Instant search filtering (no API calls)
- ✅ Smooth infinite scroll UX
- ✅ Reduced API requests

### 3. **AsyncStorage for Persistence**
Why AsyncStorage?
- ✅ Lightweight and simple
- ✅ Cross-platform (iOS + Android)
- ✅ Perfect for app state caching
- ✅ No external backend needed
- ✅ Great for offline support

### 4. **Component Isolation**
Benefits:
- ✅ Reusable components (SearchBar, BurgerCard)
- ✅ Easy to test
- ✅ Maintainable codebase
- ✅ Follows React best practices

### 5. **Full TypeScript Coverage**
Advantages:
- ✅ Catch errors at compile time
- ✅ Better IDE autocomplete
- ✅ Self-documenting code
- ✅ Easier refactoring
- ✅ Professional standards

---

## 🌐 API Configuration

**API Used:** [TheMealDB](https://www.themealdb.com/api.php)

### Base URL
```typescript
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
```

### Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `/search.php?s=burger` | Search burgers by name |
| `/lookup.php?i={id}` | Get burger details by ID |

### Example Response
```json
{
  "meals": [
    {
      "idMeal": "52772",
      "strMeal": "Teriyaki Ramen",
      "strCategory": "Seafood",
      "strArea": "Japanese",
      "strMealThumb": "https://...",
      "strInstructions": "...",
      "strIngredient1": "...",
      ...
    }
  ]
}
```

---

## 🎨 UI/UX Highlights

### Design Tokens
- **Primary Color:** `#ff6b35` (Orange)
- **Background:** `#fafafa` (Light Gray)
- **Surface:** `#ffffff` (White)
- **Text Dark:** `#333333`
- **Text Light:** `#999999`
- **Error:** `#ff3b30` (Red)

### Components

#### BurgerCard
- 📸 Burger image with lazy loading
- 📝 Title, category, region info
- 🎨 Clean card design with shadows
- ✨ Smooth tap animation

#### SearchBar
- 🔍 Real-time search input
- 🎯 Instant filtering
- ⌨️ Keyboard integration
- 🎨 Rounded design

#### CartIcon Badge
- 🛒 Floating cart icon
- 🔴 Dynamic red badge
- 🔢 Item count (9+ indicator)
- ✨ Always visible in header

---

## 📊 Performance Optimizations

### 1. FlatList Optimization
```typescript
<FlatList
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  onEndReachedThreshold={0.5}
/>
```

### 2. Image Loading
- Progressive rendering enabled
- Cache strategy implemented
- Lazy loading with ActivityIndicator
- Optimized image dimensions

### 3. Memory Management
- Proper cleanup in useEffect
- Redux selector memoization
- AsyncStorage async operations
- AppState listener cleanup

---

## 🧪 Testing Checklist

### Android Testing
- [ ] App launches without errors
- [ ] All 50+ burgers load
- [ ] Search filters correctly
- [ ] Infinite scroll works smoothly
- [ ] Cart functionality works
- [ ] Images load properly
- [ ] Keyboard dismisses
- [ ] Navigation transitions smooth
- [ ] App state saves/restores
- [ ] Offline functionality works

### iOS Testing
- [ ] App launches without errors
- [ ] All 50+ burgers load
- [ ] Search filters correctly
- [ ] Infinite scroll works smoothly
- [ ] Cart functionality works
- [ ] Images load properly (with caching)
- [ ] Safe area handled (notch, etc.)
- [ ] Keyboard dismisses
- [ ] Navigation transitions smooth
- [ ] App state saves/restores

---

## 🚀 Building for Production

### Android Release Build
```bash
# Create release APK
cd android
./gradlew assembleRelease
# APK will be at: android/app/build/outputs/apk/release/

# Or AAB for Play Store
./gradlew bundleRelease
```

### iOS Release Build
```bash
# Build for TestFlight/App Store
npx react-native run-ios --configuration Release

# Or using Xcode
# Product → Scheme → Edit Scheme → Release
# Product → Archive
```

---

## 🔧 Troubleshooting

### Metro Bundler Issues
```bash
# Clear cache
npm start -- --reset-cache

# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Android Issues
```bash
# Clean build
cd android
./gradlew clean
cd ..
npm run android

# Clear Android cache
rm -rf ~/Library/Android/sdk/system-images/
```

### iOS Issues
```bash
# Clear Pods and reinstall
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# Clear Xcode cache
rm -rf ~/Library/Developer/Xcode/DerivedData/*
npm run ios
```

### API Issues
```bash
# Test API manually
curl "https://www.themealdb.com/api/json/v1/1/search.php?s=burger"

# Check network in console
# Enable debugging in Redux DevTools
```

---

## 📈 Future Improvements

### Short Term (High Priority)
- [ ] Add favorites/wishlist feature
- [ ] Implement cart persistence (AsyncStorage)
- [ ] Add skeleton loaders for better UX
- [ ] Debounce search input
- [ ] Add success toast notifications

### Medium Term (Medium Priority)
- [ ] Unit tests (Jest + React Native Testing Library)
- [ ] Integration tests
- [ ] Image caching library
- [ ] Animated transitions
- [ ] Filter by category/region
- [ ] Sort by name/popularity

### Long Term (Low Priority)
- [ ] Backend API with pagination
- [ ] User authentication
- [ ] Order history
- [ ] Ratings & reviews
- [ ] Push notifications
- [ ] Offline sync queue
- [ ] Analytics integration
- [ ] Payment gateway integration

---

## 📝 API Customization

### Changing the API Base URL

If you need to change the API endpoint:

```typescript
// src/api/burgersApi.ts

// Current
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Change to
const BASE_URL = 'https://your-custom-api.com/api/v1';
```

### Changing Search Query

```typescript
// src/screens/BurgerListScreen.tsx

// Current - searches for "burger"
const data = await burgersApi.searchBurgers('burger');

// Change to
const data = await burgersApi.searchBurgers('pizza');
```

---

## 📋 Requirements Fulfillment

| Requirement | Implementation | Status |
|-------------|-----------------|--------|
| 2–3 Screens | BurgerList + BurgerDetail + Cart | ✅ |
| Large List (50+) | TheMealDB API returns ~50 burgers | ✅ |
| Search | Real-time Redux filtering | ✅ |
| Pagination | Client-side infinite scroll | ✅ |
| Redux | Full Redux Toolkit setup | ✅ |
| AsyncStorage | Burgers + page state persisted | ✅ |
| App Lifecycle | AppState listener implemented | ✅ |
| TypeScript | 100% type coverage | ✅ |
| No Third-Party UI | Pure React Native only | ✅ |
| iOS Support | Full iOS compatibility | ✅ |
| Android Support | Full Android compatibility | ✅ |
| Clean Code | Modular, scalable structure | ✅ |

---

## 📞 Support & Documentation

### React Native Docs
- [Official Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

### TheMealDB API
- [API Documentation](https://www.themealdb.com/api.php)
- [Example Requests](https://www.themealdb.com/api/json/v1/1/search.php?s=burger)

### Community
- [React Native Discord](https://discord.gg/react)
- [Redux Community](https://redux.js.org/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👨‍💻 Author

Built as a **React Native Assignment** showcasing:
- Production-quality code
- Clean architecture
- State management best practices
- Cross-platform development
- Professional standards

**GitHub:** https://github.com/OSSM-0224
**LinkedIn:** https://www.linkedin.com/in/om-mhatre-8b819025b/

---

## 🎉 Acknowledgments

- 🍔 **TheMealDB** for providing the free API
- ⚛️ **React Native** for cross-platform framework
- 🏪 **Redux** for state management
- 🗺️ **React Navigation** for routing
- ❤️ **Open Source Community** for amazing tools

---

<div align="center">

### Made with ❤️ using React Native

**If you found this helpful, please star the repository!** ⭐

[⬆ Back to Top](#-burgerhub--react-native-food-ordering-app)

</div>
