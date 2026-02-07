# Wedding Halls Project – Fixes Applied & Database Schema

This document lists all fixes applied (critical and moderate), remaining minor items, and required database schema.

---

## 1. Fixes Applied

### Backend

| Issue | Fix |
|-------|-----|
| **B1 – Client signup vs login tables** | `auth/signup_client.php` now inserts into the same table used by login: **`client`**, with columns `client_fn`, `client_email`, `client_password`, `client_phn`, `client_pfp`, `client_wilaya`. Frontend can send `fullName` or `full_name`, and `wilaya` or `city`. |
| **B2 – Hardcoded DB credentials** | `connectToDB.php` now uses environment variables with fallbacks: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`. Set these in your environment (e.g. `.env` or server config) for production. |
| **B3 – ownerProfileUpdate wrong response** | Removed the duplicate `$owner = $stmt->fetch()` so the response returns the updated owner object correctly. |
| **B4 – Missing CORS on some endpoints** | `aishaWork/ownerUpdateHall.php`, `aishaWork/ownerDeleteHall.php`, and `ayaWork/getHallCard.php` now require `bootstrap.php` so CORS and session are applied. |
| **B5 – Duplicate getCurrentUser** | No code change; `auth/getCurrentUser.php` remains the canonical session-based endpoint. `akramWork/getCurrentUser.php` is a different endpoint (get user by id). Documented for clarity. |
| **B6 – Redundant require connectToDB** | Removed redundant `require_once connectToDB.php` from `auth/getCurrentUser.php`, `akramWork/getAllHalls.php`, and `aishaWork/getOwnerHalls.php` (bootstrap already includes it). |
| **B7 – ownerProfileUpdate POST only** | `ownerProfileUpdate.php` now accepts both JSON body (`Content-Type: application/json`) and traditional POST. Uses `fullName` / `full_name`, `phone`, `wilaya`. |
| **B8 – ownerProfileUpdate strict_types** | Added `<?php` and `declare(strict_types=1);` at the top of `ownerProfileUpdate.php`. |
| **Accept/Reject JSON** | `aishaWork/ownerRequestAccept.php` and `ownerRequestReject.php` now accept JSON body (`owner_id`, `request_id`) in addition to POST. |
| **Favourites JSON** | `akramWork/addToFavourite.php` and `deleteFromFavourite.php` now accept JSON body (`client_id`, `hall_id`) in addition to POST. |

### Frontend

| Issue | Fix |
|-------|-----|
| **F1 – ProfilePopup not wired** | `ProfilePopup` now accepts `API_BASE` and `onSaveSuccess`. On Save it POSTs JSON to `aishaWork/ownerProfileUpdate.php` and calls `onSaveSuccess()` on success. `Dashboard` passes `refreshUser` as `onSaveSuccess` so auth state is refreshed after update. |
| **F2 – Auth not refreshed after profile update** | `AuthContext` now exposes `refreshUser()` which re-runs `checkAuth()`. Dashboard calls it after a successful profile save. |
| **F3 – Requests/History mock data** | `RequestsPage` and `HistoryPage` now fetch from the API: `aishaWork/ownerRequests.php?owner_id=...` and `aishaWork/ownerHistory.php?owner_id=...`. Accept/Reject call `ownerRequestAccept.php` and `ownerRequestReject.php` with JSON body. Mock `RequestsProvider` is no longer used by these pages. |
| **F4 – Favourites client-side only** | When the user is a client, `ViewHalls` fetches favourites from `akramWork/getFavoriteHalls.php?id=user.id` and sets `myFavourite`. `OneHall` now receives `API_BASE`, `user`, and `userRole` and calls `addToFavourite.php` / `deleteFromFavourite.php` when toggling; local state is updated after a successful API response. |
| **F5 – API base URL hardcoded** | `AuthContext` now uses `process.env.REACT_APP_API_URL || "http://localhost:8000"`. Set `REACT_APP_API_URL` in `.env` for production. |
| **F6 – Typo currnetHall** | In `hall-card.jsx`, renamed `currnetHall` to `currentHall` everywhere. |
| **F7 – OneHall favourite by name** | In `OneHall.jsx`, favourite removal now uses `item.id !== hall.id` instead of `item.name !== hall.name`. |
| **F11 – Invalid JSX class** | In `ViewHalls.jsx`, changed `class="fa-solid fa-magnifying-glass"` to `className="fa-solid fa-magnifying-glass"`. |

---

## 2. Database Schema – Required Tables & Columns

The application expects the following. Ensure your database has these (or equivalent) for the fixes to work.

### 2.1 Client (for login and signup)

Used by `redaWork/login.php`, `auth/getCurrentUser.php`, and `auth/signup_client.php`.

| Table | Columns (minimum) |
|-------|--------------------|
| **client** | `id` (PK), `client_fn`, `client_email` (unique), `client_password`, `client_phn`, `client_pfp`, `client_wilaya`, `created_at` (optional) |

**Note:** Signup now writes only to `client`. If you still have `client_profile`, you can keep it for other uses or migrate; login and getCurrentUser use only `client`.

### 2.2 Owner

| Table | Columns (minimum) |
|-------|--------------------|
| **owner_profile** | `id` (PK), `full_name`, `email` (unique), `password`, `phone`, `wilaya`, `picture`, `created_at`, `updated_at` |

### 2.3 Halls

Backend uses **`hall`** (singular) in `getAllHalls.php`, `getOwnerHalls.php`, and `getHallCard.php`:

| Table | Columns (minimum) |
|-------|--------------------|
| **hall** | `id` (PK), `hall_name`, `hall_desc`, `hall_price`, `hall_att`, `hall_leng`, `hall_images` (JSONB or text), `owner_id` (FK to owner_profile), `created_at` (optional but used in `getOwnerHalls` ORDER BY) |

**Note:** `aishaWork/ownerUpdateHall.php` and `ownerDeleteHall.php` currently use table **`halls`** (plural) with columns `name`, `price`, `description`, `id`, `owner_id`. If your DB has only `hall`, you will need to either (a) add a `halls` table and keep it in sync, or (b) change those two scripts to use `hall` and the same column names as the rest of the app (`hall_name`, etc.). Documented here for schema consistency.

### 2.4 Owner requests & history

| Table | Purpose |
|-------|---------|
| **owner_requests** | `id`, `owner_id`, `hall_id`, `client_name`, `client_phone`, `hall_name`, `start_date`, `end_date`, `status` ('pending' / 'accepted' / 'rejected'), `created_at`, `updated_at` |
| **owner_history** | `id`, `owner_id`, `owner_request_id`, `hall_id`, `client_name`, `client_phone`, `hall_name`, `start_date`, `end_date`, `status`, `completed_at` |

See `aishaWork/owner_schema.sql` for a full example.

### 2.5 Favourites

| Table | Columns |
|-------|---------|
| **favorite** | `client_id`, `hall_id` (unique pair or PK on both) |

### 2.6 Bookings & rating

Used by hall detail, booking creation, and ratings:

| Table | Purpose |
|-------|---------|
| **booking** | `id`, `client_id`, `hall_id`, `start_date`, `end_date`, `status`, etc. |
| **rating** | `id`, `hall_id`, `client_id`, `rating`, `comment`, `created_at` |

---

## 3. Schema Changes To Do (if not already present)

1. **Ensure `client` table exists** with columns above. If you only had `client_profile`, create `client` and optionally migrate or sync data.
2. **Ensure `hall` has `created_at`** if you use `getOwnerHalls.php` (it uses `ORDER BY h.created_at DESC`).
3. **Unify hall table usage:** Either rename/use `hall` everywhere and update `ownerUpdateHall.php` / `ownerDeleteHall.php` to use `hall` and the same column names, or keep both `hall` and `halls` and document which is used where.
4. **owner_profile:** Ensure it has a **password** column; `owner_schema.sql` in the repo omits it but login uses it.

---

## 4. Environment Variables

### Backend (PHP)

Set these (e.g. in server env or a loaded `.env` file) so `connectToDB.php` uses them:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

### Frontend (React)

- **`REACT_APP_API_URL`** – Base URL of the backend API (e.g. `http://localhost:8000` for local PHP server, or your deployed backend URL). If unset, the app falls back to `http://localhost:8000`.

---

## 5. Minor Items Not Changed (documented in ISSUES.md)

- **B9:** Confirm `hall.created_at` exists.
- **B10:** Standardise all endpoints on `send_json()`.
- **F8:** Restore or remove imports for deleted CSS files.
- **F9:** Consolidate multiple login/signup routes.
- **F10:** Unify component folder naming (e.g. PascalCase).
- **F12:** Consider redirecting clients after login to `/explore` or `/profile` instead of `/landingpage`.

---

## 6. Files Modified (summary)

**Backend:**  
`connectToDB.php`, `auth/signup_client.php`, `aishaWork/ownerProfileUpdate.php`, `aishaWork/ownerUpdateHall.php`, `aishaWork/ownerDeleteHall.php`, `aishaWork/getOwnerHalls.php`, `aishaWork/ownerRequestAccept.php`, `aishaWork/ownerRequestReject.php`, `ayaWork/getHallCard.php`, `auth/getCurrentUser.php`, `akramWork/getAllHalls.php`, `akramWork/addToFavourite.php`, `akramWork/deleteFromFavourite.php`

**Frontend:**  
`context/AuthContext.js`, `components/AishaComponents/ProfilePopup/ProfilePopup.jsx`, `components/Ayacomponents/hallcard/hall-card.jsx`, `components/akramComponents/OneHall/OneHall.jsx`, `components/akramComponents/HallsList/HallsList.jsx`, `pages/Aishapages/Dashboard.jsx`, `pages/Aishapages/RequestsPage.jsx`, `pages/Aishapages/HistoryPage.jsx`, `pages/akramPages/viewHalls/ViewHalls.jsx` (and `class` → `className`)

**Docs added:**  
`ISSUES.md`, `FIXES.md`
