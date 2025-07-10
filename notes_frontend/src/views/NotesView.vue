<template>
  <NotesLayout>
    <template #sidebar>
      <div style="margin-top: auto; font-size: 0.9em; color: #adb7c1; text-align: center; margin-bottom: -1em;">
        <span style="color: var(--secondary);">Powered by Supabase</span>
      </div>
    </template>
    <template #default>
      <div class="notes-header">
        <h1>All Notes</h1>
        <button class="new-btn" @click="startNew">+ New Note</button>
      </div>
      <div class="notes-toolbar">
        <input v-model="store.query" @input="onQuery" placeholder="Search notes..." class="search"/>
        <select v-model="filterTag" @change="onFilterChange" class="tag-filter">
          <option value="">All tags</option>
          <option v-for="tag in uniqueTags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>
      <div class="notes-list" v-if="store.filteredNotes.length">
        <div
          v-for="note in store.filteredNotes"
          :key="note.id"
          class="note-preview"
          @click="editNote(note)"
          :class="{active: note.id === editing?.id}"
        >
          <div class="note-title">{{ note.title }}</div>
          <div class="note-tags">
            <span v-for="tag in note.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="note-date">{{ new Date(note.updated_at).toLocaleString() }}</div>
        </div>
      </div>
      <div v-else-if="!store.loading" class="notes-list-empty">
        <p>No notes found.</p>
      </div>
      <div v-if="store.loading" class="notes-list-loading">Loading...</div>
      <NotesEditor
        v-if="showEditor"
        :note="editing"
        :creating="creating"
        @save="onSave"
        @cancel="stopEditing"
        @delete="onDelete"
      />
      <div v-if="store.error" class="notes-error">
        Error: {{ store.error }}
      </div>
    </template>
  </NotesLayout>
</template>
<script setup lang="ts">
import NotesLayout from "@/components/NotesLayout.vue";
import NotesEditor from "@/components/NotesEditor.vue";
import { useNotesStore } from "@/stores/notes";
import { ref, computed } from "vue";
import type { Note } from "@/stores/notes";

const store = useNotesStore();
const editing = ref<Note | null>(null);
const creating = ref(false);

const filterTag = ref("");
const uniqueTags = computed(() =>
  Array.from(
    new Set(
      store.notes
        .flatMap((n) => n.tags ?? [])
        .map((t) => t?.trim())
        .filter(Boolean)
    )
  )
);

const showEditor = computed(() => editing.value || creating.value);

function startNew() {
  creating.value = true;
  editing.value = null;
}
function editNote(note: Note) {
  editing.value = note;
  creating.value = false;
}
function stopEditing() {
  editing.value = null;
  creating.value = false;
}
async function onSave({ id, title, content, tags }: { id?: string, title: string, content: string, tags: string[] }) {
  if (id) {
    await store.updateNote(id, title, content, tags);
  } else {
    await store.createNote(title, content, tags);
  }
  stopEditing();
}
async function onDelete(id: string) {
  await store.deleteNote(id);
  stopEditing();
}
function onQuery() {
  store.setQuery(store.query);
}
function onFilterChange() {
  store.setFilterTag(filterTag.value);
}
</script>
<style scoped>
.notes-header {
  display: flex;
  align-items: center;
  gap: 1.8rem;
  margin-bottom: 0.6em;
}
.notes-header h1 {
  flex: 1;
  color: var(--secondary);
  font-size: 2.0em;
}
.new-btn {
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1em;
  padding: 0.44em 1.3em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s;
}
.new-btn:hover {
  background: var(--accent);
  color: var(--secondary);
}
.notes-toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1em;
}
.search {
  flex: 1;
  padding: 0.55em 1em;
  border: 1px solid #e0e6ed;
  border-radius: 7px;
  font-size: 1em;
}
.tag-filter {
  padding: 0.53em 0.85em;
  border: 1px solid #e0e6ed;
  border-radius: 7px;
  font-size: 1em;
}
.notes-list {
  margin-bottom: 1.4em;
  display: flex;
  flex-direction: column;
  gap: 0.55em;
}
.note-preview {
  padding: 1em 1.2em 0.7em 1.2em;
  background: #fff;
  border: 1.5px solid #e0e6ed;
  border-radius: 9px;
  cursor: pointer;
  transition: border 0.15s, box-shadow 0.15s;
  margin-bottom: 0.12em;
}
.note-preview.active, .note-preview:hover {
  border: 2px solid var(--primary);
  background: #eafbf7;
  box-shadow: 0 2px 7px -3px #42b98315;
}
.note-title {
  font-size: 1.1em;
  color: var(--secondary);
  font-weight: 600;
  margin-bottom: 0.2em;
}
.note-tags {
  margin-bottom: 0.1em;
}
.tag {
  background: var(--accent);
  color: var(--secondary);
  border-radius: 3px;
  font-size: 0.93em;
  padding: 0.05em 0.55em;
  margin-right: 0.4em;
}
.note-date {
  font-size: 0.82em;
  color: #acb4bc;
  margin-top: 0.1em;
}
.notes-list-empty, .notes-list-loading, .notes-error {
  color: #acb4bc;
  padding: 1em 0;
  text-align: center;
}
.notes-error {
  color: #bd2727;
  font-weight: 500;
}
@media (max-width: 800px) {
  .notes-header { flex-direction: column; gap: 0.8em; }
  .notes-toolbar { flex-direction: column; gap: 0.7em; }
}
</style>
