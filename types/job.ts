export interface Job {
  id: string;
  title: string;
  country: string;
  category: string;
  description: string;
  employer: string;
  location: string;
  employment_type: string;
  requirements: string;
  salary: string | null;
  application_url: string;
  status: "active" | "closed" | "draft";
  created_at: string;
  updated_at: string;
}
