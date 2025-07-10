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
- tags: text[] (can be empty, nullable)  ← confirmed present (added if missing)
- created_at: timestamp (default: now())
- updated_at: timestamp (default: now(), updated on update) 

**Row Level Security (RLS) Configuration**
- Row Level Security is enabled (`ALTER TABLE notes ENABLE ROW LEVEL SECURITY`)
- Universal CRUD is allowed via policy `allow_all_crud_demo` for all access (for demo purposes only! Restrict in production.)

## Environment Variables
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` are present in `.env`
- These map to:  
  - Supabase URL: https://mzxyorlnbfdkneiezgjz.supabase.co  
  - Supabase Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eHlvcmxuYmZka25laWV6Z2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDUxMDksImV4cCI6MjA2NzYyMTEwOX0.URYpbwtC2u5ORBlUzpWPNspXMWq_cLBOKWMOgGbilyQ

## Usage
App uses @supabase/supabase-js. All CRUD is performed client-side using the credentials. No backend server is needed.

**Configuration and integration checked and validated (2024-06):**
- All required columns present in notes table.
- RLS & demo CRUD policy in place.
- .env and frontend code configured for these keys.
- Safe for further feature development.

