export interface DonorRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface DonorLoginCredentials {
  email: string;
  password: string;
}

export interface DonorAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organizationId: string;
}

export interface DonorAuthResponse {
  token: string;
  donor: DonorAccount;
}
