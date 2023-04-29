import { CustomerModel } from "../models/customer.model";

export const customerMockData: CustomerModel[] = [
    {
        id: 1,
        firstname: 'saeed',
        lastname: 'salehlou',
        dateOfBirth: new Date(),
        phoneNumber: '09127075052',
        email: 'saeed.softco@gmail.com',
        bankAccountNumber: 12345,
    },

];
