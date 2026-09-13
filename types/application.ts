export interface Application {
  id: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  cover_letter: string | null;
  created_at: string;
}

export interface ApplicationFormData {
  full_name: string;
  email: string;
  phone: string;
  cover_letter: string;
}
