CREATE or REPLACE FUNCTION display_note (userId integer, note_limit integer)
--RETURNS TABLE(created_on timestamp, title varchar, body text, name varchar) AS $$
RETURNS json AS $$
BEGIN

  RETURN array_to_json(array_agg(row_to_json(t)))
  from (
    select n.created_at, n.title, n.body, array_agg(t.name) as tags
    from notes_tags nt
    inner join tags t on t.id = nt.tag_id
    inner join notes n on n.id = nt.note_id
    where n.user_id = userId
    group by n.created_at, n.title, n.body
    order by n.created_at DESC
    limit note_limit
    ) t;
    
END;

$$ LANGUAGE plpgsql;

--COLUMN T.NAME must appear in GROUP BY clause or be used in an aggregate function
