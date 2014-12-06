CREATE or REPLACE FUNCTION get_note(noteId integer)
RETURNS TABLE(created_on timestamp, noteTitle varchar, noteBody text, noteTags varchar[], photo_links varchar[]) AS $$
BEGIN

RETURN QUERY
  select n.created_at, n.title, n.body, array_agg(DISTINCT t.name) as noteTags, array_agg(DISTINCT p.link)
  FROM notes_tags nt
  INNER JOIN notes n ON n.id = nt.note_id
  INNER JOIN tags t ON t.id = nt.tag_id
  INNER JOIN photos p ON p.note_id = n.id
  WHERE n.id = noteId
  GROUP BY n.created_at, n.title, n.body;

END;
$$ LANGUAGE plpgsql;
