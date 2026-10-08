export interface RelatedEntities {
  powerSwitch?: string;
  mode?: string;
  filterLifeLevel?: string;
  filterLeftTime?: string;
  batteryLevel?: string;
  chargingState?: string;
  waterShortage?: string;
  physicalControlLock?: string;
  noDisturb?: string;
  outWaterInterval?: string;
  outWaterInterval2?: string;
  resetFilterButton?: string;
  // Only created by the xiaomi_pet_fountain_2 integration
  pumpBlocked?: string;
  fault?: string;
  keepMode?: string;
  lastModeRestore?: string;
}
