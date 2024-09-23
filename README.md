# Cognito Test Project

This project is a test application that demonstrates the integration of AWS Cognito for user authentication and management. The application includes various components to handle user registration, login, and product management.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Components Breakdown](#components-breakdown)
- [Running Tests](#running-tests)

## Setup Instructions

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. **Clone the repository:**

    ```bash
    [git clone https://github.com/ssandlan/cognito-test](https://github.com/ssandlan/cognito-test.git)
    cd cognito-test
    ```

2. **Install dependencies:**

    Using npm:
    ```bash
    npm install
    ```

3. **Start the development server:**

    Using npm:
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Components Breakdown

### Products Components

- **ProductList.tsx**: Displays a list of products fetched from an API. It uses the `useQuery` hook from `react-query` to manage data fetching and state.

- **ProductCard.tsx**: Displays individual product details, including name, description, and price. It also includes an "Add to Basket" button to add the product to the user's basket.

### UI Components

- **Button.tsx**: A reusable button component that can be customized with different styles and behaviors.

- **Home Carousel**: A homepage carousel using Swiper.js

### Context API

- **basket-context.tsx**: Provides context for managing the user's basket, including adding, removing, and clearing items.


### Utilities

- **fetchProducts.ts**: Utility function for fetching products from the API.
- **getProductImgSrc.ts**: Utility function to get the product image URL based on the product ID.
- **shuffleArray.ts**: Utility to shuffle the order of products so that it can simulate the top products that are displayed on the homepage.

## Running Tests

To run the tests, use the following command:

Using npm:
```bash
npm test
```

This will run the test suite using Vitest and display the results in the terminal.
