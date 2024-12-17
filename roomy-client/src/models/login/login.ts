export type LoginReq = { email: string; password: string };
export type LoginRes = { success: boolean; message: string; token: string };

export type RegisterReq = { name: string; email: string; password: string };
export type RegisterRes = { success: boolean; message: string };
