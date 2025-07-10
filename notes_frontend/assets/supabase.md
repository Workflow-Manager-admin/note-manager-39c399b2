# Supabase Integration Guide for Notes App

## Project credentials
- Supabase URL: https://mzxyorlnbfdkneiezgjz.supabase.co
- Supabase Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eHlvcmxuYmZka25laWV6Z2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDUxMDksImV4cCI6MjA2NzYyMTEwOX0.URYpbwtC2u5ORBlUzpWPNspXMWq_cLBOKWMOgGbilyQ

## Environment variables
App loads VITE_SUPABASE_URL and VITE_SUPABASE_KEY from .env.

## Notes Table Schema

Table: `notes`
- id: uuid (primary key, default: gen_random_uuid())
- title: text
- content: text
- tags: text[] (can be empty, nullable)
- created_at: timestamp (default: now())
- updated_at: timestamp (default: now(), updated on update) 

**RLS:** Should allow anonymous CRUD for demo. You may add customized security in production.

## Usage
App uses @supabase/supabase-js. All CRUD is performed client-side using the credentials. No backend server is needed.

>>>>>>> REPLACE
