// utils/type.ts mein jaakar ye change karein
export type formBikeDataType = {
  id: number;
  bikeName: string;
  bikeModel: string;
  bikePrice: number;
  bikeBrand: string;
  bikeColor: string[];
  bikeFuel: string;
  bikeCC?: string;          // Added '?' to make it optional[cite: 6]
  bikeDescription?: string; // Added '?' to make it optional[cite: 6]
};


export const bikeBrand = ["Honda", "Yamaha", "Suzuki", "Kawasaki", "Royal Enfield", "KTM", "TVS", "Bajaj"];
export const bikeColor = ["Red", "Blue", "Black", "White", "Silver", "Grey"];
export const bikeFuel = ["Petrol", "Electric"];