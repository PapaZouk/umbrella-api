// @ts-nocheck
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "../../../src/schema/User";
import {UserGenerator} from "../_mocks/UserGenerator";

describe('User Schema Validation Test', () => {
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

    it('should not save User if username is missing', async () => {
       const user = new User(UserGenerator({ username: '' }));

       try {
        await user.save();
       } catch (error) {
           expect(error.errors['username']).toBeDefined();
           expect(error.errors['username'].message).toBe('Path `username` is required.');
       }
    });

    it('should not save User if email is missing', async () => {
        const user = new User(UserGenerator({ email: '' }));

        try {
            await user.save();
        } catch (error) {
            expect(error.errors['email']).toBeDefined();
            expect(error.errors['email'].message).toBe('Path `email` is required.');
        }
    });

    it('should not save User if password is missing', async () => {
       const user = new User(UserGenerator({ password: '' }));

       try {
           await user.save();
       } catch (error) {
           expect(error.errors['password']).toBeDefined();
           expect(error.errors['password'].message).toBe('Path `password` is required.');
       }
    });

    it('should save Employee correctly', async () => {
       const user = new User(UserGenerator());

       await user.save();

       const savedEmployee = await User.findOne({ email: user.email });

       expect(savedEmployee).toBeTruthy();
       expect(savedEmployee.username).toBe(user.username);
       expect(savedEmployee.email).toBe(user.email);
       expect(savedEmployee.password).toBeDefined();
    });
});