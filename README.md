# 🚀 Nuxt 3 Technical Task

![Nuxt 3](https://img.shields.io/badge/Nuxt--3-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-F6C23A?style=for-the-badge&logo=vue.js&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

## 📖 1. Project Overview

A high-performance, responsive web application built to manage and display products using a public API. This technical task demonstrates proficiency in modern frontend development, showcasing a complete user flow from authentication to product discovery, designed with a focus on architecture, scalability, and exceptional user experience.

## ✨ 2. Core Features (Requirements Met)

*   **🔒 User Management:** Secure User Registration and Login system utilizing JWT for stateless authentication.
*   **🍪 Data Caching:** Strategic integration of Nuxt Cookies to handle session persistence seamlessly, ensuring full Server-Side Rendering (SSR) compatibility.
*   **🛍️ Product Catalog:** A visually appealing, responsive grid layout that beautifully displays product images, titles, and prices.
*   **🔍 Search & Discovery:** Real-time, debounce-optimized search functionality by title, coupled with dynamic category filtering to find exact products quickly.
*   **📄 Dynamic Details:** Dedicated, SEO-friendly product pages providing full descriptions, rich media, and category context fetched via dynamic routing.

## 🚀 3. Advanced Enhancements (Bonus Features)

*   **📦 State Management:** Fully implemented centralized state management using **Pinia** to ensure predictable data flow across components.
*   **⚡ Server-Side Pagination:** Efficient, optimized data fetching using limits and skips to dramatically improve performance and reduce payload size.
*   **🛡️ Robust Validation:** Comprehensive client-side validation logic enforcing strict Email and Password format requirements.
*   **💎 UX Excellence:** 
    *   **Loading Skeletons:** Smooth transition states to reduce perceived latency.
    *   **Error Handling:** Meaningful UI feedback for API failures or boundary conditions.
    *   **Anti-Double Submission:** Prevent duplicate network requests by disabling action buttons during active loading states.

## 🛠️ 4. Tech Stack

*   **Framework:** Nuxt 3 (Vue 3)
*   **Language:** TypeScript
*   **State Management:** Pinia
*   **Styling:** Tailwind CSS
*   **Testing:** Vitest

## 🧪 5. Quality Assurance (Testing)

Robust reliability is guaranteed through a comprehensive Unit Tests suite built with Vitest. The testing strategy covers:
*   **Auth Logic:** Validating login, registration, validation functions, and token storage.
*   **Pagination Algorithms:** Ensuring correct calculations for total items, skipped pages, and page limits.
*   **Component Rendering:** Verifying UI states, loading skeletons, error components, and form submit mechanisms.

## 💻 6. Setup Instructions

To run this project locally, simply follow these steps:

1. **Clone the repository and navigate into the project directory.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Run the unit tests:**
   ```bash
   npm run test # or vitest
   ```

## 📐 7. Evaluation Criteria Alignment

This project was built adhering strictly to professional software engineering standards:
*   **🧩 Component-based Structure:** Modular, reusable Vue components promoting DRY principles and clear separation of concerns.
*   **🧹 Clean Code Principles:** Readable, self-documenting TypeScript code leveraging strict typing, constants, and custom composables to encapsulate logic.
*   **🌳 Git Practices:** Meaningful commit history with descriptive messages reflecting atomic changes and structured feature development.
