import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Dataset from '../interfaces/Dataset';

export interface DatasetState {
  datasets: Dataset[];
}

const datasets = new Map<string, Dataset>();
const initialState = { datasets: [] } as DatasetState;

const getDatasetId = (dataset: Dataset): string => {
  return dataset.type + dataset.name;
};

const datasetSlice = createSlice({
  name: 'dataset',
  initialState,
  reducers: {
    addDataset(state, action: PayloadAction<Dataset>) {
      const dataset = action.payload;
      const datasetId = getDatasetId(dataset);

      if (!datasets.has(datasetId)) {
        datasets.set(datasetId, dataset);
        state.datasets = [...datasets.values()];
      }
    },
    removeDataset(state, action: PayloadAction<Dataset>) {
      const dataset = action.payload;
      const datasetId = getDatasetId(dataset);

      if (datasets.has(datasetId)) {
        datasets.delete(datasetId);
        state.datasets = [...datasets.values()];
      }
    },
  },
});

export const { addDataset, removeDataset } = datasetSlice.actions;
export default datasetSlice.reducer;
