const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
  PageBreak,
  LevelFormat,
  Header,
  Footer,
  PageNumber,
  TableOfContents,
} = require("docx");
const fs = require("fs");

// Brand colors
const COLORS = {
  primary: "C26E7A",
  primaryDark: "A85562",
  secondary: "7A9E7E",
  accent: "D4A574",
  charcoal: "3D3D3D",
  softGray: "8A8A8A",
  cream: "FAF8F5",
  lightGray: "F5F5F5",
  tableBorder: "E0E0E0",
  tableHeader: "F8F4F5",
};

// Common border style
const tableBorder = {
  style: BorderStyle.SINGLE,
  size: 1,
  color: COLORS.tableBorder,
};
const borders = {
  top: tableBorder,
  bottom: tableBorder,
  left: tableBorder,
  right: tableBorder,
};

// Cell margins for readability
const cellMargins = { top: 100, bottom: 100, left: 120, right: 120 };

// Helper function to create a table
function createTable(headers, rows, columnWidths) {
  const tableWidth = columnWidths.reduce((a, b) => a + b, 0);

  return new Table({
    width: { size: tableWidth, type: WidthType.DXA },
    columnWidths: columnWidths,
    rows: [
      // Header row
      new TableRow({
        children: headers.map((header, i) =>
          new TableCell({
            borders,
            width: { size: columnWidths[i], type: WidthType.DXA },
            shading: { fill: COLORS.tableHeader, type: ShadingType.CLEAR },
            margins: cellMargins,
            children: [
              new Paragraph({
                children: [new TextRun({ text: header, bold: true, size: 22, font: "Arial" })],
              }),
            ],
          })
        ),
      }),
      // Data rows
      ...rows.map(
        (row) =>
          new TableRow({
            children: row.map((cell, i) =>
              new TableCell({
                borders,
                width: { size: columnWidths[i], type: WidthType.DXA },
                margins: cellMargins,
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: cell, size: 22, font: "Arial" })],
                  }),
                ],
              })
            ),
          })
      ),
    ],
  });
}

// Create the document
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 24 },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: COLORS.primary },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: COLORS.charcoal },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: COLORS.charcoal },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
          {
            level: 1,
            format: LevelFormat.BULLET,
            text: "\u25E6",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "numbers",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "userStories",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "US-%1",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: "Liberty Ch\u00E9rie Creation \u2014 Product Requirements Document", size: 18, color: COLORS.softGray, font: "Arial" }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Page ", size: 18, color: COLORS.softGray, font: "Arial" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 18, color: COLORS.softGray, font: "Arial" }),
                new TextRun({ text: " of ", size: 18, color: COLORS.softGray, font: "Arial" }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: COLORS.softGray, font: "Arial" }),
              ],
            }),
          ],
        }),
      },
      children: [
        // ==================== TITLE PAGE ====================
        new Paragraph({ spacing: { after: 600 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "PRODUCT REQUIREMENTS DOCUMENT", size: 28, bold: true, color: COLORS.softGray, font: "Arial" }),
          ],
        }),
        new Paragraph({ spacing: { after: 400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Liberty Ch\u00E9rie Creation", size: 56, bold: true, color: COLORS.primary, font: "Arial" }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "E-Commerce Progressive Web App", size: 32, color: COLORS.charcoal, font: "Arial" }),
          ],
        }),
        new Paragraph({ spacing: { after: 800 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Handcrafted Bags, Pouches & Accessories", size: 24, italics: true, color: COLORS.softGray, font: "Arial" }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Saint-Sauveur, Quebec, Canada", size: 24, color: COLORS.softGray, font: "Arial" }),
          ],
        }),
        new Paragraph({ spacing: { after: 1200 } }),

        // Document info table
        createTable(
          ["Document Information", ""],
          [
            ["Version", "1.0"],
            ["Date", "January 24, 2026"],
            ["Author", "Development Team"],
            ["Status", "Draft"],
            ["Stakeholders", "Business Owner, Development Team"],
          ],
          [3000, 6360]
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // ==================== TABLE OF CONTENTS ====================
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("Table of Contents")],
        }),
        new TableOfContents("Table of Contents", {
          hyperlink: true,
          headingStyleRange: "1-3",
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // ==================== 1. EXECUTIVE SUMMARY ====================
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("1. Executive Summary")],
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "Liberty Ch\u00E9rie Creation is a boutique artisan business based in Saint-Sauveur, Quebec, specializing in handcrafted bags, pouches, and accessories made with premium Liberty of London fabrics. This document outlines the requirements for a Progressive Web App (PWA) that will serve as the primary e-commerce platform for the business.",
              size: 24,
              font: "Arial",
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "The PWA will enable customers to browse products, make purchases via Stripe, and submit custom order requests for personalized items including jacket customizations. The platform will reflect the brand\u2019s artisanal, feminine aesthetic while providing a seamless mobile-first shopping experience.",
              size: 24,
              font: "Arial",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("1.1 Project Goals")],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Establish an online sales channel for handcrafted products", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Enable custom order requests for personalized creations", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Provide a mobile-optimized, installable shopping experience", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Streamline order management for the business owner", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Build brand presence beyond Instagram", size: 24, font: "Arial" })],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("1.2 Success Metrics")],
        }),
        createTable(
          ["Metric", "Target", "Timeframe"],
          [
            ["Monthly Online Revenue", "$2,000 CAD", "6 months"],
            ["Conversion Rate", "2.5%", "3 months"],
            ["Custom Order Requests", "10/month", "3 months"],
            ["PWA Installs", "100", "6 months"],
            ["Page Load Time", "< 3 seconds", "Launch"],
          ],
          [3500, 2800, 3060]
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // ==================== 2. PRODUCT OVERVIEW ====================
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("2. Product Overview")],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("2.1 Product Vision")],
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "A beautiful, mobile-first e-commerce platform that captures the artisanal charm of Liberty Ch\u00E9rie Creation while providing modern shopping conveniences. The platform will serve as the digital storefront, complementing the existing Instagram presence and enabling direct sales.",
              size: 24,
              font: "Arial",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("2.2 Target Users")],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [new TextRun("Primary Persona: Sarah, 35")],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Professional woman who appreciates unique, handcrafted items", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Values quality over quantity, willing to pay premium for artisan goods", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Primarily shops on mobile, discovered brand via Instagram", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Located in Quebec or elsewhere in Canada", size: 24, font: "Arial" })],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [new TextRun("Secondary Persona: Marie, 50")],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Looking for unique gifts for daughters/friends", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Interested in custom jacket transformations", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Prefers desktop browsing, values detailed product information", size: 24, font: "Arial" })],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("2.3 Product Categories")],
        }),
        createTable(
          ["Category", "Description", "Price Range"],
          [
            ["Bags", "Tote bags, crossbody bags, handbags", "$75 - $150 CAD"],
            ["Pouches", "Makeup pouches, travel pouches, pencil cases", "$35 - $65 CAD"],
            ["Accessories", "Scrunchies, hair clips, keychains", "$15 - $40 CAD"],
            ["Custom Jackets", "Jacket customization with floral appliqu\u00E9", "$100 - $250 CAD"],
          ],
          [2500, 4360, 2500]
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // ==================== 3. FUNCTIONAL REQUIREMENTS ====================
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("3. Functional Requirements")],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3.1 Product Catalog")],
        }),
        createTable(
          ["ID", "Requirement", "Priority"],
          [
            ["FR-1.1", "Display products in responsive grid layout", "Must Have"],
            ["FR-1.2", "Filter products by category (bags, pouches, accessories, custom)", "Must Have"],
            ["FR-1.3", "Sort products by price, newest, featured", "Must Have"],
            ["FR-1.4", "Product detail page with multiple images", "Must Have"],
            ["FR-1.5", "Show stock availability status", "Must Have"],
            ["FR-1.6", "Display bilingual content (EN/FR from database)", "Nice to Have"],
            ["FR-1.7", "Product search functionality", "Nice to Have"],
          ],
          [1200, 6160, 2000]
        ),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3.2 Shopping Cart")],
        }),
        createTable(
          ["ID", "Requirement", "Priority"],
          [
            ["FR-2.1", "Add/remove items from cart", "Must Have"],
            ["FR-2.2", "Update item quantities", "Must Have"],
            ["FR-2.3", "Persist cart across sessions (local storage)", "Must Have"],
            ["FR-2.4", "Display cart subtotal and item count", "Must Have"],
            ["FR-2.5", "Slide-out cart drawer for quick access", "Must Have"],
            ["FR-2.6", "Cart badge showing item count in header", "Must Have"],
          ],
          [1200, 6160, 2000]
        ),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3.3 Checkout & Payments")],
        }),
        createTable(
          ["ID", "Requirement", "Priority"],
          [
            ["FR-3.1", "Collect shipping information", "Must Have"],
            ["FR-3.2", "Calculate shipping costs (free over $100)", "Must Have"],
            ["FR-3.3", "Calculate Quebec/Canadian taxes", "Must Have"],
            ["FR-3.4", "Integrate Stripe Checkout for payments", "Must Have"],
            ["FR-3.5", "Send order confirmation email", "Must Have"],
            ["FR-3.6", "Order success page with confirmation", "Must Have"],
            ["FR-3.7", "Handle Stripe webhooks for order fulfillment", "Must Have"],
          ],
          [1200, 6160, 2000]
        ),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3.4 Custom Orders")],
        }),
        createTable(
          ["ID", "Requirement", "Priority"],
          [
            ["FR-4.1", "Custom order request form", "Must Have"],
            ["FR-4.2", "Support multiple request types (jacket, bag, pouch, other)", "Must Have"],
            ["FR-4.3", "Collect customer preferences (colors, fabrics, budget)", "Must Have"],
            ["FR-4.4", "Image upload for reference photos", "Nice to Have"],
            ["FR-4.5", "Request confirmation with reference number", "Must Have"],
            ["FR-4.6", "Admin notification for new requests", "Must Have"],
          ],
          [1200, 6160, 2000]
        ),

        new Paragraph({ children: [new PageBreak()] }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3.5 Content Pages")],
        }),
        createTable(
          ["ID", "Requirement", "Priority"],
          [
            ["FR-5.1", "Homepage with hero, featured products, CTAs", "Must Have"],
            ["FR-5.2", "About page with brand story", "Must Have"],
            ["FR-5.3", "Contact page with form", "Must Have"],
            ["FR-5.4", "Shipping & Returns information", "Must Have"],
            ["FR-5.5", "Privacy Policy page", "Must Have"],
            ["FR-5.6", "Terms of Service page", "Must Have"],
          ],
          [1200, 6160, 2000]
        ),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3.6 PWA Features")],
        }),
        createTable(
          ["ID", "Requirement", "Priority"],
          [
            ["FR-6.1", "Web app manifest for installability", "Must Have"],
            ["FR-6.2", "Service worker for offline support", "Nice to Have"],
            ["FR-6.3", "App icons for all platforms", "Must Have"],
            ["FR-6.4", "Splash screen configuration", "Nice to Have"],
            ["FR-6.5", "Push notification support", "Future"],
          ],
          [1200, 6160, 2000]
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // ==================== 4. TECHNICAL ARCHITECTURE ====================
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("4. Technical Architecture")],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("4.1 Technology Stack")],
        }),
        createTable(
          ["Layer", "Technology", "Purpose"],
          [
            ["Framework", "Next.js 16 (App Router)", "React framework with SSR/SSG"],
            ["Language", "TypeScript", "Type-safe development"],
            ["Styling", "Tailwind CSS 4", "Utility-first CSS framework"],
            ["State Management", "Zustand", "Lightweight state management"],
            ["Database", "Supabase (PostgreSQL)", "Backend-as-a-service with RLS"],
            ["Payments", "Stripe", "Payment processing"],
            ["Hosting", "Vercel", "Edge deployment platform"],
            ["Icons", "Lucide React", "Modern icon library"],
          ],
          [2500, 3500, 3360]
        ),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("4.2 System Architecture")],
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "The application follows a modern JAMstack architecture with server-side rendering for SEO and client-side interactivity for the shopping experience.",
              size: 24,
              font: "Arial",
            }),
          ],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Frontend: Next.js App Router with React Server Components", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "API: Next.js API Routes for checkout, webhooks, forms", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Database: Supabase with Row Level Security policies", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Payments: Stripe Checkout with webhook confirmation", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "CDN: Vercel Edge Network for global distribution", size: 24, font: "Arial" })],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("4.3 Database Schema")],
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "The database consists of the following core tables:",
              size: 24,
              font: "Arial",
            }),
          ],
        }),
        createTable(
          ["Table", "Purpose", "Key Fields"],
          [
            ["products", "Product catalog", "id, name, slug, price, category, images, in_stock"],
            ["product_variants", "Size/color options", "id, product_id, name, price_modifier"],
            ["orders", "Purchase records", "id, order_number, customer_email, items, total, status"],
            ["custom_order_requests", "Custom requests", "id, request_number, request_type, description, status"],
            ["contact_messages", "Contact form submissions", "id, name, email, subject, message"],
          ],
          [2800, 2800, 3760]
        ),

        new Paragraph({ children: [new PageBreak()] }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("4.4 Project Structure")],
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: "libertycherie/",
              size: 22,
              font: "Courier New",
              bold: true,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "\u251C\u2500\u2500 public/                 # Static assets (images, icons, manifest)\n\u251C\u2500\u2500 src/\n\u2502   \u251C\u2500\u2500 app/               # Next.js App Router pages\n\u2502   \u2502   \u251C\u2500\u2500 api/           # API routes (checkout, webhooks)\n\u2502   \u2502   \u251C\u2500\u2500 products/      # Product catalog page\n\u2502   \u2502   \u251C\u2500\u2500 product/       # Product detail pages\n\u2502   \u2502   \u251C\u2500\u2500 checkout/      # Checkout flow\n\u2502   \u2502   \u2514\u2500\u2500 custom-order/  # Custom order form\n\u2502   \u251C\u2500\u2500 components/        # React components\n\u2502   \u251C\u2500\u2500 lib/               # Utilities (Supabase, Stripe)\n\u2502   \u251C\u2500\u2500 store/             # Zustand stores\n\u2502   \u2514\u2500\u2500 types/             # TypeScript definitions\n\u251C\u2500\u2500 supabase/              # Database schema\n\u2514\u2500\u2500 scripts/               # Utility scripts",
              size: 20,
              font: "Courier New",
            }),
          ],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // ==================== 5. USER STORIES ====================
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("5. User Stories")],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("5.1 Shopping Experience")],
        }),

        new Paragraph({
          spacing: { before: 200 },
          children: [
            new TextRun({ text: "US-1: Browse Products", bold: true, size: 24, font: "Arial" }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "As a ", size: 24, font: "Arial" }),
            new TextRun({ text: "customer", italics: true, size: 24, font: "Arial" }),
            new TextRun({ text: ", I want to ", size: 24, font: "Arial" }),
            new TextRun({ text: "browse products by category", italics: true, size: 24, font: "Arial" }),
            new TextRun({ text: " so that ", size: 24, font: "Arial" }),
            new TextRun({ text: "I can find items that interest me.", italics: true, size: 24, font: "Arial" }),
          ],
        }),
        new Paragraph({
          spacing: { before: 100 },
          children: [new TextRun({ text: "Acceptance Criteria:", bold: true, size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Products display in a responsive grid (4 columns desktop, 2 mobile)", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Category filter buttons are visible and functional", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Product cards show image, name, price, and add-to-cart button", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Page loads in under 3 seconds on 3G connection", size: 22, font: "Arial" })],
        }),

        new Paragraph({
          spacing: { before: 300 },
          children: [
            new TextRun({ text: "US-2: Add to Cart", bold: true, size: 24, font: "Arial" }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "As a ", size: 24, font: "Arial" }),
            new TextRun({ text: "customer", italics: true, size: 24, font: "Arial" }),
            new TextRun({ text: ", I want to ", size: 24, font: "Arial" }),
            new TextRun({ text: "add items to my cart", italics: true, size: 24, font: "Arial" }),
            new TextRun({ text: " so that ", size: 24, font: "Arial" }),
            new TextRun({ text: "I can purchase multiple items at once.", italics: true, size: 24, font: "Arial" }),
          ],
        }),
        new Paragraph({
          spacing: { before: 100 },
          children: [new TextRun({ text: "Acceptance Criteria:", bold: true, size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Add to cart button provides visual feedback on click", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Cart drawer slides open showing added item", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Header cart badge updates with item count", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Cart persists after page refresh", size: 22, font: "Arial" })],
        }),

        new Paragraph({
          spacing: { before: 300 },
          children: [
            new TextRun({ text: "US-3: Complete Purchase", bold: true, size: 24, font: "Arial" }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "As a ", size: 24, font: "Arial" }),
            new TextRun({ text: "customer", italics: true, size: 24, font: "Arial" }),
            new TextRun({ text: ", I want to ", size: 24, font: "Arial" }),
            new TextRun({ text: "complete my purchase securely", italics: true, size: 24, font: "Arial" }),
            new TextRun({ text: " so that ", size: 24, font: "Arial" }),
            new TextRun({ text: "I receive my handcrafted items.", italics: true, size: 24, font: "Arial" }),
          ],
        }),
        new Paragraph({
          spacing: { before: 100 },
          children: [new TextRun({ text: "Acceptance Criteria:", bold: true, size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Checkout form validates required fields", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Shipping cost calculated correctly (free over $100)", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Stripe Checkout opens with correct amount", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Success page displays with order confirmation", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Order saved to database with correct status", size: 22, font: "Arial" })],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("5.2 Custom Orders")],
        }),

        new Paragraph({
          spacing: { before: 200 },
          children: [
            new TextRun({ text: "US-4: Request Custom Creation", bold: true, size: 24, font: "Arial" }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "As a ", size: 24, font: "Arial" }),
            new TextRun({ text: "customer", italics: true, size: 24, font: "Arial" }),
            new TextRun({ text: ", I want to ", size: 24, font: "Arial" }),
            new TextRun({ text: "request a custom piece", italics: true, size: 24, font: "Arial" }),
            new TextRun({ text: " so that ", size: 24, font: "Arial" }),
            new TextRun({ text: "I can get something uniquely made for me.", italics: true, size: 24, font: "Arial" }),
          ],
        }),
        new Paragraph({
          spacing: { before: 100 },
          children: [new TextRun({ text: "Acceptance Criteria:", bold: true, size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Form allows selection of request type", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Customer can describe their vision in detail", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Confirmation page shows request reference number", size: 22, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Request saved to database for admin review", size: 22, font: "Arial" })],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // ==================== 6. DESIGN SPECIFICATIONS ====================
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("6. Design Specifications")],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("6.1 Brand Colors")],
        }),
        createTable(
          ["Color", "Hex Code", "Usage"],
          [
            ["Primary (Dusty Rose)", "#C26E7A", "Buttons, links, accents, headings"],
            ["Primary Dark", "#A85562", "Hover states, emphasis"],
            ["Primary Light", "#E8B4BC", "Backgrounds, highlights"],
            ["Secondary (Sage Green)", "#7A9E7E", "Success states, secondary accents"],
            ["Accent (Warm Gold)", "#D4A574", "Decorative elements, badges"],
            ["Charcoal", "#3D3D3D", "Body text, headings"],
            ["Soft Gray", "#8A8A8A", "Secondary text, borders"],
            ["Cream", "#FAF8F5", "Page backgrounds, cards"],
          ],
          [3200, 2000, 4160]
        ),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("6.2 Typography")],
        }),
        createTable(
          ["Element", "Font", "Size", "Weight"],
          [
            ["H1 Headings", "Playfair Display", "36-48px", "500"],
            ["H2 Headings", "Playfair Display", "28-32px", "500"],
            ["H3 Headings", "Playfair Display", "20-24px", "500"],
            ["Body Text", "Inter", "16px", "400"],
            ["Small Text", "Inter", "14px", "400"],
            ["Buttons", "Inter", "16px", "500"],
          ],
          [2500, 2800, 2000, 2060]
        ),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("6.3 Design Principles")],
        }),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          children: [
            new TextRun({ text: "Feminine & Artisanal: ", bold: true, size: 24, font: "Arial" }),
            new TextRun({ text: "Soft colors, floral motifs, handcrafted feel", size: 24, font: "Arial" }),
          ],
        }),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          children: [
            new TextRun({ text: "Mobile-First: ", bold: true, size: 24, font: "Arial" }),
            new TextRun({ text: "Design for mobile, enhance for desktop", size: 24, font: "Arial" }),
          ],
        }),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          children: [
            new TextRun({ text: "Product-Focused: ", bold: true, size: 24, font: "Arial" }),
            new TextRun({ text: "Let the beautiful products shine", size: 24, font: "Arial" }),
          ],
        }),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          children: [
            new TextRun({ text: "Minimal Friction: ", bold: true, size: 24, font: "Arial" }),
            new TextRun({ text: "Easy navigation, quick checkout", size: 24, font: "Arial" }),
          ],
        }),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          children: [
            new TextRun({ text: "Consistent Aesthetic: ", bold: true, size: 24, font: "Arial" }),
            new TextRun({ text: "Match Instagram brand presence", size: 24, font: "Arial" }),
          ],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // ==================== 7. TIMELINE & MILESTONES ====================
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("7. Timeline & Milestones")],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("7.1 Development Phases")],
        }),
        createTable(
          ["Phase", "Duration", "Deliverables"],
          [
            ["Phase 1: Foundation", "Week 1", "Project setup, database schema, basic routing"],
            ["Phase 2: Core Features", "Weeks 2-3", "Product catalog, cart, checkout flow"],
            ["Phase 3: Custom Orders", "Week 4", "Custom order form, contact page, admin tools"],
            ["Phase 4: Polish", "Week 5", "PWA setup, testing, performance optimization"],
            ["Phase 5: Launch", "Week 6", "Deployment, Stripe/Supabase production setup"],
          ],
          [2500, 1800, 5060]
        ),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("7.2 Key Milestones")],
        }),
        createTable(
          ["Milestone", "Target Date", "Success Criteria"],
          [
            ["MVP Complete", "Week 3", "Can browse products and complete purchase"],
            ["Soft Launch", "Week 5", "Site live with limited traffic for testing"],
            ["Public Launch", "Week 6", "Full launch with marketing push"],
            ["First 100 Orders", "Week 12", "Achieved 100 successful orders"],
          ],
          [2500, 2000, 4860]
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // ==================== 8. RISKS & MITIGATIONS ====================
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("8. Risks & Mitigations")],
        }),
        createTable(
          ["Risk", "Impact", "Probability", "Mitigation"],
          [
            ["Payment processing issues", "High", "Low", "Use Stripe test mode extensively; monitor webhooks"],
            ["Low initial traffic", "Medium", "Medium", "Leverage Instagram following; SEO optimization"],
            ["Inventory management", "Medium", "Medium", "Stock quantity tracking; low-stock alerts"],
            ["Mobile performance", "High", "Low", "Lighthouse audits; image optimization"],
            ["Custom order volume", "Low", "Medium", "Clear expectations on timeline; quote approval flow"],
          ],
          [2500, 1200, 1500, 4160]
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // ==================== 9. APPENDIX ====================
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("9. Appendix")],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("9.1 Environment Variables")],
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: "Required environment variables for deployment:",
              size: 24,
              font: "Arial",
            }),
          ],
        }),
        createTable(
          ["Variable", "Description"],
          [
            ["NEXT_PUBLIC_SUPABASE_URL", "Supabase project URL"],
            ["NEXT_PUBLIC_SUPABASE_ANON_KEY", "Supabase anonymous key"],
            ["SUPABASE_SERVICE_ROLE_KEY", "Supabase service role key (server only)"],
            ["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "Stripe publishable key"],
            ["STRIPE_SECRET_KEY", "Stripe secret key (server only)"],
            ["STRIPE_WEBHOOK_SECRET", "Stripe webhook signing secret"],
            ["NEXT_PUBLIC_APP_URL", "Production URL"],
          ],
          [4500, 4860]
        ),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("9.2 API Endpoints")],
        }),
        createTable(
          ["Endpoint", "Method", "Purpose"],
          [
            ["/api/checkout", "POST", "Create Stripe checkout session"],
            ["/api/webhooks/stripe", "POST", "Handle Stripe webhook events"],
            ["/api/custom-order", "POST", "Submit custom order request"],
            ["/api/contact", "POST", "Submit contact form message"],
          ],
          [3500, 1500, 4360]
        ),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("9.3 References")],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Instagram: @libertycheriecreation", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Next.js Documentation: https://nextjs.org/docs", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Supabase Documentation: https://supabase.com/docs", size: 24, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun({ text: "Stripe Documentation: https://stripe.com/docs", size: 24, font: "Arial" })],
        }),

        // ==================== END ====================
        new Paragraph({ spacing: { before: 600 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "\u2014 End of Document \u2014",
              size: 22,
              color: COLORS.softGray,
              font: "Arial",
            }),
          ],
        }),
      ],
    },
  ],
});

// Generate the document
Packer.toBuffer(doc).then((buffer) => {
  const outputPath = process.argv[2] || "Liberty_Cherie_PRD.docx";
  fs.writeFileSync(outputPath, buffer);
  console.log(`PRD document generated: ${outputPath}`);
});
