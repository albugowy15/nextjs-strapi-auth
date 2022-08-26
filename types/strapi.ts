export type StrapiUser = {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
  
export type StrapiResponse = {
    jwt: string;
    user: StrapiUser;
  };