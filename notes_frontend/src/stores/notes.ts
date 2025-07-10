import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getSupabaseClient } from "@/supabase";

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
}

export const useNotesStore = defineStore("notes", () => {
  const supabase = getSupabaseClient();
  const notes = ref<Note[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const query = ref("");
  const filterTag = ref("");

  // PUBLIC_INTERFACE
  /**
   * Loads all notes from Supabase.
   */
  async function fetchNotes() {
    loading.value = true;
    error.value = null;
    const { data, error: err } = await supabase
      .from("notes")
      .select("*")
      .order("updated_at", { ascending: false });
    if (err) {
      error.value = err.message;
      loading.value = false;
      return;
    }
    notes.value = (data ?? []).map((n) => ({
      ...n,
      tags: n.tags ?? [],
    }));
    loading.value = false;
  }

  // PUBLIC_INTERFACE
  /** 
   * Creates a new note and adds it to the store.
   */
  async function createNote(title: string, content: string, tags: string[] = []) {
    loading.value = true;
    error.value = null;
    const { data, error: err } = await supabase
      .from("notes")
      .insert([{ title, content, tags }])
      .select()
      .single();
    if (err) {
      error.value = err.message;
    } else {
      notes.value = [data, ...notes.value];
    }
    loading.value = false;
  }

  // PUBLIC_INTERFACE
  /**
   * Updates an existing note by id.
   */
  async function updateNote(id: string, title: string, content: string, tags: string[] = []) {
    loading.value = true;
    error.value = null;
    const { data, error: err } = await supabase
      .from("notes")
      .update({ title, content, tags, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (err) {
      error.value = err.message;
    } else {
      notes.value = notes.value.map((n) => (n.id === id ? data : n));
    }
    loading.value = false;
  }

  // PUBLIC_INTERFACE
  /**
   * Deletes a note by id.
   */
  async function deleteNote(id: string) {
    loading.value = true;
    error.value = null;
    const { error: err } = await supabase.from("notes").delete().eq("id", id);
    if (err) {
      error.value = err.message;
    } else {
      notes.value = notes.value.filter((n) => n.id !== id);
    }
    loading.value = false;
  }

  // PUBLIC_INTERFACE
  /**
   * Returns notes filtered by search query and tag.
   */
  const filteredNotes = computed(() => {
    let ns = notes.value;
    if (query.value) {
      const q = query.value.toLowerCase();
      ns = ns.filter((n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
    }
    if (filterTag.value) {
      ns = ns.filter((n) => (n.tags ?? []).includes(filterTag.value));
    }
    return ns;
  });

  /**
   * Setters for query and tag filtering.
   */
  function setQuery(q: string) {
    query.value = q;
  }
  function setFilterTag(tag: string) {
    filterTag.value = tag;
  }

  // Load notes immediately if used
  fetchNotes();

  return {
    notes,
    loading,
    error,
    query,
    filterTag,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    setQuery,
    setFilterTag,
    filteredNotes,
  };
});
