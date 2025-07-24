# Woozi Chrome Extension

A modern Chrome extension for lead management and campaign automation, built with WXT, React, TypeScript, and Supabase authentication.

## 🚀 Features

- **Lead Collections Management** - Organize leads into custom collections with criteria-based filtering
- **Email OTP Authentication** - Secure sign-up/sign-in with Supabase email OTP
- **Campaign Automation** - Streamline marketing campaigns (coming soon)
- **Responsive Design** - Optimized for Chrome side panel interface
- **Modern UI** - Built with React, TypeScript, and Tailwind CSS
- **Real-time Data** - Powered by Supabase for instant updates

## 🛠️ Tech Stack

- **Framework**: [WXT](https://wxt.dev/) - Next-gen Chrome extension framework
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Lucide React icons
- **Authentication**: [Supabase Auth](https://supabase.com/auth) with Email OTP
- **Database**: Supabase PostgreSQL with Row Level Security
- **Build Tool**: Vite
- **Manifest**: Chrome Extension Manifest V3

## 📋 Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- Chrome browser for testing
- Supabase account and project

## ⚙️ Environment Setup

Create a `.env` file in the project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CRX_PUBLIC_KEY=your_generated_base64_key
```

### Getting Supabase Keys

1. Sign up at [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings → API
4. Copy the Project URL and anon/public key
5. Set up email OTP authentication in Authentication settings

### Setting up Supabase Database

Create the required tables in your Supabase SQL editor:

```sql
-- Lead Collections Table
CREATE TABLE IF NOT EXISTS lead_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  criteria JSONB DEFAULT '{}',
  lead_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE lead_collections ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own collections" ON lead_collections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own collections" ON lead_collections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own collections" ON lead_collections
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own collections" ON lead_collections
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_lead_collections_user_id ON lead_collections(user_id);
CREATE INDEX IF NOT EXISTS idx_lead_collections_updated_at ON lead_collections(updated_at);
```

### Configuring Email OTP

In your Supabase dashboard:

1. Go to Authentication → Settings
2. Set "Enable email confirmations" to **OTP**
3. Go to Authentication → Email Templates
4. Update the "Magic Link" template to display OTP codes:

```html
<h2>Your Login Code</h2>
<p>Enter this code to sign in:</p>
<h1 style="font-size: 48px; font-weight: bold; text-align: center; color: #333; letter-spacing: 8px;">{{ .Token }}</h1>
<p style="color: #666;">This code will expire in 5 minutes.</p>
```

### Generating CRX Public Key

The CRX public key ensures your extension has a consistent ID across builds:

```bash
# Generate a random base64 key
openssl rand -base64 32
```

## 🚀 Installation & Development

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd woozi-wxt
   pnpm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Load extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select `.output/chrome-mv3/`

## 🏗️ Build & Deploy

```bash
# Build for production
pnpm build

# Extension files will be in woozi-extension-build/
# ZIP file ready for Chrome Web Store upload
pnpm zip
```

## 🔧 Project Structure

```
woozi-wxt/
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── collections/   # Lead collections management
│   │   ├── screens/       # Main application screens
│   │   └── ui/           # Reusable UI components
│   ├── lib/
│   │   ├── supabase.ts   # Supabase client setup
│   │   └── collections.ts # Collections API helpers
│   └── types/
│       └── collection.ts  # TypeScript interfaces
├── entrypoints/
│   ├── background.ts     # Service worker
│   └── sidepanel/        # Main UI entry point
└── public/               # Static assets
```

## 📱 Extension Features

### Lead Collections Management

- **Create Collections**: Organize leads with custom criteria
- **Table View**: Sortable columns for Name, Lead Count, Last Updated
- **Actions**: Edit, View Details, Clone, and Delete collections
- **Clone Functionality**: Duplicate collections with "Copy of" prefix
- **Real-time Updates**: Instant synchronization with Supabase

### Authentication Flow

- **Email Entry**: Simple email input with validation
- **OTP Verification**: 6-digit code input with auto-focus and paste support
- **Session Management**: Persistent login with Chrome storage adapter
- **Secure Logout**: Complete session cleanup

## 🔍 Extension Configuration

### Chrome Extension Manifest

```typescript
// wxt.config.ts
manifest: {
  name: 'Woozi - Lead Management & Collections',
  permissions: ['storage', 'sidePanel'],
  host_permissions: [
    'https://*.supabase.co/*'
  ],
  key: '$VITE_CRX_PUBLIC_KEY' // Ensures consistent extension ID
}
```

## 🐛 Troubleshooting

### Common Issues

**1. "Invalid API key" during authentication**
- Ensure you're using the correct Supabase anon key (starts with `sb_publishable_`)
- Verify the Supabase URL is correct
- Check that environment variables are properly loaded

**2. Not receiving OTP emails**
- Verify email template is configured for OTP (not magic links)
- Check Authentication settings are set to "OTP" mode
- Ensure email provider settings are configured in Supabase

**3. Extension ID keeps changing**
- Make sure `VITE_CRX_PUBLIC_KEY` is set in `.env`
- Verify the key is properly referenced in `wxt.config.ts`

**4. Database connection issues**
- Confirm Supabase project URL and keys are correct
- Ensure RLS policies are properly configured
- Check that required tables exist in your database

### Debug Mode

Enable debug logging by adding to your `.env`:
```env
VITE_DEBUG=true
```

## 📝 Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production  
pnpm zip          # Create ZIP for Chrome Web Store
pnpm type-check   # Run TypeScript checks
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test the extension thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🆘 Support

For issues and questions:
- Check the troubleshooting section above
- Review [Supabase Auth documentation](https://supabase.com/docs/guides/auth)
- Review [WXT framework documentation](https://wxt.dev/)
- Open an issue in this repository

## 🚀 Roadmap

- [ ] Advanced lead filtering and search
- [ ] Campaign automation features
- [ ] Lead import/export functionality
- [ ] Analytics and reporting
- [ ] Team collaboration features
- [ ] CRM integrations

---

Built with ❤️ using modern web technologies