export interface SavedView {
  id: string;
  name: string;           // e.g., "Kitchen Area", "Top Floor"
  zoom: number;           // e.g., 1.5 (150%)
  panX: number;           // in canvas pixels
  panY: number;
  levelIds: string[];     // visible levels in this view
}
