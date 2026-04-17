# Blackwolf Next E-commerce

This project is a Next.js application that serves as a frontend for an e-commerce platform powered by WordPress and WooCommerce. It utilizes App Routes and Shadcn for a modern and responsive user interface.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow the instructions below to set up the project locally.

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- A WordPress installation with WooCommerce enabled

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/blackwolf-next-ecommerce.git
   cd blackwolf-next-ecommerce
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Copy the `.env.example` file to `.env` and configure your environment variables:
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your WordPress API URL and other necessary configurations.

### Configuration

Refer to the `CONFIGURACION.md` file for detailed instructions on how to configure your WordPress installation to work with this Next.js application.

### Usage

To run the development server, use the following command:
```
npm run dev
```
or
```
yarn dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

### Deployment

For deploying the application, you can use platforms like Vercel, Netlify, or any other hosting service that supports Next.js.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.