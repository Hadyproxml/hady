/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface DaySchedule {
  day: string;
  morning?: string;
  evening?: string;
  notes?: string;
}

export interface ContactInfo {
  whatsapp: string;
  landline: string;
  facebook: string;
  address: string;
  mapsUrl: string;
}
