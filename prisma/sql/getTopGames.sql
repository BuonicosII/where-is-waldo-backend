select *, EXTRACT(epoch from (g."endDate" - g."startDate")) as length from "Game" g 
where g."endDate" is not null
and g."player" is not null
order by (g."endDate" - g."startDate") asc
limit 10;