# Lab 4 - SQL Joins & Protected API Endpoints

## 📊 SQL Joins Explained

### INNER JOIN
Returns records that have matching values in both tables. Only returns rows where the join condition is satisfied in both tables.

**Use Case:** Find users who have assigned roles.

### LEFT JOIN
Returns all records from the left table, and matched records from the right table. Returns NULL from the right side if no match.

**Use Case:** Find all users and their profiles (including users without profiles).

### RIGHT JOIN
Returns all records from the right table, and matched records from the left table. Returns NULL from the left side if no match.

**Use Case:** Find all roles and see which users have them assigned.

### FULL OUTER JOIN (UNION of LEFT + RIGHT)
Returns all records when there's a match in either left or right table. Combines results of LEFT and RIGHT joins.

**Use Case:** Get complete list of all users and profiles relationships.

### CROSS JOIN
Returns Cartesian product of both tables (every row from first table combined with every row from second table).

**Use Case:** Generate all possible user-role combinations.

### SELF JOIN
Joins a table to itself. Useful for hierarchical data or comparing rows within the same table.

**Use Case:** Find user referral relationships.

### JOIN with Subquery
Uses a subquery to filter or aggregate data before joining.

**Use Case:** Find each user's latest login time.

---

## 🔐 Protected API Endpoints

All endpoints require **Admin authentication** (Bearer token).

| Endpoint | Method | Purpose | JOIN Type |
|----------|--------|---------|-----------|
| `/api/reports/users-with-roles` | GET | Users with their assigned roles | INNER JOIN |
| `/api/reports/users-with-profiles` | GET | All users with profile data (if exists) | LEFT JOIN |
| `/api/reports/roles-right-join` | GET | All roles with assigned users | RIGHT JOIN |
| `/api/reports/profiles-full-outer` | GET | Complete user-profile relationships | FULL OUTER (UNION) |
| `/api/reports/user-role-combos` | GET | All possible user-role combinations | CROSS JOIN |
| `/api/reports/referrals` | GET | User referral relationships | SELF JOIN |
| `/api/reports/latest-login` | GET | Latest login time per user | JOIN + Subquery |

---
