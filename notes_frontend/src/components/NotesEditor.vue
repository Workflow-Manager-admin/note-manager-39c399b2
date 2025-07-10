<template>
  <div class="overlay">
    <div class="editor-card">
      <h2>{{ creating ? 'New Note' : 'Edit Note' }}</h2>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label>Title</label>
          <input v-model="title" required maxlength="100" class="input" placeholder="Title..." />
        </div>
        <div class="form-group">
          <label>Tags <small>(comma separated)</small></label>
          <input v-model="rawTags" class="input" placeholder="e.g. work, school" />
        </div>
        <div class="form-group">
          <label>Content</label>
          <textarea v-model="content" rows="7" required class="input textarea" placeholder="Write note here..."></textarea>
        </div>
        <div class="actions">
          <button type="submit" class="save-btn">{{ creating ? 'Create' : 'Update' }}</button>
          <button type="button" @click="$emit('cancel')" class="cancel-btn">Cancel</button>
          <button
            v-if="!creating && note?.id"
            type="button"
            @click="onDelete"
            class="delete-btn"
          >Delete</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { Note } from "@/stores/notes";

const emits = defineEmits(["save", "cancel", "delete"]);
const props = defineProps<{
  note?: Note | null;
  creating?: boolean;
}>();

const title = ref(props.note?.title || "");
const content = ref(props.note?.content || "");
const rawTags = ref((props.note?.tags ?? []).join(", "));

watch(
  () => props.note,
  (n) => {
    title.value = n?.title || "";
    content.value = n?.content || "";
    rawTags.value = (n?.tags ?? []).join(", ");
  }
);

const tags = computed(() => {
  return rawTags.value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
});

function onSubmit() {
  emits("save", {
    id: props.note?.id,
    title: title.value,
    content: content.value,
    tags: tags.value,
  });
}
function onDelete() {
  if (props.note?.id && window.confirm("Delete this note?")) {
    emits("delete", props.note.id);
  }
}
</script>
<style scoped>
.overlay {
  position: fixed;
  z-index: 2000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: #18182029;
  display: flex;
  align-items: center;
  justify-content: center;
}
.editor-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 36px -10px #0519152a;
  padding: 2.2em 2.3em 1.6em 2.3em;
  max-width: 480px;
  min-width: 250px;
  width: 90vw;
  position: relative;
}
.editor-card h2 {
  color: var(--primary);
  margin-bottom: 1.2em;
}
.form-group {
  margin-bottom: 1.15em;
  display: flex;
  flex-direction: column;
}
.label {
  font-weight: 500;
  margin-bottom: 0.28em;
  color: var(--secondary);
}
.input {
  border-radius: 7px;
  border: 1.5px solid #e0e6ed;
  font-size: 1em;
  padding: 0.63em 0.85em;
  background: #fafbfc;
  color: #1f2228;
  transition: border 0.15s;
}
.input:focus {
  border-color: var(--primary);
  outline: none;
}
.textarea {
  min-height: 90px;
  font-family: inherit;
  line-height: 1.5;
  resize: vertical;
}
.actions {
  display: flex;
  gap: 1.2em;
  margin-top: 1em;
  justify-content: flex-end;
}
.save-btn {
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 500;
  padding: 0.53em 1.2em;
  cursor: pointer;
}
.save-btn:hover { background: var(--accent); color: var(--secondary);}
.cancel-btn {
  background: #eee;
  color: var(--secondary);
  border: none;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 400;
  padding: 0.53em 1.2em;
  margin-left: 0.7em;
  cursor: pointer;
}
.cancel-btn:hover { background: #e8e8e8; }
.delete-btn {
  background: #fff6f0;
  color: #bd2727;
  border: 1.5px solid #fad9bb;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 500;
  padding: 0.53em 1.2em;
  margin-left: 0.7em;
  cursor: pointer;
}
.delete-btn:hover { background: #ffe0c8; }
@media (max-width: 560px) {
  .editor-card { padding: 1.1em 0.6em 0.7em 0.6em; }
}
</style>
