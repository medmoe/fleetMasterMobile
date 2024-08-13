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

