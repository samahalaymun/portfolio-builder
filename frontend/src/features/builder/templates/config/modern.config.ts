export const modernConfig = {
  header: {
    show: true,
    sticky: true,
    container: "max-w-7xl mx-auto h-20",
    padding: "lg:px-12 px-6",
    navGap: "gap-6",
    logoSize: "text-2xl font-bold",
    background: {
      scrolled: "bg-background shadow-lg",
      initial: "bg-background/80 backdrop-blur",
    },
    navLinkClass:
      "px-2 py-1.5 border-b-2 border-transparent hover:border-primary",
    showThemeToggle: true,
    themeToggleBorder: "ml-4",
  },
  hero: {
    // ✅ Layout: Grid with avatar
    layout: "grid",
    showSideSocials: false,
    showAvatar: true, // Big avatar on right
    showGradient: true,
    avatarShape: "square",
    avatarRounding: "rounded-3xl",
    avatarOuterRing: "rounded-3xl w-80 h-80",
    // Container
    section: "relative w-full overflow-hidden min-h-screen flex items-center",
    container: "max-w-7xl mx-auto px-8 lg:px-12 py-40",
    contentWrapper: "grid md:grid-cols-2 gap-12 items-center",
    contentArea: "flex flex-col gap-6 w-full order-2 md:order-1",

    // Typography (HUGE)
    badge:
      "inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit",
    greeting: "block font-bold tracking-tight text-2xl md:text-3xl lg:text-4xl",
    name: "block text-primary font-bold tracking-tight leading-[1.1] break-words text-6xl md:text-8xl",
    role: "font-semibold text-muted-foreground mt-2 text-xl md:text-2xl",
    summary:
      "text-muted-foreground leading-relaxed text-sm md:text-base max-w-xl",

    // Socials
    socialPosition: "bottom",
    socialAlign: "justify-start",

    // Avatar (specific to modern)
    avatarSize: "w-72 h-72",
    avatarGlow: true,
  },
  about: {
    // ✅ Layout: Asymmetric grid (2:3 split), avatar on right
    layout: "asymmetric-grid",
    showAvatar: true,
    showDecorations: true,
    showInfoPills: true,
    avatarPosition: "right", // Different from default!
    avatarShape: "square",
    // Heading (centered, larger)
    headingAlign: "center",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-3xl md:text-4xl font-bold text-foreground tracking-tight",

    // Layout (5 columns: 3 text, 2 avatar)
    grid: "grid md:grid-cols-5 gap-12 items-start",
    avatarColumn: "md:col-span-2 md:order-2",
    textColumn: "md:col-span-3 md:order-1",

    // Avatar (larger)
    avatarOuter: "w-80 h-80 rounded-3xl", // ✅ rounded-3xl instead of rounded-full
    avatarMiddle: "w-72 h-72 rounded-2xl",
    avatarInner: "w-64 h-64 rounded-2xl",
    avatarClass:
      "relative rounded-2xl object-cover ring-4 ring-primary/20 shadow-2xl", // ✅ rounded-2xl

    // Text
    text: "text-base md:text-lg text-muted-foreground leading-relaxed",
    pillStyle:
      "text-xs flex items-center gap-2 font-medium bg-gradient-to-r from-muted to-muted/50 text-muted-foreground px-3 py-1.5 rounded-full border border-primary/20",
  },
  qualification: {
    layout: "two-column",
    showTimeline: true,
    splitColumns: true,
    headingAlign: "center",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-3xl md:text-4xl font-bold text-foreground tracking-tight",
    subtitle: "text-muted-foreground text-base max-w-lg",
    grid: "grid gap-16 md:grid-cols-2",
    singleColumn: "grid-cols-1 max-w-4xl mx-auto",
    timelineDot:
      "w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-background shadow-md",
    timelineDotInner: "w-3 h-3 rounded-full bg-background",
    timelineTrack:
      "absolute left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent",
    cardClass:
      "bg-gradient-to-br from-muted/60 to-muted/30 border border-border/50 rounded-2xl p-6 space-y-4 hover:border-primary/30 hover:shadow-lg transition-all",
    showPagination: true,
    initialCount: 4,
    paginateThreshold: 6,
  },
  skills: {
    layout: "grid", // Grid with gradient cards

    // Heading (centered, larger)
    headingAlign: "center",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-3xl md:text-4xl font-bold text-foreground tracking-tight",
    subtitle: "text-muted-foreground text-base max-w-lg",

    // ✅ 3-column grid
    grid: "grid md:grid-cols-3 gap-4",

    // ✅ Gradient cards with icon
    itemClass:
      "group relative overflow-hidden flex items-center gap-3 px-5 py-4 rounded-2xl border border-border/50 bg-gradient-to-br from-muted/60 to-muted/30 hover:border-primary/30 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default",

    // ✅ Checkmark icon instead of dot
    showBullet: true,
    bulletClass:
      "w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all",
    bulletIcon: "✓", // Checkmark

    // Text (larger)
    textClass:
      "text-base font-semibold text-foreground group-hover:text-primary transition-colors",

    // ✅ Gradient shine effect
    showShine: true,
    shineClass:
      "absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700",
  },
  projects: {
    layout: "grid", // ✅ Fixed grid with larger cards

    // Heading (centered)
    headingAlign: "center",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-3xl md:text-4xl font-bold text-foreground tracking-tight",
    subtitle: "text-muted-foreground text-base max-w-lg",

    // ✅ 2-column grid
    grid: "grid md:grid-cols-2 gap-8",
    itemWrapper: "",
    imageWrapper: "",
    // ✅ Larger cards with more content
    cardHeight: "h-80",
    cardClass:
      "group relative w-full rounded-2xl overflow-hidden bg-muted border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer",

    // Image
    imageClass:
      "object-cover w-full h-full transition-transform duration-700 group-hover:scale-110",

    // ✅ Stronger overlay with gradient
    showOverlay: true,
    overlayClass:
      "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity",

    // ✅ Title + tech tags on card
    titlePosition: "bottom-full", // More info on card
    titleClass: "absolute bottom-0 left-0 right-0 p-6",
    titleText: "font-bold text-white text-xl mb-2 leading-tight",

    // ✅ Show tech tags on card
    showTagsOnCard: true,
    tagsClass: "flex flex-wrap gap-1.5 mt-3",
    tagClass:
      "text-xs px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium",
    showDescriptionOnCard: false,
    descriptionClass: "",
    // Modal
    showModal: true,
  },
  contact: {
    layout: "card-grid", // ✅ Cards in grid with form below

    // Heading (centered)
    headingAlign: "center",
    badge:
      "text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full",
    title: "text-3xl md:text-4xl font-bold text-foreground tracking-tight",
    subtitle: "text-muted-foreground text-base max-w-lg",

    // ✅ Cards grid + form full width below
    grid: "flex flex-col gap-12",

    // ✅ Contact cards in 3-column grid
    showContactCards: true,
    contactCardsLayout: "grid md:grid-cols-3 gap-6",
    cardClass:
      "group flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-muted/60 to-muted/30 hover:border-primary/30 hover:shadow-lg transition-all",
    cardIconWrapper:
      "p-4 rounded-2xl bg-primary/20 group-hover:bg-primary/30 group-hover:scale-110 transition-all",
    cardIconClass: "text-primary w-6 h-6",

    // ✅ Form centered below
    showForm: true,
    formPosition: "bottom", // Full width below cards
    formWrapper: "max-w-2xl mx-auto w-full",
  },
  footer: {
    show: true,
    layout: "centered", // ✅ Centered layout with larger spacing

    // Wrapper (gradient background)
    background: "border-t-2 bg-gradient-to-br from-muted/60 to-muted/30",
    padding: "py-16",
    container: "max-w-7xl mx-auto px-8 lg:px-12",

    // ✅ Content centered
    contentLayout: "flex flex-col items-center gap-10 text-center",

    // Identity section (larger, centered)
    showIdentity: true,
    identityClass: "space-y-2",
    nameClass: "text-foreground font-bold text-2xl",
    roleClass: "text-base text-muted-foreground",

    // ✅ Nav links horizontal, centered
    showNav: true,
    navLayout: "flex flex-wrap gap-6 text-base justify-center",
    navLinkClass:
      "hover:text-primary transition-colors duration-150 font-medium",

    // ✅ Socials larger, centered
    showSocials: true,
    socialsLayout: "flex gap-6 items-center",
    socialLinkClass:
      "p-3 rounded-xl bg-muted/60 hover:bg-primary/20 hover:text-primary transition-all hover:scale-110",

    // Bottom bar (larger text)
    showBottomBar: true,
    bottomBarClass:
      "mt-12 pt-8 border-t border-border/50 text-sm text-muted-foreground/70 text-center",
  },
  container: {
    section: "py-20 md:py-32",
    inner: "max-w-7xl mx-auto px-8 lg:px-12",
  },
};