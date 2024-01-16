import * as yup from 'yup';

const validationSchema = yup.object({
  startDate: yup.date().required('Start date is required'),
  endDate: yup.date().min(yup.ref('startDate'), 'End date must be after start date').required('End date is required'),
  numAdults: yup.number().required('Number of adults is required').min(1, 'At least one adult is required'),
  numChildren: yup.number().min(0, 'Number of children must be 0 or greater').max(2, 'This property only accepts 2 childrens or lower'),
  numPets: yup.number().min(0, 'Number of pets must be 0 or greater').max(1, 'This property only accepts 1 pet'),
});

export default validationSchema;
