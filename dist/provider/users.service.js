"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_1 = require("firebase-admin/auth");
const auth_2 = require("firebase/auth");
let UsersService = class UsersService {
    constructor() {
        this.users = [];
        this.usersresultcount = {
            message: '',
            count: 0,
            result: null,
        };
        this.usersresult = {
            message: '',
            result: null,
        };
    }
    async findOne(id) {
        const OneUsers = async (id) => {
            this.users.length = 0;
            await (0, auth_1.getAuth)()
                .getUser(id)
                .then(async (userRecord) => {
                this.users.push({
                    id: userRecord.uid,
                    avatar: userRecord.photoURL ??
                        'https://cdn-icons-png.flaticon.com/512/1811/1811885.png',
                    phone: userRecord.phoneNumber,
                    displayname: userRecord.displayName,
                    email: userRecord.email,
                    password: userRecord.passwordHash,
                    create_at: userRecord.metadata.creationTime,
                    update_at: userRecord.metadata.lastRefreshTime,
                    lastsignin_at: userRecord.metadata.lastSignInTime,
                });
                this.usersresult.message = 'Ok';
                this.usersresult.result = this.users;
            })
                .catch((error) => {
                this.usersresult.message = error.code;
            });
        };
        await OneUsers(id);
        return this.usersresult;
    }
    async findAll() {
        const listAllUsers = async (nextPageToken) => {
            this.users.length = 0;
            await (0, auth_1.getAuth)()
                .listUsers(1000, nextPageToken)
                .then((listUsersResult) => {
                listUsersResult.users.forEach(async (userRecord) => {
                    this.users.push({
                        id: userRecord.uid,
                        avatar: userRecord.photoURL ??
                            'https://cdn-icons-png.flaticon.com/512/1811/1811885.png',
                        phone: userRecord.phoneNumber,
                        displayname: userRecord.displayName,
                        email: userRecord.email,
                        password: userRecord.passwordHash,
                        create_at: userRecord.metadata.creationTime,
                        update_at: userRecord.metadata.lastRefreshTime,
                        lastsignin_at: userRecord.metadata.lastSignInTime,
                    });
                    this.usersresult.message = 'Ok';
                    this.usersresult.result = this.users;
                });
                if (listUsersResult.pageToken) {
                    listAllUsers(listUsersResult.pageToken);
                }
            })
                .catch((error) => {
                this.usersresult.message = error.code;
            });
            return this.usersresult;
        };
        await listAllUsers();
        return this.usersresult;
    }
    async findCount() {
        const listAllUsers = async (nextPageToken) => {
            this.users.length = 0;
            await (0, auth_1.getAuth)()
                .listUsers(1000, nextPageToken)
                .then((listUsersResult) => {
                listUsersResult.users.forEach(async (userRecord) => {
                    this.users.push({
                        id: userRecord.uid,
                        avatar: userRecord.photoURL ??
                            'https://cdn-icons-png.flaticon.com/512/1811/1811885.png',
                        phone: userRecord.phoneNumber,
                        displayname: userRecord.displayName,
                        email: userRecord.email,
                        password: userRecord.passwordHash,
                        create_at: userRecord.metadata.creationTime,
                        update_at: userRecord.metadata.lastRefreshTime,
                        lastsignin_at: userRecord.metadata.lastSignInTime,
                    });
                    this.usersresultcount.message = 'Ok';
                    this.usersresultcount.count = this.users.length;
                    this.usersresultcount.result = this.users;
                });
                if (listUsersResult.pageToken) {
                    listAllUsers(listUsersResult.pageToken);
                }
            })
                .catch((error) => {
                this.usersresult.message = error.code;
            });
        };
        await listAllUsers();
        return this.usersresultcount;
    }
    async create(email, password) {
        this.users.length = 0;
        const auth = (0, auth_2.getAuth)();
        await (0, auth_2.createUserWithEmailAndPassword)(auth, email, password)
            .then((userCredential) => {
            const user = userCredential.user;
            this.usersresult.message = 'Ok';
            this.usersresult.result = user.stsTokenManager.accessToken;
        })
            .catch((error) => {
            this.usersresult.message = error.code;
        });
        return this.usersresult;
    }
    async update(body, uid) {
        var phone;
        if (body.phone.length == 10 && body.phone.charAt(0) == '0') {
            phone = '+66' + body.phone.slice(1, 10);
        }
        else {
            phone = null;
        }
        this.users.length = 0;
        await (0, auth_1.getAuth)()
            .updateUser(uid, {
            phoneNumber: phone,
            displayName: body.displayname,
        })
            .then((userRecord) => {
            this.usersresult.message = 'Successfully updated';
            this.usersresult.result = userRecord;
        })
            .catch((error) => {
            this.usersresult.message = error.code;
        });
        return this.usersresult;
    }
    async delete(id) {
        this.users.length = 0;
        await (0, auth_1.getAuth)()
            .deleteUser(id)
            .then(() => {
            this.usersresult.message = 'Successfully Deleted';
        })
            .catch((error) => {
            this.usersresult.message = error.code;
        });
        return this.usersresult;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map