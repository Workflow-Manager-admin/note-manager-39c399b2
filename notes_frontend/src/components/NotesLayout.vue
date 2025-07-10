<template>
  <div class="notes-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <span class="logo-letter">N</span>
        <span class="app-title">Notes</span>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/" exact-active-class="nav-active">
              <i class="icon" style="color: var(--primary);">
                <IconNotebook />
              </i>
              All Notes
            </router-link>
          </li>
        </ul>
      </nav>
      <slot name="sidebar"></slot>
    </aside>
    <section class="main-content">
      <slot></slot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { IconNotebook } from "@tabler/icons-vue";
</script>

<style scoped>
:root {
  --primary: #42b983;
  --secondary: #35495e;
  --accent: #ffd700;
  --background: #fff;
  --sidebar-bg: #f6f8fa;
  --sidebar-border: #e0e6ed;
}
.notes-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: var(--background);
}
.sidebar {
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-border);
  padding: 2rem 1.25rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  min-width: 240px;
}
.sidebar-header {
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  gap: 0.8rem;
}
.logo-letter {
  background: var(--primary);
  color: #fff;
  border-radius: 8px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}
.app-title {
  color: var(--secondary);
  font-size: 1.4em;
  font-weight: 600;
}
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
nav li {
  margin: 1rem 0;
}
nav a {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 0.9em;
  font-size: 1.03em;
  border-radius: 6px;
  color: var(--secondary);
  font-weight: 500;
  transition: background 0.14s;
}
nav a.nav-active, nav a:hover {
  background: var(--primary);
  color: #fff;
}
.icon {
  vertical-align: -0.2em;
  font-size: 1.1em;
}
.main-content {
  padding: 2.2rem 2.2rem 2rem 2.2rem;
  background: var(--background);
  min-height: 100vh;
}
@media (max-width: 800px) {
  .notes-layout {
    grid-template-columns: 1fr;
  }
  .sidebar {
    min-width: unset;
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid var(--sidebar-border);
    width: 100vw;
    padding: 1.2rem 0.7rem;
  }
  .main-content {
    padding: 1.2rem;
  }
}
</style>
