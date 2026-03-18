export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export const profileData: ProfileData = {
  name: "Willin Wang",
  title: "Digital Nomad & AI Entrepreneur",
  bio: "To be Willin is to be willing.",
  avatar: "/avatar.jpg", // Placeholder - will need to add actual avatar
  socialLinks: {
    github: "https://github.com/willin",
    twitter: "https://twitter.com/willinwang",
    linkedin: "https://linkedin.com/in/willinwang"
  }
};
