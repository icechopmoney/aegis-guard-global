# Prime Vault Services - Database Setup Guide

## Overview
This guide will help you set up the Supabase database for Prime Vault Services certificate management system.

## Prerequisites
- A Supabase account (free tier is sufficient for development)
- Node.js and npm installed

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Project Name**: `prime-vault-services`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for the project to be created (2-3 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run** to execute the schema

This will create:
- `vault_certificates` table
- `admin_users` table  
- `audit_logs` table
- Row Level Security (RLS) policies
- Indexes and triggers

## Step 3: Get API Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy the **Project URL** and **anon public** key
3. Create a `.env` file in your project root:

```bash
# Copy the .env.example file
cp .env.example .env
```

4. Edit `.env` and replace with your actual credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Step 6: Access the Admin Dashboard

Navigate to `http://localhost:5173/admin` to access the certificate management interface.

## Features Available

### Public Features
- **Asset Tracking**: `/track` - Search and view vault certificates
- **Services**: `/services` - View available security services
- **Home**: `/` - Landing page with company information

### Admin Features
- **Dashboard**: `/admin` - Full certificate management
  - View all certificates
  - Add new certificates
  - Edit existing certificates
  - Delete certificates
  - Search and filter
  - View statistics

### Database Tables

#### vault_certificates
Stores all vault certificate information with fields like:
- tracking_reference (unique identifier)
- vault_code
- assigned_custodian
- depositor details
- security codes
- consignment information

#### admin_users
Manages admin user access and permissions.

#### audit_logs
Tracks all changes to certificates for compliance and security.

## Security Features

- **Row Level Security (RLS)**: Only authenticated admins can modify data
- **Audit Logging**: All changes are tracked with user attribution
- **Input Validation**: Forms validate data before submission
- **TypeScript**: Type safety throughout the application

## Sample Data

The schema includes 3 sample certificates you can test with:
- `AF-2026-0042` - Gold Bullion
- `AF-2026-0099` - Fine Art Collection  
- `AF-2026-0155` - Currency Transfer

## Next Steps

1. **Authentication**: Set up proper admin authentication
2. **Email Notifications**: Configure email alerts for certificate changes
3. **Backup**: Set up regular database backups
4. **Monitoring**: Add application monitoring and error tracking

## Troubleshooting

### Common Issues

**"Missing Supabase environment variables"**
- Ensure your `.env` file is properly configured
- Restart your development server after changing environment variables

**"Permission denied" errors**
- Check that RLS policies are properly set up in Supabase
- Ensure your API keys are correct

**Certificate not found**
- Verify the sample data was inserted correctly
- Check the tracking reference format (e.g., "AF-2026-0042")

### Support

For issues with:
- **Supabase**: Check [Supabase Documentation](https://supabase.com/docs)
- **Application**: Review the console logs for error messages
- **Database**: Verify the SQL schema was applied correctly
