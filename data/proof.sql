select 
    r."name",
    r.instructions,
    string_agg(ri.amount::float || ' ' || coalesce(m.name,'') || ' ' || i.name, ', ') all_ingredients
from recipes r 
left join recipes_ingredients ri on r.id = ri.recipe_id
join ingredients i on i.id = ri.ingredient_id
left join measurements m on m.id = ri.measurement_id
group by 1,2