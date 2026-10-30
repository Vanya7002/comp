import { http } from "./http";

export type ComputerStatus =
  | "available"
  | "occupied"
  | "maintenance";

export interface ComputerDto {
  id: number;
  number: string;
  typeId: number;
  status: ComputerStatus;
}

export interface ComputersResponseDto {
  items: ComputerDto[];
  page: number;
  total: number;
}

export async function fetchComputers(
  page = 1
): Promise<ComputersResponseDto> {
  const { data } = await http.get<ComputersResponseDto>(
    "/computers",
    {
      params: { page },
    }
  );

  return data;
}