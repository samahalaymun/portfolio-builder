export type PortfolioContent = {
  avatar?: {
    url: string;
    publicId: string;
  };
  cover?: {
    url: string;
    publicId: string;
  };
  // لاحقًا: gallery, sections...
  [key: string]: any;
};
