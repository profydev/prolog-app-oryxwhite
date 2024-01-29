export type Testimonial = {
  title: string;
  text: string;
  userName: string;
  userRole: string;
  userCompany: string;
  userImage: {
    src: string;
    width: number;
    height: number;
  };
};

export type Company = {
  name: string;
  logo: string;
};

export type Section = {
  sectionType: string;
  theme: string;
  title: string;
  subtitle?: string;
  image?: {
    src: string;
    width: number;
    height: number;
  };
  companies?: Company[];
  testimonials?: Testimonial[];
};

export type Meta = {
  title: string;
  description: string;
  image: string;
};

export type LandingContent = {
  meta: Meta;
  sections: Section[];
};
