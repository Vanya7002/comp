import { http } from "./http";

export interface ComputerTypeDto {
  id: number;
  name: string;
  pricePerHour: number;
}

export interface ComputerTypesResponseDto {
  items: ComputerTypeDto[];
  page: number;
  total: number;
}

export async function fetchComputerTypes(
  page = 1
): Promise<ComputerTypesResponseDto> {
  const { data } = await http.get<ComputerTypesResponseDto>(
    "/computer-types",
    {
      params: { page },
    }
  );

  return data;
}