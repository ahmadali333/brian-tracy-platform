export interface Job {
  id: number;
  title: string;
  department: string;
  type: string;
  location: string;
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  createdAt?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  blogImage: string;
  uploadDate: string;
  readTime: string;
  stack: string;
  canonicalUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  metaTags?: string;
}

export interface JobApplication {
  id: number;
  jobId: number;
  jobTitle?: string;
  name: string;
  email: string;
  portfolio?: string;
  coverLetter?: string;
  cvUrl?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ArticleDisplay {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  stack: string;
  category: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}
