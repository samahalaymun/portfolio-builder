export const minimalConfig = {
  header: {
    show: false, // No header
    sticky: false,
    padding: "",
    container: "",
    navGap: "",
    logoSize: "",
    background: { scrolled: "", initial: "" },
    navLinkClass: "",
    showThemeToggle: false,
    themeToggleBorder: "",
  },
  hero: {
    // ✅ Layout: Centered, simple
    layout: "centered",
    showSideSocials: false,
    showAvatar: false, // Text-focused
    showGradient: false, // Clean look

    // Container
    section: "relative w-full overflow-hidden",
    container: "max-w-2xl mx-auto px-6 pt-16 md:pt-24 pb-16 md:pb-20",
    contentWrapper: "flex flex-col items-center text-center gap-8",
    contentArea: "flex flex-col gap-4 w-full items-center",

    // Typography (smaller, cleaner)
    badge:
      "inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit",
    greeting: "block font-bold tracking-tight text-xl md:text-2xl",
    name: "block text-primary font-bold tracking-tight leading-[1.1] break-words text-4xl md:text-5xl",
    role: "font-semibold text-muted-foreground mt-2 text-lg md:text-xl",
    summary: "text-muted-foreground leading-relaxed text-sm max-w-lg",

    // Socials
    socialPosition: "center",
    socialAlign: "justify-center",
  },
  about: {
    // ✅ Layout: Simple stack, NO avatar, NO decorations
    layout: "single-column",
    showAvatar: false, // Text-focused
    showDecorations: false,
    showInfoPills: false, // Cleaner - no pills
    avatarPosition: "none",
    avatarShape: "circle",
    // Heading (left-aligned, smaller)
    headingAlign: "left",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-2xl md:text-3xl font-bold text-foreground tracking-tight",

    // Layout
    grid: "flex flex-col gap-6",
    avatarColumn: "",
    textColumn: "",

    // Avatar (not used)
    avatarOuter: "",
    avatarMiddle: "",
    avatarInner: "",
    avatarClass: "",

    // Text (smaller, cleaner)
    text: "text-sm md:text-base text-muted-foreground leading-relaxed",
    pillStyle: "",
  },
  qualification: {
    layout: "stacked",
    showTimeline: false,
    splitColumns: false,
    headingAlign: "left",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-2xl md:text-3xl font-bold text-foreground tracking-tight",
    subtitle: "text-muted-foreground text-sm max-w-md",
    grid: "flex flex-col gap-8",
    singleColumn: "flex flex-col gap-8",
    timelineDot: "",
    timelineDotInner: "",
    timelineTrack: "",
    cardClass:
      "border-l-2 border-primary pl-4 py-2 space-y-2 hover:border-primary/70 transition-colors",
    showPagination: true,
    initialCount: 2,
    paginateThreshold: 3,
  },
  skills: {
    layout: "tags", // ✅ Tag-based layout

    // Heading (left-aligned, smaller)
    headingAlign: "left",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-2xl md:text-3xl font-bold text-foreground tracking-tight",
    subtitle: "text-muted-foreground text-sm max-w-md",

    // ✅ Flex wrap (tag cloud style)
    grid: "flex flex-wrap gap-2",

    // ✅ Simple tags
    itemClass:
      "px-3 py-1.5 rounded-full bg-muted/60 border border-border text-sm text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors",

    // No bullet
    showBullet: false,
    bulletClass: "",
    bulletIcon: "",
    showShine: false,
    shineClass: "",
    // Text (simpler)
    textClass: "text-sm font-medium",
  },
  projects: {
    layout: "list", // ✅ Simple list layout

    // Heading (left-aligned)
    headingAlign: "left",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-2xl md:text-3xl font-bold text-foreground tracking-tight",
    subtitle: "text-muted-foreground text-sm max-w-md",

    // ✅ Stacked list
    grid: "flex flex-col gap-4",
    itemWrapper: "",

    // ✅ Horizontal cards (image + text side by side)
    cardHeight: "h-auto",
    cardClass:
      "group flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-border bg-muted/40 hover:border-primary/30 hover:bg-muted/60 transition-all cursor-pointer",

    // Image (smaller, on left)
    imageClass: "object-cover w-full sm:w-32 h-32 rounded-md flex-shrink-0",
    imageWrapper: "w-full sm:w-32 h-32 flex-shrink-0",

    // ✅ No overlay, show content inline
    showOverlay: false,
    overlayClass: "",

    // Title inline with description
    titlePosition: "inline",
    titleClass: "flex-1",
    titleText:
      "font-semibold text-foreground mb-2 group-hover:text-primary transition-colors",
    showTagsOnCard: false,
    tagsClass: "",
    tagClass: "",
    // Show description on card (no modal)
    showDescriptionOnCard: true,
    descriptionClass: "text-sm text-muted-foreground line-clamp-2",

    // Modal
    showModal: true,
  },
  contact: {
    layout: "centered", // ✅ Simple centered layout

    // Heading (left-aligned)
    headingAlign: "left",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-2xl md:text-3xl font-bold text-foreground tracking-tight",
    subtitle: "text-muted-foreground text-sm max-w-md",

    // ✅ Single column, narrow
    grid: "flex flex-col gap-8 max-w-2xl mx-auto",

    // ✅ Simple contact info (no fancy cards)
    showContactCards: true,
    contactCardsLayout: "flex flex-col gap-3",
    cardClass:
      "flex items-center gap-3 p-3 text-sm text-muted-foreground hover:text-primary transition-colors",
    cardIconWrapper: "flex-shrink-0",
    cardIconClass: "text-primary w-4 h-4",

    // ✅ No form - just contact info + mailto link
    showForm: false,
    formPosition: "none",
  },
  footer: {
    show: false, // ✅ No footer in minimal template
    layout: "none",
    background: "",
    padding: "",
    container: "",
    contentLayout: "",
    showIdentity: false,
    identityClass: "",
    nameClass: "",
    roleClass: "",
    showNav: false,
    navLayout: "",
    navLinkClass: "",
    showSocials: false,
    socialsLayout: "",
    socialLinkClass: "",
    showBottomBar: false,
    bottomBarClass: "",
  },
  container: {
    section: "py-12 md:py-16",
    inner: "max-w-2xl mx-auto px-6",
  },
};
