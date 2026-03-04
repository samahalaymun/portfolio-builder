export const defaultConfig = {
  header: {
    show: true,
    sticky: true,
    container: "max-w-6xl mx-auto h-16",
    padding: "lg:px-10 px-4",
    navGap: "gap-1",
    logoSize: "text-xl",
    background: {
      scrolled: "bg-background/90 backdrop-blur-md shadow-sm border-b",
      initial: "bg-background/60 backdrop-blur border-b border-transparent",
    },
    navLinkClass: "px-3 py-1.5 rounded-md hover:bg-muted",
    showThemeToggle: true,
    themeToggleBorder: "ml-3 pl-3 border-l",
  },
  hero: {
    // Layout structure
    layout: "flex-with-sidebar", // flex | centered | grid
    showSideSocials: true,
    showAvatar: false,
    showGradient: true,
    // Container
    section: "relative w-full overflow-hidden",
    container:
      "w-full lg:px-10 px-4 mx-auto sm:w-125 md:w-175 lg:w-225 pt-24 md:pt-40 pb-24 md:pb-32",
    contentWrapper: "flex gap-6 items-start",
    contentArea: "flex flex-col gap-5 w-full",

    // Typography
    badge:
      "inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit",
    greeting: "block font-bold tracking-tight text-2xl md:text-3xl lg:text-4xl",
    name: "block text-primary font-bold tracking-tight leading-[1.1] break-words text-5xl md:text-7xl",
    role: "font-semibold text-muted-foreground mt-2 text-xl md:text-2xl",
    summary:
      "text-muted-foreground leading-relaxed text-sm md:text-base max-w-xl",

    // Socials
    socialPosition: "side", // side | bottom | center
    socialAlign: "justify-start",
  },
  about: {
    // ✅ Layout: Two columns with avatar
    layout: "two-column",
    showAvatar: true,
    showDecorations: true, // Decorative rings
    showInfoPills: true,
    avatarPosition: "left",
    avatarShape: "circle",
    // Heading
    headingAlign: "center",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-3xl md:text-4xl font-bold text-foreground tracking-tight",

    // Layout
    grid: "grid lg:grid-cols-2 gap-10 items-center",
    avatarColumn: "",
    textColumn: "",

    // Avatar sizes
    avatarOuter: "w-72 h-72 md:w-80 md:h-80 rounded-full", // ✅ rounded-full
    avatarMiddle: "w-64 h-64 md:w-72 md:h-72 rounded-full",
    avatarInner: "w-56 h-56 md:w-64 md:h-64 rounded-full",
    avatarClass:
      "relative rounded-full object-cover ring-4 ring-primary/20 shadow-xl",

    // Text
    text: "text-base md:text-lg text-muted-foreground leading-relaxed",
    pillStyle:
      "text-xs flex items-center gap-2 font-medium bg-muted text-muted-foreground px-3 py-1.5 rounded-full border",
  },
  qualification: {
    layout: "two-column",
    showTimeline: true,
    splitColumns: true,
    headingAlign: "center",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-3xl md:text-4xl font-bold text-foreground tracking-tight",
    subtitle: "text-muted-foreground text-sm md:text-base max-w-md",
    grid: "grid gap-12 md:grid-cols-2",
    singleColumn: "grid-cols-1 max-w-3xl mx-auto",
    timelineDot: "w-6 h-6 rounded-full bg-background border-2 border-primary",
    timelineDotInner: "w-2 h-2 rounded-full bg-primary",
    timelineTrack: "absolute left-3 top-2 bottom-2 w-px bg-border",
    cardClass:
      "bg-muted/40 border border-border rounded-xl p-4 space-y-3 hover:border-primary/30 transition-colors",
    showPagination: true,
    initialCount: 3,
    paginateThreshold: 5,
  },
  skills: {
    layout: "grid", // grid | tags | categories

    // Heading
    headingAlign: "center",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-3xl md:text-4xl font-bold text-foreground tracking-tight",
    subtitle: "text-muted-foreground text-sm md:text-base max-w-md",

    // Grid layout
    grid: "grid md:grid-cols-2 gap-3",

    // Skill item styling
    itemClass:
      "group w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-muted/40 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-default shadow-sm",

    // Bullet/dot
    showBullet: true,
    bulletIcon: "",
    bulletClass:
      "w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors",
    showShine: false,
    shineClass: "",
    // Text
    textClass:
      "text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors",
  },
  projects: {
    layout: "masonry", // masonry | grid | list

    // Heading
    headingAlign: "center",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-3xl md:text-4xl font-bold text-foreground tracking-tight",
    subtitle: "text-muted-foreground text-sm md:text-base max-w-md",

    // Grid/Masonry
    grid: "columns-1 sm:columns-2 lg:columns-3 gap-6",
    itemWrapper: "mb-6 break-inside-avoid",

    // Card styling
    cardHeight: "h-56", // Fixed height
    cardClass:
      "group relative w-full rounded-xl overflow-hidden bg-muted border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer",

    // Image
    imageClass:
      "object-cover w-full h-full transition-transform duration-500 group-hover:scale-105",
    imageWrapper: "",
    // Overlay
    showOverlay: true,
    overlayClass:
      "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent",

    // Title position
    titlePosition: "bottom", // bottom | center | top
    titleClass: "absolute bottom-0 left-0 right-0 p-4",
    titleText: "font-semibold text-white leading-snug",
    showTagsOnCard: false,
    tagsClass: "",
    tagClass: "",
    showDescriptionOnCard: false,
    descriptionClass: "",
    // Modal
    showModal: true,
  },
  contact: {
    layout: "two-column", // two-column | centered | card-grid

    // Heading
    headingAlign: "center",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-3xl md:text-4xl font-bold text-foreground tracking-tight",
    subtitle: "text-muted-foreground text-sm md:text-base max-w-md",

    // Layout
    grid: "grid lg:grid-cols-2 gap-12 items-start",

    // Contact cards
    showContactCards: true,
    contactCardsLayout: "flex flex-col gap-4 mt-2",
    cardClass:
      "group flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200",
    cardIconWrapper:
      "p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors",
    cardIconClass: "text-primary w-5 h-5",

    // Form
    showForm: true,
    formPosition: "right", // left | right
  },
  footer: {
    show: true,
    layout: "horizontal", // horizontal | stacked | centered

    // Wrapper
    background: "border-t bg-muted/40",
    padding: "py-12",
    container: "max-w-6xl mx-auto px-4 lg:px-10",

    // Content layout
    contentLayout: "flex flex-col lg:flex-row justify-between gap-10",

    // Identity section
    showIdentity: true,
    identityClass: "space-y-1 min-w-[160px]",
    nameClass: "text-foreground font-semibold text-base",
    roleClass: "text-sm text-muted-foreground",

    // Nav links
    showNav: true,
    navLayout: "flex flex-col lg:flex-row gap-3 lg:gap-8 text-sm",
    navLinkClass: "hover:text-foreground transition-colors duration-150",

    // Socials
    showSocials: true,
    socialsLayout: "flex gap-4 items-center",
    socialLinkClass:
      "p-2 rounded-md hover:bg-muted hover:text-foreground text-muted-foreground transition-colors",

    // Bottom bar
    showBottomBar: true,
    bottomBarClass:
      "mt-10 pt-6 border-t border-border/50 text-xs text-muted-foreground/70 text-center",
  },
  container: {
    section: "py-16 md:py-24",
    inner: "lg:px-10 px-4 mx-auto sm:w-125 md:w-175 lg:w-225",
  },
};

