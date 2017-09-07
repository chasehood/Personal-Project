UPDATE admin
SET 
firstname = $2,
lastname = $3,
customersoldto = $4,
dateofsale = $5,
email = $6,
phone = $7,
orderplaced = $8

WHERE id = $1;