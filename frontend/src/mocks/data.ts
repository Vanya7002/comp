import type { ComputersResponseDto } from "../api/computerAPI";

export const computersPayload: ComputersResponseDto = {
  items: [
    {
      id: 1,
      number: "PC01",
      typeId: 1,
      status: "available",
    },
    {
      id: 2,
      number: "PC02",
      typeId: 1,
      status: "occupied",
    },
    {
      id: 3,
      number: "PC03",
      typeId: 2,
      status: "available",
    },
    {
      id: 4,
      number: "PC04",
      typeId: 1,
      status: "maintenance",
    },
    {
      id: 5,
      number: "PC05",
      typeId: 1,
      status: "available",
    },
    {
      id: 6,
      number: "PC06",
      typeId: 1,
      status: "occupied",
    },
    {
      id: 7,
      number: "PC07",
      typeId: 1,
      status: "available",
    },
    {
      id: 8,
      number: "PC08",
      typeId: 1,
      status: "available",
    },
    {
      id: 9,
      number: "PC09",
      typeId: 1,
      status: "occupied",
    },
    {
      id: 10,
      number: "PC10",
      typeId: 1,
      status: "available",
    },
    {
      id: 11,
      number: "PC11",
      typeId: 2,
      status: "available",
    },
    {
      id: 12,
      number: "PC12",
      typeId: 2,
      status: "occupied",
    },
    {
      id: 13,
      number: "PC13",
      typeId: 2,
      status: "available",
    },
    {
      id: 14,
      number: "PC14",
      typeId: 2,
      status: "maintenance",
    },
    {
      id: 15,
      number: "PC15",
      typeId: 2,
      status: "available",
    },
  ],
  page: 1,
  total: 15,
};
import type { ComputerTypesResponseDto } from "../api/computerTypes";

export const computerTypesPayload: ComputerTypesResponseDto = {
  items: [
    { id: 1, name: "Обычный", pricePerHour: 100 },
    { id: 2, name: "VIP", pricePerHour: 180 },
  ],
  page: 1,
  total: 2,
};
