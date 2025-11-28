# 🚀 Project Title
Landing Page - A React application using Redux to demonstrate various React and AWS features.

# 📝 Overview
This project is a React application that demonstrates how to use:

* React for building UI components

* Redux Toolkit for global state management

* React Router v6 for navigation

* Vite build tool for fast env

* Axios / Fetch API for making API calls

* AWS Incognito for online user management (Registration, login, logout, password reset email confirmation etc.)
* Git Action to deploy to AWS S3




# ⭐ Features

* 🔄 Global state management with Redux Toolkit

* 📍 Protected and public routes

* 🎨 Modular component structure

* ⚡ Fast dev environment with Vite

* 🔐 Authentication flow example

* ✏️ User login flow

* 🚪 User logout flow

* ✒️ User registration flow (Using AWS Incognito)

* 📧 User email confirmation flow

* ❓ User password reset flow


# 🛠 Tech Stack
| Technology    | Purpose               |
| ------------- | --------------------- |
| React         | UI library            |
| Redux Toolkit | State management      |
| React Router  | Routing               |
| Axios         | HTTP requests         |
| Vite          | Build tool            |
| Tailwindcss   | CSS library           |
| AWS Incognito | User management       |
| AWS S3        | Auto deployed to S3   |
| AWS Cloudfront| Serves website live.  |
| AWS Lambda    | Handles chat bot      |
| AWS Cloudwatch| Handle logs           |
| AWS API GW.   | Called by chat bot    |
| AWS Bedrock   | Inteprets chat message|

# 🚀 Getting Started
### Local Machine
1. Clone the repository (you can run the create-react-redux-project to manually create folders and files)
```
git clone https://github.com/olwenza/landing-page.git
cd your-repo
```
2. Update your package lists.
```
brew update
```

3. Install Node.js and npm.
```
brew install node
``` 
 
4. Install tailwindcss
```
npm install -D @tailwindcss/postcss
```

5. Install vite
```
npm install @vitejs/plugin-react
```

6. Install react-icons
```
npm install react-icons
```

7. Install Cryptojs - to compute secret hash correctly
```
npm install crypto-js
```

8. Clean install
```
rm -rf node_modules package-lock.json
npm install
```

 9. Run - Locally - Start the development server
```
npm run dev
```

10. Run - Locally - Start the development server
```
npm run dev
```

11. App will lunch at the followig URL
```
http://localhost:5174/
```

### Remote
1. Push your branch changes into dev branch and app will be auto uploaded to a s3 bucket via github action 
2. Live app will be lunch via Cloudfront at
```
d11atov17l37i4.cloudfront.net
```
 

## Authors
Contributors names and contact info

Ivan Augustino
[@ivanaugustino](https://www.linkedin.com/in/ivanaugustino/)

# 📄 License
This project is licensed under the MIT License.
