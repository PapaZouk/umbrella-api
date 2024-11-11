import {IUser} from "../../../src/schema/User";
import {faker} from "@faker-js/faker/locale/pl";

export function UserGenerator(override?: Partial<IUser>) {
    return {
        username: override?.username ?? faker.internet.username(),
        email: override?.email ?? faker.internet.email(),
        password: override?.password ?? faker.internet.password(),
        createdAt: override?.createdAt ?? faker.date.past(),
        updatedAt: override?.updatedAt ?? faker.date.past(),
    }
}