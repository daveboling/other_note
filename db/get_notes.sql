CREATE or REPLACE FUNCTION display_notes (userId integer, note_limit integer, tagFilter varchar, pageOffset integer)
RETURNS TABLE(noteId integer, created_on timestamp, noteTitle varchar, noteBody text, noteTags varchar[]) AS $$
DECLARE
BEGIN

RETURN QUERY
    select n.id, n.created_at, n.title, n.body, array_agg(t.name)
    --case count(t.name) when 0 then '{}' else array_agg(t.name) end as noteTags
    from notes_tags nt
    inner join notes n on n.id = nt.note_id
    inner join tags t on t.id = nt.tag_id
    where n.user_id = userId and
    case 
        when tagFilter = 'all' or tagFilter = '' then t.name != ''
            else t.name = tagFilter
        end
    group by n.created_at, n.title, n.body, n.id
    order by n.created_at DESC
    limit note_limit
    offset pageOffset;
    
    
END;
$$ LANGUAGE plpgsql;



