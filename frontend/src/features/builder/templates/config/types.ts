
// ✅ Define types ONCE, reuse everywhere

export interface HeaderConfig {
  show: boolean;
  sticky: boolean;
  container: string;
  padding: string;
  navGap: string;
  logoSize: string;
  background: {
    scrolled: string;
    initial: string;
  };
  navLinkClass: string;
  showThemeToggle: boolean;
  themeToggleBorder: string;
}

export interface HeroConfig {
  layout: string;
  showSideSocials: boolean;
  showAvatar: boolean;
  showGradient: boolean;
  section: string;
  container: string;
  contentWrapper: string;
  contentArea: string;
  badge: string;
  greeting: string;
  name: string;
  role: string;
  summary: string;
  socialPosition: string;
  socialAlign: string;
  avatarSize?: string;
  avatarRounding?: string;
  avatarGlow?: boolean;
  avatarRingClass?: string;
  avatarOuterRing?: string;
}

export interface AboutConfig {
  layout: string;
  showAvatar: boolean;
  showDecorations: boolean;
  showInfoPills: boolean;
  avatarPosition: string;
  avatarShape: string;
  headingAlign: string;
  badge: string;
  title: string;
  grid: string;
  avatarColumn: string;
  textColumn: string;
  avatarOuter: string;
  avatarMiddle: string;
  avatarInner: string;
  avatarClass: string;
  text: string;
  pillStyle: string;
  avatarBorderStyle?: string;
}

export interface QualificationConfig {
  layout: string;
  showTimeline: boolean;
  splitColumns: boolean;
  headingAlign: string;
  badge: string;
  title: string;
  subtitle: string;
  grid: string;
  singleColumn: string;
  timelineDot: string;
  timelineDotInner: string;
  timelineTrack: string;
  cardClass: string;
  showPagination: boolean;
  initialCount: number;
  paginateThreshold: number;
}

export interface SkillsConfig {
  layout: string;
  headingAlign: string;
  badge: string;
  title: string;
  subtitle: string;
  grid: string;
  itemClass: string;
  showBullet: boolean;
  bulletClass: string;
  bulletIcon?: string;
  textClass: string;
  showShine?: boolean;
  shineClass?: string;
}

export interface ProjectsConfig {
  layout: string;
  headingAlign: string;
  badge: string;
  title: string;
  subtitle: string;
  grid: string;
  itemWrapper: string;
  cardHeight: string;
  cardClass: string;
  imageClass: string;
  imageWrapper?: string;
  showOverlay: boolean;
  overlayClass: string;
  titlePosition: string;
  titleClass: string;
  titleText: string;
  showDescriptionOnCard?: boolean;
  descriptionClass?: string;
  showTagsOnCard?: boolean;
  tagsClass?: string;
  tagClass?: string;
  showModal: boolean;
}
export interface ContactConfig {
  layout: string;
  headingAlign: string;
  badge: string;
  title: string;
  subtitle: string;
  grid: string;
  showContactCards: boolean;
  contactCardsLayout: string;
  cardClass: string;
  cardIconWrapper: string;
  cardIconClass: string;
  showForm: boolean;
  formPosition: string;
  formWrapper?: string;
}
export interface FooterConfig {
  show: boolean;
  layout: string; // "horizontal" | "stacked" | "centered" | "none"

  // Wrapper
  background: string;
  padding: string;
  container: string;

  // Content layout
  contentLayout: string;

  // Identity section
  showIdentity: boolean;
  identityClass: string;
  nameClass: string;
  roleClass: string;

  // Nav links
  showNav: boolean;
  navLayout: string;
  navLinkClass: string;

  // Socials
  showSocials: boolean;
  socialsLayout: string;
  socialLinkClass: string;

  // Bottom bar
  showBottomBar: boolean;
  bottomBarClass: string;
}

export interface ContainerConfig {
  section: string;
  inner: string;
}

export interface TemplateConfig {
  header: HeaderConfig;
  hero: HeroConfig;
  about: AboutConfig;
  qualification: QualificationConfig;
  skills: SkillsConfig;
  projects: ProjectsConfig;
  contact: ContactConfig;
  container: ContainerConfig;
  footer: FooterConfig;
}

