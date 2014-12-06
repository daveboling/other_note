CREATE or REPLACE FUNCTION display_note (userId integer, note_limit integer, tagFilter varchar)
RETURNS TABLE(created_on timestamp, noteTitle varchar, noteBody text, noteTags varchar[]) AS $$
DECLARE
BEGIN

RETURN QUERY
    select n.created_at, n.title, n.body, array_agg(t.name) as noteTags
    from notes_tags nt
    inner join tags t on t.id = nt.tag_id
    inner join notes n on n.id = nt.note_id
    where n.user_id = userId and 
      case 
        when tagFilter = 'all' or tagFilter = '' then t.name != ''
        else t.name = tagFilter
      end
    group by n.created_at, n.title, n.body
    order by n.created_at DESC
    limit note_limit;
    
END;

$$ LANGUAGE plpgsql;