import {model, Schema} from "mongoose";

export interface IEmployee extends Document {
    _id: string;
    personalData: {
        firstName?: string|null;
        lastName?: string|null;
        email?: string|null;
        phone?: string|null;
        pesel?: string|null;
        clothSize?: string|null;
        address1?: {
            street1?: string|null;
            house1?: string|null;
            city1?: string|null;
            state1?: string|null;
            zip1?: string|null;
            voivodeship1?: string|null;
        };
        address2?: {
            street2?: string|null;
            house2?: string|null;
            city2?: string|null;
            state2?: string|null;
            zip2?: string|null;
            voivodeship2?: string|null;
        };
    };
    jobDetails?: {
        status?: string|null;
        jobTitle?: string|null;
        department?: string|null;
        startDate?: string|null;
        endDate?: string|null;
        contractType?: string|null;
        workSchedule?: string|null;
        insuranceType?: string|null;
        annualLeaveDays?: number|null;
        salary?: {
            baseSalary?: number|null;
            currency?: string|null;
            bankAccount?: string|null;
            bankName?: string|null;
        }
    };
}

export interface IEmployeeRequest extends Document {
    personalData?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        pesel?: string;
        clothSize?: string;
        address1?: {
            street1?: string;
            house1?: string;
            city1?: string;
            state1?: string;
            zip1?: string;
            voivodeship1?: string;
        };
        address2?: {
            street2?: string;
            house2?: string;
            city2?: string;
            state2?: string;
            zip2?: string;
            voivodeship2?: string;
        };
    };
    jobDetails?: {
        status?: string;
        jobTitle?: string;
        department?: string;
        startDate?: string;
        endDate?: string;
        contractType?: string;
        workSchedule?: string;
        insuranceType?: string;
        annualLeaveDays?: number;
        salary?: {
            baseSalary?: number;
            currency?: string;
            bankAccount?: string;
            bankName?: string;
        }
    };
}

const employeeSchema = new Schema<IEmployee>({
    personalData: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        pesel: { type: String, required: true, unique: true },
        clothSize: { type: String },
        address1: {
            street1: { type: String, required: true },
            house1: { type: String, required: true },
            city1: { type: String, required: true },
            state1: { type: String, required: true },
            zip1: { type: String, required: true },
            voivodeship1: { type: String, required: true }
        },
        address2: {
            street2: { type: String },
            house2: { type: String },
            city2: { type: String },
            state2: { type: String },
            zip2: { type: String },
            voivodeship2: { type: String }
        }
    },
    jobDetails: {
        status: { type: String, required: true },
        jobTitle: { type: String, required: true },
        department: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        contractType: { type: String, required: true },
        workSchedule: { type: String, required: true },
        insuranceType: { type: String, required: true },
        annualLeaveDays: { type: Number, required: true },
        salary: {
            baseSalary: { type: Number, required: true },
            currency: { type: String, required: true },
            bankAccount: { type: String, require: true },
            bankName: { type: String }
        }
    }
});

employeeSchema.index(
    { "personalData.firstName": 1, "personalData.lastName": 1, "personalData.pesel": 1 },
    { unique: true }
);
employeeSchema.index({ "jobDetails.startDate": 1 });
employeeSchema.index({ "jobDetails.department": 1, "jobDetails.jobTitle": 1 });

const employee = model<IEmployee>("Employee", employeeSchema);

export default employee;