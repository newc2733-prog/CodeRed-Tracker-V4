# Replit.md

## Overview

This is a medical blood product tracking application built for managing Code Red (massive transfusion protocol) events in hospital settings. The system tracks blood product packs through various stages from order to delivery, providing real-time visibility for medical staff managing critical situations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom medical-grade color scheme
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development**: TSX for TypeScript execution in development
- **Build**: ESBuild for production bundling

### Data Storage Solutions
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with Zod schema validation
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL sessions via connect-pg-simple
- **Development Storage**: In-memory storage implementation for development/testing

## Key Components

### Database Schema
- **CodeRedEvents**: Tracks activation/deactivation of massive transfusion protocols
- **Packs**: Individual blood product packages with composition (FFP, Cryo, Platelets) and stage tracking

### Frontend Components
- **Dashboard**: Main view showing active Code Red status and pack tracking
- **CodeRedBanner**: Real-time display of active event status and elapsed time
- **PackTrackingCard**: Individual pack progress through 6-stage workflow
- **ActionButtons**: Controls for activating/deactivating Code Red and managing packs
- **SystemInfo**: Integration status and system health monitoring

### Backend Services
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations
- **REST API**: Express routes for Code Red events and pack management
- **Real-time Updates**: 5-second polling for live dashboard updates

## Data Flow

### Code Red Workflow
1. **Activation**: Staff activates Code Red for specific lab (Main/Satellite)
2. **Pack Creation**: Standardized blood product packs with predefined compositions:
   - **Pack A**: 6 FFP units (standard massive transfusion pack)
   - **Pack B**: 6 FFP, 2 Cryoprecipitate, 1 Platelets (enhanced pack)
   - **Individual Products**: Single FFP, Cryoprecipitate, or Platelet units
3. **Stage Tracking**: Packs progress through 6 stages:
   - Order received
   - Ready for collection
   - Runner en route to lab
   - Order collected
   - Runner en route to clinical area
   - Product arrived
4. **Real-time Monitoring**: Dashboard shows live progress and elapsed times
5. **Deactivation**: Code Red event is deactivated when complete

### API Endpoints
- `GET /api/code-red/active` - Get current active Code Red event
- `POST /api/code-red` - Create new Code Red event
- `POST /api/code-red/:id/deactivate` - Deactivate Code Red event
- `POST /api/packs` - Create new pack
- `PATCH /api/packs/stage` - Update pack stage

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom medical theme
- **Lucide React**: Icon library for medical and UI icons
- **Class Variance Authority**: For component variant management

### Data Management
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form handling with Zod validation
- **Date-fns**: Date/time manipulation and formatting

### Development Tools
- **Replit Integration**: Development environment optimization for Replit
- **Vite Plugins**: Runtime error overlay and development cartographer

## Deployment Strategy

### Development
- **Hot Reload**: Vite dev server with HMR for rapid development
- **TypeScript**: Full type checking and IntelliSense support
- **Development Banner**: Replit integration for external access warnings

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend in production mode

### Environment Configuration
- **Database**: PostgreSQL via DATABASE_URL environment variable
- **Session Management**: Secure session handling with PostgreSQL storage
- **Error Handling**: Comprehensive error boundaries and API error responses

### Monitoring and Logging
- **Request Logging**: Detailed API request/response logging
- **Performance Tracking**: Request duration monitoring
- **Error Tracking**: Structured error handling with appropriate HTTP status codes

## Recent Changes: Latest modifications with dates

### July 18, 2025 - Database Integration and Vercel Deployment Fix
- Implemented PostgreSQL database integration with Drizzle ORM for persistent data storage
- Added automatic storage switching: in-memory for development, database for production
- Fixed serverless deployment issues that caused Code Red data to disappear between requests
- Updated database connection handling to work properly in Vercel's serverless environment
- All Code Red events, packs, and location data now persist reliably across deployments
- Created comprehensive deployment documentation with environment variable setup
- Successfully tested database operations with full CRUD functionality working

### July 15, 2025 - Multi-Code Red Support with Direct User Selection
- Implemented support for multiple simultaneous Code Red events in hospitals
- Added Home Screen with Code Red summary cards showing activation time, location, patient MRN, and pack count
- Created direct Code Red selection interface where runners and clinicians choose which event to join
- Enhanced dashboard to display all active Code Red events with visual status indicators
- Removed lab assignment system in favor of user self-selection for better workflow autonomy
- Updated role selection cards to show Code Red event buttons for direct access
- Provided clear visual separation between different Code Red events with color-coded cards
- Added elapsed time indicators and assignment status dots for quick event overview
- Removed user assignment panel from lab view to streamline lab workflow
- Added "Activate Additional Code Red" button in both inactive and active lab states for multiple simultaneous events
- Lab staff can now activate additional Code Red events through prominent green card interface
- Enhanced lab workflow with visual indicators for existing active Code Red events before activation

### July 15, 2025 - Integrated Arrival Estimates Across All Views
- Added arrival time estimates to runner pack cards showing estimated arrival times to clinical areas
- Integrated runner location status indicators in lab and clinician views with real-time tracking status
- Enhanced pack displays in clinician view with arrival estimates for in-transit packs
- Added location tracking status indicator in runner header (green dot for tracked, gray for offline)
- Provided comprehensive arrival coordination between all three roles for optimal timing

### July 15, 2025 - Unified Lab Interface for Reduced Complexity
- Merged "Create New Order" and "Quick Actions" into single "Order & Manage Blood Products" card
- Orders now appear immediately below order buttons for streamlined workflow
- Reduced interface noise and tab switching for stressed lab technicians
- Enhanced location display with larger 3xl bold text in blue-bordered box for high-stress visibility
- Simplified user experience with direct connection between ordering and pack management
- Added comprehensive time estimate editing: quick buttons (15min/20min), custom input, and easy editing of existing estimates
- Implemented inline time management with visual current estimate display and Save/Cancel editing workflow
- Implemented automatic pack numbering system for multiple orders of same type (Pack A (1), Pack A (2), etc.)
- Enhanced runner view with prominent lab location display using red-bordered box and extra-large bold text for critical pickup location visibility
- Applied consistent pack numbering across all views (lab, runner, clinician) for unified identification system

### July 14, 2025 - Enhanced Runner View with Stage 1 Pack Display and 5-Minute Preparation Alert
- Modified runner view to show stage 1 packs with time estimates for preparation timing
- Added visual countdown timer for all pack stages, not just stage 2
- Implemented 5-minute preparation alert system for optimal timing
- Added color-coded display: orange for processing packs, blue for ready packs
- Updated pack filtering to include stage 1 packs with estimated ready times
- Enhanced user experience with "Prepare to Leave" notifications when countdown reaches 5 minutes
- Fixed duplicate pack status display in clinician view to show pack status only once with countdown timers

### July 14, 2025 - Ultra-Simplified Dashboard and Code Red Banner
- Completely removed pack tracking information from main dashboard when Code Red is active
- Simplified Code Red banner to show only essential information: activation time, location, and patient MRN
- Created clean main dashboard with Code Red selection for runner and clinician roles
- Lab view remains single-access (no selection needed)
- Runner and clinician can select specific Code Red events from buttons showing "Lab Type - Location"
- Removed all pack status summaries and product information from banner
- Main screen now focuses purely on role selection without information clutter

### July 14, 2025 - Enhanced Lab Quick Actions with Real-time Countdown
- Added live countdown timer in lab quick actions when time estimates are set
- Shows real-time countdown (minutes and seconds) updating every second
- Visual indicators: blue for active countdown, red when overdue
- Time estimate buttons (15min/20min) only appear when no time is set
- Ready button always available for manual override regardless of countdown status

## Recent Changes: Latest modifications with dates

### July 14, 2025 - Fixed Code Red Activation Form in Lab View
- Fixed Code Red activation dialog to include all required fields: lab location, exact location, and patient MRN
- Updated activation mutation to send complete data payload to API
- Added proper form validation to ensure all fields are filled before activation
- Resolved API error "Missing required fields" that was preventing activation
- Confirmed activation now works properly with comprehensive location and patient tracking

### July 14, 2025 - Code Red Activation Restricted to Lab View Only
- Centralized Code Red activation to lab view only for better workflow control
- Removed Code Red activation buttons from dashboard, runner, and clinician views
- Updated dashboard to direct users to lab view for Code Red activation
- Modified role descriptions to clarify lab manages Code Red activation
- Enhanced lab view to handle both Code Red activation when inactive and management when active
- Improved user guidance with clear navigation messages for activation workflow

### July 14, 2025 - Enhanced Runner Interface with Bigger, Simpler Design
- Completely redesigned runner dashboard with larger, clearer elements
- Implemented focus on 4-step workflow: start collection → confirm collected → start delivery → confirm delivered
- Added large pack cards with color-coded action buttons for each stage
- Enhanced header with bigger title and location display
- Improved grid layout for better space utilization on larger screens
- Added proper sequential workflow preventing skipping of delivery stages
- Maintained quick action shortcuts while prioritizing main workflow interface
- Confirmed mobile-responsive design works well on phones with touch-friendly buttons

### July 14, 2025 - Code Red Banner and Lab Workflow Improvements
- Made Code Red activation time and location larger and bolder in banner
- Added "Mark Ready" functionality for lab staff that works on any pack regardless of stage
- Created separate "All Packs - Mark Ready" section for non-ready packs
- Enhanced location display in Code Red banner with proper formatting
- Fixed runner workflow to show proper sequential progression
- Added "En Route to Clinical Area" section for stage 5 packs in runner shortcuts

### July 14, 2025 - Comprehensive Error Prevention and Undo Functionality
- Added comprehensive undo functionality throughout the system for error prevention
- Implemented undo buttons on all pack tracking stages to reverse actions made in error
- Added individual pack deletion capability with delete buttons in lab shortcuts
- Created emergency reset functionality to reset all packs in a Code Red back to stage 1
- Enhanced role shortcuts with undo options for lab, runner, and clinician workflows
- Implemented "Stand Down (Delete)" feature for Code Red events activated in error
- Added warning dialogs for all destructive actions to prevent accidental operations
- Created delete pack API endpoint (/api/packs/:id) for removing packs created in error
- Enhanced pack tracking cards with stage-specific undo buttons
- Added emergency reset button in action buttons for system-wide pack stage reset

### July 14, 2025 - Enhanced Code Red Activation and Location Tracking
- Updated Code Red schema to include exact location and patient MRN fields
- Modified activation form to require specific location details (not just lab type)
- Restricted lab types to "Main Lab" and "Satellite Lab" only
- Added location history tracking with timestamps for patient movements
- Implemented location update functionality with complete audit trail
- Enhanced all displays to show current location, original location, and movement history
- Added LocationUpdate component for real-time location management

The application prioritizes real-time data updates, medical-grade reliability, error prevention with comprehensive undo capabilities, and intuitive user experience for high-stress clinical environments.