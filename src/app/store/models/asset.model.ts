// src/app/models/asset.model.ts

export interface Asset {
    id: string;
    name: string;
    class: string;
    exchange: string;
    symbol: string;
    status: string;
    tradable: boolean;
    marginable: boolean;
    maintenance_margin_requirement: number;
    margin_requirement_long: number;
    margin_requirement_short: number;
    shortable: boolean;
    easy_to_borrow: boolean;
    fractionable: boolean;
  }
  
  // You might want to create enums for some of these properties
  // if they have a fixed set of possible values
  
  export enum AssetStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED'
    // Add other statuses as needed
  }
  
  export enum AssetClass {
    STOCK = 'STOCK',
    ETF = 'ETF',
    OPTION = 'OPTION',
    CRYPTO = 'CRYPTO'
    // Add other classes as needed
  }
  