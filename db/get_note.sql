--Basic retrieving on note and its respective S3 links
select n.title, n.body, array_agg(p.link)
from photos p
inner join notes n on n.id = p.note_id
where n.id = p.note_id
group by n.title, n.body;