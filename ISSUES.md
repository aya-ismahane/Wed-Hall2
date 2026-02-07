# Wedding Halls Project – Issues List

This document lists all identified issues in the backend and frontend, grouped by severity.

---

## Backend (`weddingHallProjectBackend`)

### Critical

| # | Issue | Location | Description |
|---|--------|----------|-------------|
| B1 | **Client signup vs login use different tables** | `auth/signup_client.php` vs `redaWork/login.php` | Signup inserts into `client_profile` (full_name, email, password, phone, city). Login and `auth/getCurrentUser.php` use table `client` (client_fn, client_email, client_password, etc.). Newly registered clients cannot log in. |
| B2 | **Database credentials hardcoded** | `connectToDB.php` | DB host, user, and password are in source. Security risk and not environment-friendly. |
| B3 | **ownerProfileUpdate returns wrong data** | `aishaWork/ownerProfileUpdate.php` | Script fetches the updated owner twice; second fetch returns `false`, so response sends `'owner' => false`. |

### Moderate

| # | Issue | Location | Description |
|---|--------|----------|-------------|
| B4 | **Missing CORS/bootstrap on some endpoints** | `aishaWork/ownerUpdateHall.php`, `ownerDeleteHall.php`, `ayaWork/getHallCard.php` | These files do not require `bootstrap.php`, so CORS headers (and session where needed) are missing when called from the React app. |
| B5 | **Duplicate getCurrentUser implementations** | `auth/getCurrentUser.php` vs `akramWork/getCurrentUser.php` | Two different behaviors (session-based vs id query). Confusing and inconsistent. |
| B6 | **Redundant require connectToDB** | `auth/getCurrentUser.php`, `akramWork/getAllHalls.php`, etc. | They require both `bootstrap.php` and `connectToDB.php`; bootstrap already includes connectToDB. |
| B7 | **ownerProfileUpdate expects $_POST only** | `aishaWork/ownerProfileUpdate.php` | Uses `$_POST`; frontend may send JSON. Should accept JSON body for API consistency. |
| B8 | **ownerProfileUpdate missing strict_types** | `aishaWork/ownerProfileUpdate.php` | Inconsistent with other PHP files. |

### Minor

| # | Issue | Location | Description |
|---|--------|----------|-------------|
| B9 | **hall.created_at dependency** | `aishaWork/getOwnerHalls.php` | Query uses `h.created_at`; ensure `hall` table has this column. |
| B10 | **Mixed response style** | Various endpoints | Some use `send_json()`, others use `echo json_encode()` + `header()`. Standardizing improves maintainability. |

---

## Frontend (`src`)

### Critical

| # | Issue | Location | Description |
|---|--------|----------|-------------|
| F1 | **ProfilePopup not wired to backend or parent** | `ProfilePopup.jsx`, `Dashboard.jsx` | ProfilePopup expects `setOwner` but Dashboard does not pass it. No API call to save owner profile. Edits are lost. |
| F2 | **Auth context not refreshed after profile update** | `AuthContext.js`, Dashboard | After profile update, user state in app is not refetched. |

### Moderate

| # | Issue | Location | Description |
|---|--------|----------|-------------|
| F3 | **Requests/History use mock data only** | `RequestsProvider.jsx`, `RequestsPage.jsx` | Hardcoded requests/history; backend has `ownerRequests`, `ownerRequestAccept`, `ownerRequestReject`, `ownerHistory` but frontend does not call them. |
| F4 | **Favourites are client-side only** | `ViewHalls.jsx`, `OneHall.jsx`, `App.js` | Favourites kept in React state only; backend has `addToFavourite`, `deleteFromFavourite`, `getFavoriteHalls` but they are not used. |
| F5 | **API base URL hardcoded** | `AuthContext.js` | `API_BASE = "http://localhost:8000"`. Should use environment variable for different deployments. |
| F6 | **Typo in hall detail** | `hall-card.jsx` | Variable named `currnetHall` instead of `currentHall` (used in state and API calls). |
| F7 | **OneHall favourite removal by name** | `OneHall.jsx` | Uses `item.name !== hall.name`; two halls with same name would both be removed. Should use `item.id !== hall.id`. |

### Minor

| # | Issue | Location | Description |
|---|--------|----------|-------------|
| F8 | **Deleted CSS files still imported** | Various components | Git shows deleted CSS (e.g. HallList.css, OneHall.css, ProfilePopup.css). Ensure files exist or remove imports. |
| F9 | **Multiple login/signup routes** | `App.js` | Many routes: /login, /login2, /login3, /Signupo, /Signupc, etc. Consider consolidating. |
| F10 | **Inconsistent folder naming** | `components/` | AishaComponents vs Ayacomponents vs akramComponents vs redacomponents. |
| F11 | **Invalid JSX: class instead of className** | `ViewHalls.jsx` | Uses `class="fa-solid fa-magnifying-glass"`; should be `className`. |
| F12 | **Client redirect after login** | `LogInPage.jsx` | Clients sent to `/landingpage`; consider `/explore` or `/profile` depending on product intent. |

---

## Summary

| Severity | Backend | Frontend |
|----------|---------|----------|
| Critical | 3 | 2 |
| Moderate | 5 | 5 |
| Minor   | 2 | 5 |
