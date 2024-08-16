export const drivers: [string, number, boolean, string][] = [
    ["James", 43, true, ""],
    ["Joe", 41, true, ""],
    ["David", 38, false, "Unavailable"],
    ["karim", 32, true, ""],
    ["Sophie", 29, true, ""],
    ['Ramzi', 27, true, ""],
    ["Adam", 20, true, ""]
]

export const trucks: [string, boolean, number, string][] = [
    ["Ford F-150", true, 12345, "Blue"],
    ["Chevrolet Silverado", false, 67890, "Red"],
    ["Ram 1500", true, 23456, "White"],
    ["Toyota Tacoma", true, 34567, "Silver"],
    ["Honda Ridgeline", false, 45678, "Black"],
    ["Nissan Titan", true, 56789, "Green"],
    ["GMC Sierra", true, 67890, "Gray"],
    ["Jeep Gladiator", false, 78901, "Orange"],
    ["Hyundai Santa Cruz", true, 89012, "Yellow"],
    ["Rivian R1T", true, 90123, "Purple"]
];

type MaintenanceEntry = {
  truckName: string;
  dueDate: string;
  maintenanceType: string;
  provider: string;
  notes: string;
};

export const maintenanceData: MaintenanceEntry[] = [
  {
    truckName: "Truck A",
    dueDate: "2024-08-15",
    maintenanceType: "Oil Change",
    provider: "QuickLube",
    notes: "Regular maintenance check"
  },
  {
    truckName: "Truck B",
    dueDate: "2024-08-20",
    maintenanceType: "Brake Inspection",
    provider: "BrakeMasters",
    notes: "Urgent: squeaking brakes"
  },
  {
    truckName: "Truck C",
    dueDate: "2024-09-05",
    maintenanceType: "Tire Rotation",
    provider: "TirePros",
    notes: "Rotate all tires"
  },
  {
    truckName: "Truck D",
    dueDate: "2024-09-12",
    maintenanceType: "Engine Check",
    provider: "AutoCare",
    notes: "Check engine light issue"
  },
  {
    truckName: "Truck E",
    dueDate: "2024-10-01",
    maintenanceType: "Transmission Fluid",
    provider: "TransFix",
    notes: "Replace transmission fluid"
  },
  {
    truckName: "Truck F",
    dueDate: "2024-10-10",
    maintenanceType: "Battery Replacement",
    provider: "PowerTech",
    notes: "Battery life is low"
  },
  {
    truckName: "Truck G",
    dueDate: "2024-10-20",
    maintenanceType: "Air Filter Change",
    provider: "CleanAir",
    notes: "Replace air filter"
  },
  {
    truckName: "Truck H",
    dueDate: "2024-11-01",
    maintenanceType: "Alignment",
    provider: "AlignIt",
    notes: "Perform wheel alignment"
  },
  {
    truckName: "Truck I",
    dueDate: "2024-11-15",
    maintenanceType: "Suspension Check",
    provider: "SuspensionPro",
    notes: "Check suspension for wear"
  },
  {
    truckName: "Truck J",
    dueDate: "2024-12-01",
    maintenanceType: "Fuel System",
    provider: "FuelFix",
    notes: "Clean fuel injectors"
  }
];

type DriversEntry = {
  fullname: string,
  joinedDate: string,
  vehicleName: string,
  status: boolean,
}

export const driversEntries: DriversEntry[] = [
  {
    fullname: "John Doe",
    joinedDate: "2023-01-15",
    vehicleName: "Ford F-150",
    status: true,
  },
  {
    fullname: "Jane Smith",
    joinedDate: "2022-11-20",
    vehicleName: "Chevrolet Silverado",
    status: false,
  },
  {
    fullname: "Alice Johnson",
    joinedDate: "2023-03-10",
    vehicleName: "Toyota Tacoma",
    status: true,
  },
  {
    fullname: "Bob Brown",
    joinedDate: "2022-07-25",
    vehicleName: "Honda Ridgeline",
    status: true,
  },
  {
    fullname: "Charlie Davis",
    joinedDate: "2023-02-05",
    vehicleName: "Nissan Frontier",
    status: false,
  },
  {
    fullname: "Emily Wilson",
    joinedDate: "2022-12-30",
    vehicleName: "Ram 1500",
    status: true,
  },
  {
    fullname: "David Lee",
    joinedDate: "2023-04-18",
    vehicleName: "GMC Sierra",
    status: false,
  },
  {
    fullname: "Sophia Miller",
    joinedDate: "2023-05-22",
    vehicleName: "Jeep Gladiator",
    status: true,
  },
  {
    fullname: "Michael Taylor",
    joinedDate: "2022-09-14",
    vehicleName: "Hyundai Santa Cruz",
    status: true,
  },
  {
    fullname: "Olivia Anderson",
    joinedDate: "2023-06-08",
    vehicleName: "Subaru Baja",
    status: false,
  },
];


