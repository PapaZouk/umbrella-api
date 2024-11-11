// @ts-nocheck
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import Employee from "../../../src/schema/Employee";
import {EmployeeGenerator} from "../_mocks/EmployeeGenerator";

describe('Employee Schema Validation Test', () => {
   let mongoServer: MongoMemoryServer;

   beforeAll(async () => {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();

      await mongoose.connect(uri);
   });

   afterAll(async () => {
       await mongoose.disconnect();
       await mongoServer.stop();
   });

   it('should not save Employee if firstName is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ personalData: { firstName: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['personalData.firstName']).toBeDefined();
         expect(error.errors['personalData.lastName'].message).toBe('Path `firstName` is required');
      }
   });

   it('should not save Employee if lastNAme is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ personalData: { lastName: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['personalData.lastName']).toBeDefined();
         expect(error.errors['personalData.lastName'].message).toBe('Path `lastName` is required');
      }
   });

   it('should not save Employee if email is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ personalData: { email: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['personalData.email']).toBeDefined();
         expect(error.errors['personalData.email'].message).toBe('Path `email` is required');
      }
   });

   it('should not save Employee if phone is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ personalData: { phone: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['personalData.phone']).toBeDefined();
         expect(error.errors['personalData.phone'].message).toBe('Path `phone` is required');
      }
   });

   it('should not save Employee if pesel is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ personalData: { pesel: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['personalData.pesel']).toBeDefined();
         expect(error.errors['personalData.pesel'].message).toBe('Path `pesel` is required');
      }
   });

   it('should not save Employee if street1 is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ personalData: { street1: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['personalData.street1']).toBeDefined();
         expect(error.errors['personalData.street1'].message).toBe('Path `street1` is required');
      }
   });

   it('should not save Employee if house1 is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ personalData: { house1: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['personalData.house1']).toBeDefined();
         expect(error.errors['personalData.house1'].message).toBe('Path `house1` is required');
      }
   });

   it('should not save Employee if city1 is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ personalData: { city1: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['personalData.city1']).toBeDefined();
         expect(error.errors['personalData.city1'].message).toBe('Path `city1` is required');
      }
   });


   it('should not save Employee if state1 is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ personalData: { state1: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['personalData.state1']).toBeDefined();
         expect(error.errors['personalData.state1'].message).toBe('Path `state1` is required');
      }
   });


   it('should not save Employee if zip1 is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ personalData: { zip1: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['personalData.zip1']).toBeDefined();
         expect(error.errors['personalData.zip1'].message).toBe('Path `zip1` is required');
      }
   });

   it('should not save Employee if voivodeship1 is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ personalData: { voivodeship1: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['personalData.voivodeship1']).toBeDefined();
         expect(error.errors['personalData.voivodeship1'].message).toBe('Path `voivodeship1` is required');
      }
   });

   it('should not save Employee if status is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ jobDetails: { status: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['jobDetails.status']).toBeDefined();
         expect(error.errors['jobDetails.status'].message).toBe('Path `status` is required');
      }
   });

   it('should not save Employee if jobTitle is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ jobDetails: { jobTitle: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['jobDetails.jobTitle']).toBeDefined();
         expect(error.errors['jobDetails.jobTitle'].message).toBe('Path `jobTitle` is required');
      }
   });

   it('should not save Employee if department is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ jobDetails: { department: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['jobDetails.department']).toBeDefined();
         expect(error.errors['jobDetails.department'].message).toBe('Path `department` is required');
      }
   });

   it('should not save Employee if startDate is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ jobDetails: { startDate: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['jobDetails.startDate']).toBeDefined();
         expect(error.errors['jobDetails.startDate'].message).toBe('Path `startDate` is required');
      }
   });

   it('should not save Employee if contractType is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ jobDetails: { contractType: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['jobDetails.contractType']).toBeDefined();
         expect(error.errors['jobDetails.contractType'].message).toBe('Path `contractType` is required');
      }
   });

   it('should not save Employee if workSchedule is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ jobDetails: { workSchedule: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['jobDetails.workSchedule']).toBeDefined();
         expect(error.errors['jobDetails.workSchedule'].message).toBe('Path `workSchedule` is required');
      }
   });

   it('should not save Employee if insuranceType is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ jobDetails: { insuranceType: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['jobDetails.insuranceType']).toBeDefined();
         expect(error.errors['jobDetails.insuranceType'].message).toBe('Path `insuranceType` is required');
      }
   });

   it('should not save Employee if annualLeaveDays is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ jobDetails: { annualLeaveDays: null } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['jobDetails.annualLeaveDays']).toBeDefined();
         expect(error.errors['jobDetails.annualLeaveDays'].message).toBe('Path `annualLeaveDays` is required');
      }
   });

   it('should not save Employee if baseSalary is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ jobDetails: { salary: { baseSalary: null } } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['jobDetails.salary.baseSalary']).toBeDefined();
         expect(error.errors['jobDetails.salary.baseSalary'].message).toBe('Path `baseSalary` is required');
      }
   });

   it('should not save Employee if bankAccount is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ jobDetails: { salary: { bankAccount: null } } }));

      try {
         await employee.save();
      } catch (error) {
         expect(error.errors['jobDetails.salary.bankAccount']).toBeDefined();
         expect(error.errors['jobDetails.salary.bankAccount'].message).toBe('Path `bankAccount` is required');
      }
   });

   it('should save Employee if clothSize is missing', async () => {
      const employee = new Employee(EmployeeGenerator({ personalData: { clothSize: '' } }));

      await employee.save();

      const savedEmployee = await Employee.findOne({ 'personalData.email': employee.personalData.email, });

      expect(savedEmployee).toBeTruthy();
      expect(savedEmployee?.personalData?.firstName).toBe(employee.personalData.firstName);
      expect(savedEmployee?.personalData.email).toBe(employee.personalData.email);
      expect(savedEmployee?.personalData.clothSize).toBe('');
   });

   it('should save Employee if secondary address data is missing', async () => {
      const employee = new Employee(EmployeeGenerator({
         personalData: {
            address2: {
               street2: '',
               house2: '',
               city2: '',
               state2: '',
               zip2: '',
               voivodeship2: ''
            }
         }
      }));

      await employee.save();

      const savedEmployee = await Employee.findOne({ 'personalData.email': employee.personalData.email });

      expect(savedEmployee).toBeTruthy();
      expect(savedEmployee?.personalData?.firstName).toBe(employee.personalData.firstName);
      expect(savedEmployee?.personalData.email).toBe(employee.personalData.email);
      expect(savedEmployee?.personalData.address2.street2).toBe('');
      expect(savedEmployee?.personalData.address2.house2).toBe('');
      expect(savedEmployee?.personalData.address2.city2).toBe('');
      expect(savedEmployee?.personalData.address2.state2).toBe('');
      expect(savedEmployee?.personalData.address2.zip2).toBe('');
      expect(savedEmployee?.personalData.address2.voivodeship2).toBe('');
   });

   it('should save Employee correctly', async () => {
      const employee = new Employee(EmployeeGenerator({}));

      await employee.save();

      const savedEmployee = await Employee.findOne({ 'personalData.email': employee.personalData.email });

      expect(savedEmployee).toBeTruthy();
      expect(savedEmployee.personalData.email).toBe(employee.personalData.email);
      expect(savedEmployee.personalData.firstName).toBe(employee.personalData.firstName);
   });
});
