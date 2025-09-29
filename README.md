<<<<<<< HEAD
Lab 4 - SQL Joins & Protected API Endpoints
📊 SQL Joins Explained
INNER JOIN
Returns records that have matching values in both tables. Only returns rows where the join condition is satisfied in both tables.

Use Case: Find users who have assigned roles.

LEFT JOIN
Returns all records from the left table, and matched records from the right table. Returns NULL from the right side if no match.

Use Case: Find all users and their profiles (including users without profiles).

RIGHT JOIN
Returns all records from the right table, and matched records from the left table. Returns NULL from the left side if no match.

Use Case: Find all roles and see which users have them assigned.

FULL OUTER JOIN (UNION of LEFT + RIGHT)
Returns all records when there's a match in either left or right table. Combines results of LEFT and RIGHT joins.

Use Case: Get complete list of all users and profiles relationships.

CROSS JOIN
Returns Cartesian product of both tables (every row from first table combined with every row from second table).

Use Case: Generate all possible user-role combinations.

SELF JOIN
Joins a table to itself. Useful for hierarchical data or comparing rows within the same table.

Use Case: Find user referral relationships.

JOIN with Subquery
Uses a subquery to filter or aggregate data before joining.

Use Case: Find each user's latest login time.
>>>>>>> 
