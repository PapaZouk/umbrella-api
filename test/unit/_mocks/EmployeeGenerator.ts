import {IEmployee} from "../../../src/schema/Employee";
import {faker} from "@faker-js/faker/locale/pl";

export function EmployeeGenerator(override?: Partial<IEmployee>){
    return {
        personalData: {
            firstName: override?.personalData?.firstName ?? faker.person.firstName(),
            lastName: override?.personalData?.lastName ?? faker.person.lastName(),
            email: override?.personalData?.email ?? faker.internet.email(),
            phone: override?.personalData?.phone ?? faker.phone.number({ style: 'human'} ),
            pesel: override?.personalData?.pesel ?? faker.number.int({ min: 11, max: 11 }),
            clothSize: override?.personalData?.clothSize ?? faker.helpers.arrayElement(['M', 'S', 'XL', 'XXL', 'XXXL']),
            address1: override?.personalData?.address1 ?? AddressGenerator(),
            address2: override?.personalData?.address2 ?? AddressGenerator(true),
        },
        jobDetails: {
            status: override?.jobDetails?.status ? override.jobDetails.status : faker.helpers.arrayElement(['Aktywny', 'Nieaktywny', 'Zwolniony', 'Na zwolnieniu']),
            jobTitle: override?.jobDetails?.jobTitle ? override.jobDetails.jobTitle : faker.helpers.arrayElement(['Specjalista ds. Finansów', 'Serwisant', 'Koordynator Magazynu']),
            department: override?.jobDetails?.department ? override.jobDetails.department : faker.helpers.arrayElement(['Logistyka', 'Finanse', 'Sprzedaż']),
            startDate: override?.jobDetails?.startDate ? override.jobDetails.startDate : faker.date.past(),
            endDate: override?.jobDetails?.endDate ? override.jobDetails.endDate : null,
            contractType: override?.jobDetails?.contractType ? override.jobDetails.contractType : faker.helpers.arrayElement(['Umowa o pracę', 'Umowa zlecenie', 'B2B']),
            workSchedule: override?.jobDetails?.workSchedule ? override.jobDetails.workSchedule : faker.helpers.arrayElement(['Pełny etat', 'Niepełny etat', 'Praca zdalna']),
            insuranceType: override?.jobDetails?.insuranceType ? override.jobDetails.insuranceType : faker.helpers.arrayElement(['A1', 'Ubezpieczenie komercyjne']),
            annualLeaveDays: override?.jobDetails?.annualLeaveDays ? override.jobDetails.annualLeaveDays : faker.number.int({ min: 21, max: 26 }),
            salary: {
                baseSalary: override?.jobDetails?.salary?.baseSalary ? override.jobDetails.salary.baseSalary : faker.number.int({ min: 2000, max: 20000 }),
                bankAccount: override?.jobDetails?.salary?.bankAccount ? override.jobDetails.salary.bankAccount : faker.string.numeric({ length: 20 }),
            },
        },
    }
}

export function AddressGenerator(second?: boolean) {
    const street = faker.location.street();
    const house = faker.location.buildingNumber();
    const city = faker.location.city();
    const state = faker.location.country();
    const zip = faker.location.zipCode();
    const voivodeship = faker.helpers.arrayElement(['Pomorskie', 'Mazowieckie', 'Wielkopolskie']);

    if (!second) {
        return {
            street1: street,
            house1: house,
            city1: city,
            state1: state,
            zip1: zip,
            voivodeship1: voivodeship,
        };
    }
    return {
        street2: street,
        house2: house,
        city2: city,
        state2: state,
        zip2: zip,
        voivodeship2: voivodeship,
    };
}
